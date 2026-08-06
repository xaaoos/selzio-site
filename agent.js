(function () {
  'use strict';

  var COPY = {
    ru: {
      trigger: 'AI‑напарник',
      title: 'AI‑напарник SELZIO',
      status: 'Разбирает задачи и помогает записаться',
      close: 'Закрыть',
      hello: 'Здравствуйте. Я AI‑напарник SELZIO. Помогу разобрать рабочую задачу, отвечу на вопросы о подходе или передам заявку на консультацию.',
      safety: 'Не отправляйте пароли, API‑ключи и конфиденциальные данные компании.',
      diagnose: 'Разобрать рабочую задачу',
      question: 'Задать вопрос о подходе',
      book: 'Записаться на консультацию',
      diagnosePrompt: 'Расскажите, кто выполняет работу, что приходится делать вручную и какой результат должен получаться.',
      questionPrompt: 'Что вы хотите узнать об AI‑напарниках, безопасности или процессе внедрения?',
      placeholder: 'Напишите сообщение…',
      send: 'Отправить',
      sending: 'AI‑напарник отвечает…',
      error: 'Сейчас не удалось получить ответ. Можно повторить попытку или продолжить разговор в Telegram.',
      consultAction: 'Передать задачу на консультацию',
      bookingTitle: 'Заявка на консультацию',
      name: 'Как к вам обращаться',
      company: 'Компания',
      contact: 'Телефон, email или Telegram',
      time: 'Когда удобно связаться',
      comment: 'Что важно обсудить',
      submit: 'Отправить заявку',
      consent: 'Отправляя заявку, вы разрешаете связаться с вами по указанному контакту.',
      success: 'Готово. Заявка и краткое содержание разговора переданы команде SELZIO. Мы свяжемся с вами по указанному контакту.',
      bookingError: 'Автоматическая отправка пока недоступна. Открыл прямой диалог в Telegram с подготовленным сообщением.',
      required: 'Укажите имя и способ связи.'
    },
    sr: {
      trigger: 'AI saradnik',
      title: 'SELZIO AI saradnik',
      status: 'Analizira zadatke i pomaže oko konsultacije',
      close: 'Zatvori',
      hello: 'Zdravo. Ja sam SELZIO AI saradnik. Mogu da analiziram radni zadatak, odgovorim na pitanja ili pošaljem zahtev za konsultaciju.',
      safety: 'Ne šaljite lozinke, API ključeve ili poverljive podatke kompanije.',
      diagnose: 'Analiziraj radni zadatak',
      question: 'Postavi pitanje o pristupu',
      book: 'Zakaži konsultaciju',
      diagnosePrompt: 'Opišite ko obavlja posao, šta se radi ručno i kakav rezultat treba da se dobije.',
      questionPrompt: 'Šta želite da saznate o AI saradnicima, bezbednosti ili procesu uvođenja?',
      placeholder: 'Napišite poruku…',
      send: 'Pošalji',
      sending: 'AI saradnik odgovara…',
      error: 'Odgovor trenutno nije dostupan. Pokušajte ponovo ili nastavite razgovor na Telegramu.',
      consultAction: 'Pošalji zadatak za konsultaciju',
      bookingTitle: 'Zahtev za konsultaciju',
      name: 'Ime',
      company: 'Kompanija',
      contact: 'Telefon, email ili Telegram',
      time: 'Kada vam odgovara razgovor',
      comment: 'Šta je važno da razmotrimo',
      submit: 'Pošalji zahtev',
      consent: 'Slanjem zahteva dozvoljavate da vas kontaktiramo.',
      success: 'Gotovo. Zahtev i kratak sadržaj razgovora poslati su SELZIO timu.',
      bookingError: 'Automatsko slanje trenutno nije dostupno. Otvoren je direktan Telegram razgovor sa pripremljenom porukom.',
      required: 'Unesite ime i kontakt.'
    },
    en: {
      trigger: 'AI teammate',
      title: 'SELZIO AI teammate',
      status: 'Reviews tasks and helps arrange a consultation',
      close: 'Close',
      hello: 'Hello. I’m the SELZIO AI teammate. I can review a work task, answer questions about the approach, or send a consultation request.',
      safety: 'Do not send passwords, API keys, or confidential company data.',
      diagnose: 'Review a work task',
      question: 'Ask about the approach',
      book: 'Arrange a consultation',
      diagnosePrompt: 'Tell me who does the work, what is currently manual, and what result should be produced.',
      questionPrompt: 'What would you like to know about AI teammates, security, or the adoption process?',
      placeholder: 'Write a message…',
      send: 'Send',
      sending: 'The AI teammate is responding…',
      error: 'A response is unavailable right now. Try again or continue the conversation on Telegram.',
      consultAction: 'Send this task for consultation',
      bookingTitle: 'Consultation request',
      name: 'Your name',
      company: 'Company',
      contact: 'Phone, email, or Telegram',
      time: 'Preferred time to talk',
      comment: 'What should we discuss',
      submit: 'Send request',
      consent: 'By sending the request, you allow us to contact you using the details provided.',
      success: 'Done. The request and a short conversation summary have been sent to the SELZIO team.',
      bookingError: 'Automatic delivery is unavailable right now. A direct Telegram chat has opened with a prepared message.',
      required: 'Please provide your name and contact details.'
    }
  };

  var state = { messages: [], mode: 'general', busy: false, bookingShown: false };
  var lang = getLang();
  var c = COPY[lang];

  var root = document.createElement('div');
  root.innerHTML =
    '<button class="selzio-agent-trigger" type="button" aria-haspopup="dialog">' +
      '<span class="selzio-agent-trigger-dot" aria-hidden="true"></span>' +
      '<span data-agent-copy="trigger"></span>' +
    '</button>' +
    '<div class="selzio-agent-backdrop" hidden></div>' +
    '<section class="selzio-agent" role="dialog" aria-modal="true" aria-labelledby="selzio-agent-title" hidden>' +
      '<header class="selzio-agent-header">' +
        '<div class="selzio-agent-mark" aria-hidden="true">S</div>' +
        '<div class="selzio-agent-heading"><strong id="selzio-agent-title" data-agent-copy="title"></strong>' +
          '<span class="selzio-agent-status"><i class="selzio-agent-status-dot"></i><span data-agent-copy="status"></span></span>' +
        '</div>' +
        '<button class="selzio-agent-close" type="button" data-agent-copy-aria="close" aria-label="">×</button>' +
      '</header>' +
      '<div class="selzio-agent-body" aria-live="polite"></div>' +
      '<form class="selzio-agent-form">' +
        '<textarea rows="1" maxlength="1500" data-agent-copy-placeholder="placeholder"></textarea>' +
        '<button class="selzio-agent-send" type="submit" data-agent-copy-aria="send" aria-label="">→</button>' +
      '</form>' +
    '</section>';
  document.body.appendChild(root);

  var trigger = root.querySelector('.selzio-agent-trigger');
  var backdrop = root.querySelector('.selzio-agent-backdrop');
  var panel = root.querySelector('.selzio-agent');
  var closeButton = root.querySelector('.selzio-agent-close');
  var body = root.querySelector('.selzio-agent-body');
  var form = root.querySelector('.selzio-agent-form');
  var input = form.querySelector('textarea');
  var sendButton = form.querySelector('.selzio-agent-send');

  applyCopy();
  resetConversation();

  trigger.addEventListener('click', openAgent);
  backdrop.addEventListener('click', closeAgent);
  closeButton.addEventListener('click', closeAgent);
  document.addEventListener('click', function (event) {
    var opener = event.target.closest('[data-agent-open]');
    if (!opener || root.contains(opener)) return;
    event.preventDefault();
    openAgent();
  });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    sendCurrentMessage();
  });
  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendCurrentMessage();
    }
  });
  input.addEventListener('input', function () {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 116) + 'px';
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !panel.hidden) closeAgent();
  });

  new MutationObserver(function () {
    var nextLang = getLang();
    if (nextLang === lang) return;
    lang = nextLang;
    c = COPY[lang];
    applyCopy();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });

  if (location.hash === '#ai-teammate' || new URLSearchParams(location.search).get('agent') === 'open') {
    window.setTimeout(openAgent, 0);
  }

  function getLang() {
    var value = document.documentElement.getAttribute('data-lang');
    return COPY[value] ? value : 'ru';
  }

  function applyCopy() {
    root.querySelectorAll('[data-agent-copy]').forEach(function (node) {
      node.textContent = c[node.getAttribute('data-agent-copy')];
    });
    root.querySelectorAll('[data-agent-copy-aria]').forEach(function (node) {
      node.setAttribute('aria-label', c[node.getAttribute('data-agent-copy-aria')]);
    });
    root.querySelectorAll('[data-agent-copy-placeholder]').forEach(function (node) {
      node.setAttribute('placeholder', c[node.getAttribute('data-agent-copy-placeholder')]);
    });
  }

  function resetConversation() {
    body.replaceChildren();
    state.messages = [];
    state.mode = 'general';
    state.bookingShown = false;
    addMessage('assistant', c.hello, false);
    addMessage('system', c.safety, false);
    var quick = document.createElement('div');
    quick.className = 'selzio-agent-quick';
    quick.appendChild(quickButton(c.diagnose, function () {
      state.mode = 'diagnose';
      removeQuickActions();
      addMessage('user', c.diagnose, false);
      addMessage('assistant', c.diagnosePrompt, false);
      input.focus();
    }));
    quick.appendChild(quickButton(c.question, function () {
      state.mode = 'question';
      removeQuickActions();
      addMessage('user', c.question, false);
      addMessage('assistant', c.questionPrompt, false);
      input.focus();
    }));
    quick.appendChild(quickButton(c.book, function () {
      state.mode = 'booking';
      removeQuickActions();
      addMessage('user', c.book, false);
      showBookingForm();
    }));
    body.appendChild(quick);
  }

  function quickButton(text, handler) {
    var button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.addEventListener('click', handler);
    return button;
  }

  function removeQuickActions() {
    var quick = body.querySelector('.selzio-agent-quick');
    if (quick) quick.remove();
  }

  function openAgent() {
    panel.hidden = false;
    backdrop.hidden = false;
    trigger.hidden = true;
    document.body.style.overflow = 'hidden';
    window.setTimeout(function () { input.focus(); }, 80);
    scrollToBottom();
  }

  function closeAgent() {
    panel.hidden = true;
    backdrop.hidden = true;
    trigger.hidden = false;
    document.body.style.overflow = '';
    trigger.focus();
  }

  function addMessage(role, text, remember) {
    var message = document.createElement('div');
    message.className = 'selzio-agent-message selzio-agent-message--' + role;
    message.textContent = text;
    body.appendChild(message);
    if (remember !== false && (role === 'user' || role === 'assistant')) {
      state.messages.push({ role: role, content: text });
      state.messages = state.messages.slice(-12);
    }
    scrollToBottom();
    return message;
  }

  function showTyping() {
    var typing = document.createElement('div');
    typing.className = 'selzio-agent-message selzio-agent-message--assistant selzio-agent-typing';
    typing.setAttribute('aria-label', c.sending);
    typing.innerHTML = '<i></i><i></i><i></i>';
    body.appendChild(typing);
    scrollToBottom();
    return typing;
  }

  async function sendCurrentMessage() {
    var text = input.value.trim();
    if (!text || state.busy) return;
    removeQuickActions();
    input.value = '';
    input.style.height = 'auto';
    addMessage('user', text, true);
    state.busy = true;
    sendButton.disabled = true;
    var typing = showTyping();

    try {
      var response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: state.messages, language: lang, mode: state.mode, page: location.pathname })
      });
      var data = await response.json().catch(function () { return {}; });
      if (!response.ok || !data.reply) throw new Error(data.error || 'agent_unavailable');
      typing.remove();
      addMessage('assistant', data.reply, true);
      addConsultationAction();
    } catch (error) {
      typing.remove();
      addMessage('assistant', c.error, false);
      addConsultationAction();
    } finally {
      state.busy = false;
      sendButton.disabled = false;
      input.focus();
    }
  }

  function addConsultationAction() {
    if (state.bookingShown) return;
    var existing = body.querySelector('.selzio-agent-inline-action');
    if (existing) existing.remove();
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'selzio-agent-inline-action';
    button.textContent = c.consultAction;
    button.addEventListener('click', showBookingForm);
    body.appendChild(button);
    scrollToBottom();
  }

  function showBookingForm() {
    if (state.bookingShown) return;
    state.bookingShown = true;
    var action = body.querySelector('.selzio-agent-inline-action');
    if (action) action.remove();

    var booking = document.createElement('form');
    booking.className = 'selzio-agent-booking';
    booking.innerHTML =
      '<strong></strong>' +
      '<label><span></span><input name="name" maxlength="100" autocomplete="name" required></label>' +
      '<label><span></span><input name="company" maxlength="120" autocomplete="organization"></label>' +
      '<label><span></span><input name="contact" maxlength="160" autocomplete="email" required></label>' +
      '<label><span></span><input name="preferredTime" maxlength="160"></label>' +
      '<label><span></span><textarea name="comment" maxlength="600"></textarea></label>' +
      '<button type="submit"></button>' +
      '<p class="selzio-agent-booking-note"></p>';
    var labels = booking.querySelectorAll('label span');
    booking.querySelector('strong').textContent = c.bookingTitle;
    labels[0].textContent = c.name;
    labels[1].textContent = c.company;
    labels[2].textContent = c.contact;
    labels[3].textContent = c.time;
    labels[4].textContent = c.comment;
    booking.querySelector('button').textContent = c.submit;
    booking.querySelector('.selzio-agent-booking-note').textContent = c.consent;
    booking.addEventListener('submit', submitBooking);
    body.appendChild(booking);
    scrollToBottom();
    booking.querySelector('input').focus();
  }

  async function submitBooking(event) {
    event.preventDefault();
    var booking = event.currentTarget;
    var data = Object.fromEntries(new FormData(booking).entries());
    if (!String(data.name || '').trim() || !String(data.contact || '').trim()) {
      addMessage('system', c.required, false);
      return;
    }
    var submit = booking.querySelector('button');
    submit.disabled = true;
    var transcript = state.messages.slice(-8).map(function (item) {
      return (item.role === 'user' ? 'Visitor: ' : 'AI: ') + item.content;
    }).join('\n');

    try {
      var response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          company: data.company,
          contact: data.contact,
          preferredTime: data.preferredTime,
          comment: data.comment,
          transcript: transcript,
          language: lang,
          page: location.pathname
        })
      });
      var result = await response.json().catch(function () { return {}; });
      if (!response.ok || !result.ok) throw new Error(result.error || 'delivery_failed');
      booking.remove();
      addMessage('assistant', c.success, false);
    } catch (error) {
      submit.disabled = false;
      var draft = c.bookingTitle + '\n' +
        c.name + ': ' + data.name + '\n' +
        c.company + ': ' + (data.company || '—') + '\n' +
        c.contact + ': ' + data.contact + '\n' +
        c.time + ': ' + (data.preferredTime || '—') + '\n' +
        c.comment + ': ' + (data.comment || '—');
      addMessage('assistant', c.bookingError, false);
      var link = document.createElement('a');
      link.className = 'selzio-agent-telegram';
      link.href = 'https://t.me/ishmakof?text=' + encodeURIComponent(draft);
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = 'Telegram →';
      body.appendChild(link);
      link.click();
      scrollToBottom();
    }
  }

  function scrollToBottom() {
    window.requestAnimationFrame(function () { body.scrollTop = body.scrollHeight; });
  }
})();
