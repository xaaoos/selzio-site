import { createHash } from 'node:crypto';
import { createReadStream, readFileSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)));

try {
  const envFile = readFileSync(resolve(ROOT, '.env'), 'utf8');
  for (const line of envFile.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    const value = match[2].replace(/^(['"])(.*)\1$/, '$2');
    process.env[match[1]] = value;
  }
} catch {
  // Production normally provides environment variables through the service manager.
}

const PORT = Number(process.env.PORT || 8765);
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5.6-luna';
const MAX_BODY_BYTES = 48_000;

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const SYSTEM_PROMPT = `You are the public AI teammate for SELZIO. Your audience is an owner or executive of a company with up to 100 employees.

SELZIO's approach:
- AI adoption starts inside the company through employees who already know their work.
- An employee gets an AI teammate with developer skills and describes a familiar process and the expected result in ordinary language.
- The AI teammate can create small tools and automations, request only the connections it needs, and work within confirmed permissions.
- The employee checks the result on real examples before launch.
- Code, documentation, and accumulated knowledge remain with the company.
- The goal is to make employees' work easier, faster, and more accurate without breaking familiar processes.

SELZIO also creates business websites: strategy, structure, design, development, launch, hosting, and practical automation in one team. Treat a website as a working business instrument rather than only a visual presentation. Answer general website-service questions when the visitor is on the websites page, but do not invent a price, deadline, or portfolio result.

Your jobs are limited to:
1. Answer questions about this approach, likely applications, boundaries, and implementation.
2. Help a visitor examine one work process. Ask one clear question at a time. After enough detail, provide a preliminary map with: the process, the first useful tool, employee benefit, company benefit, likely connections, safe permission boundary, and next step.
3. Help the visitor prepare for a consultation. The website form performs the actual handoff; never claim that a meeting is booked unless the form confirms delivery.

Boundaries:
- Never request passwords, API keys, personal data, client databases, or confidential company information.
- Never claim access to the visitor's systems or pretend to have performed an external action.
- Do not invent client cases, prices, guarantees, implementation dates, or technical facts not supplied here.
- If the question requires a precise commercial or architectural commitment, state what is uncertain and recommend a consultation.
- Keep responses concise, concrete, and human. Avoid sales clichés.
- Use plain text with short paragraphs and the bullet character • when useful. Do not use Markdown headings or tables.
- Respond in the language specified by the application.`;

const rateBuckets = new Map();

function json(response, statusCode, payload) {
  const data = JSON.stringify(payload);
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(data),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(data);
}

function clientIp(request) {
  const forwarded = request.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded) return forwarded.split(',')[0].trim();
  return request.socket.remoteAddress || 'unknown';
}

function rateLimit(request, response, name, limit, windowMs) {
  const now = Date.now();
  const key = `${name}:${clientIp(request)}`;
  const current = rateBuckets.get(key);
  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  current.count += 1;
  if (current.count <= limit) return false;
  response.setHeader('Retry-After', String(Math.ceil((current.resetAt - now) / 1000)));
  json(response, 429, { error: 'rate_limit' });
  return true;
}

async function readJson(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      const error = new Error('body_too_large');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
  } catch {
    const error = new Error('invalid_json');
    error.statusCode = 400;
    throw error;
  }
}

function cleanText(value, maxLength) {
  return String(value || '').replaceAll('\u0000', '').trim().slice(0, maxLength);
}

function validMessages(value) {
  if (!Array.isArray(value)) return [];
  return value.slice(-12).flatMap((item) => {
    const role = item?.role === 'assistant' ? 'assistant' : item?.role === 'user' ? 'user' : null;
    const content = cleanText(item?.content, 1600);
    return role && content ? [{ role, content }] : [];
  });
}

function responseText(apiResponse) {
  const parts = [];
  for (const item of apiResponse?.output || []) {
    if (item?.type !== 'message') continue;
    for (const content of item.content || []) {
      if (content?.type === 'output_text' && content.text) parts.push(content.text);
    }
  }
  return parts.join('\n').trim();
}

async function handleAgent(request, response) {
  if (rateLimit(request, response, 'agent', 30, 10 * 60 * 1000)) return;
  if (!process.env.OPENAI_API_KEY) {
    json(response, 503, { error: 'agent_not_configured' });
    return;
  }

  const body = await readJson(request);
  const messages = validMessages(body.messages);
  if (!messages.length) {
    json(response, 400, { error: 'message_required' });
    return;
  }
  const language = ['ru', 'sr', 'en'].includes(body.language) ? body.language : 'ru';
  const mode = ['general', 'diagnose', 'question', 'booking'].includes(body.mode) ? body.mode : 'general';
  const page = cleanText(body.page, 180);
  const safetyIdentifier = createHash('sha256')
    .update(`selzio:${clientIp(request)}`)
    .digest('hex')
    .slice(0, 32);

  const apiResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      instructions: `${SYSTEM_PROMPT}\nCurrent language: ${language}. Current interaction mode: ${mode}. Current website page: ${page || '/'}.`,
      input: messages,
      reasoning: { effort: 'low' },
      text: { verbosity: 'low' },
      max_output_tokens: 600,
      safety_identifier: safetyIdentifier,
      store: false
    }),
    signal: AbortSignal.timeout(45_000)
  });

  const data = await apiResponse.json().catch(() => ({}));
  if (!apiResponse.ok) {
    console.error('OpenAI request failed:', apiResponse.status, data?.error?.code || 'unknown_error');
    json(response, 502, { error: 'model_unavailable' });
    return;
  }

  const reply = responseText(data);
  if (!reply) {
    json(response, 502, { error: 'empty_model_response' });
    return;
  }
  json(response, 200, { reply });
}

async function handleConsultation(request, response) {
  if (rateLimit(request, response, 'consultation', 5, 60 * 60 * 1000)) return;
  const body = await readJson(request);
  const lead = {
    name: cleanText(body.name, 100),
    company: cleanText(body.company, 120),
    contact: cleanText(body.contact, 160),
    preferredTime: cleanText(body.preferredTime, 160),
    comment: cleanText(body.comment, 600),
    transcript: cleanText(body.transcript, 3500),
    language: cleanText(body.language, 8),
    page: cleanText(body.page, 180)
  };
  if (!lead.name || !lead.contact) {
    json(response, 400, { error: 'name_and_contact_required' });
    return;
  }
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    json(response, 503, { error: 'consultation_not_configured' });
    return;
  }

  const telegramText = [
    'Новая заявка с сайта SELZIO',
    '',
    `Имя: ${lead.name}`,
    `Компания: ${lead.company || '—'}`,
    `Контакт: ${lead.contact}`,
    `Удобное время: ${lead.preferredTime || '—'}`,
    `Комментарий: ${lead.comment || '—'}`,
    `Язык: ${lead.language || '—'}`,
    `Страница: ${lead.page || '—'}`,
    '',
    'Последние сообщения:',
    lead.transcript || '—'
  ].join('\n').slice(0, 4000);

  const telegramResponse = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: telegramText,
      disable_web_page_preview: true
    }),
    signal: AbortSignal.timeout(15_000)
  });
  const result = await telegramResponse.json().catch(() => ({}));
  if (!telegramResponse.ok || !result.ok) {
    console.error('Telegram delivery failed:', telegramResponse.status, result?.description || 'unknown_error');
    json(response, 502, { error: 'delivery_failed' });
    return;
  }
  json(response, 200, { ok: true });
}

async function serveStatic(request, response) {
  const requestUrl = new URL(request.url, 'http://localhost');
  const pathname = decodeURIComponent(requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname);
  const filePath = resolve(ROOT, `.${pathname}`);
  const hasHiddenSegment = pathname.split('/').some((segment) => segment.startsWith('.'));
  if (!filePath.startsWith(ROOT + sep) || hasHiddenSegment || filePath === resolve(ROOT, 'server.mjs')) {
    json(response, 404, { error: 'not_found' });
    return;
  }
  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error('not_file');
    response.writeHead(200, {
      'Content-Type': CONTENT_TYPES[extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Content-Length': fileStat.size,
      'Cache-Control': extname(filePath) === '.html' ? 'no-cache' : 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    });
    if (request.method === 'HEAD') response.end();
    else createReadStream(filePath).pipe(response);
  } catch {
    json(response, 404, { error: 'not_found' });
  }
}

const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    if (request.method === 'GET' && pathname === '/api/health') {
      json(response, 200, {
        ok: true,
        agentConfigured: Boolean(process.env.OPENAI_API_KEY),
        consultationConfigured: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID)
      });
      return;
    }
    if (request.method === 'POST' && pathname === '/api/agent') {
      await handleAgent(request, response);
      return;
    }
    if (request.method === 'POST' && pathname === '/api/consultation') {
      await handleConsultation(request, response);
      return;
    }
    if (request.method === 'GET' || request.method === 'HEAD') {
      await serveStatic(request, response);
      return;
    }
    json(response, 405, { error: 'method_not_allowed' });
  } catch (error) {
    if (error?.name === 'TimeoutError') {
      json(response, 504, { error: 'upstream_timeout' });
      return;
    }
    json(response, error?.statusCode || 500, { error: error?.message || 'server_error' });
  }
});

server.listen(PORT, () => {
  console.log(`SELZIO site and agent listening on http://localhost:${PORT}`);
});
