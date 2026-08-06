(function () {
  'use strict';

  var directions = [
    {
      code: '01', tone: 'sky', image: 'assets/selzio-editorial-hero-pencil-woman-v5.webp',
      cardTitleRu: 'Первый шаг',
      cardSubtitleRu: 'Диагностика рабочего процесса',
      title: { ru: 'Первый шаг', sr: 'Prvi korak', en: 'First step' },
      question: { ru: 'Как выбрать первую задачу для AI?', sr: 'Kako izabrati prvi zadatak za AI?', en: 'How do you choose the first task for AI?' },
      summary: { ru: 'Хороший кандидат — регулярная ручная работа с понятным результатом. Например, подготовка коммерческого предложения, а не «автоматизация всего отдела продаж».', sr: 'Dobar kandidat je redovan ručni posao sa jasnim rezultatom. Na primer, priprema poslovne ponude, a ne „automatizacija celog prodajnog tima“.', en: 'A good candidate is recurring manual work with a clear outcome—for example, preparing a sales proposal rather than “automating the entire sales team.”' },
      hoverRu: {
        flowOnly: true,
        question: '',
        summary: '',
        points: [
          'Собираем повторяющиеся задачи',
          'Находим потери времени и качества',
          'Определяем владельца и результат',
          'Фиксируем метрику, данные и доступы',
          'Выбираем минимальное решение'
        ],
        result: 'Результат: карта процесса · задача · метрика · план запуска'
      },
      points: {
        ru: ['Выполняется каждую неделю', 'Занимает заметное время', 'Результат легко проверить'],
        sr: ['Radi se svake nedelje', 'Oduzima primetno vreme', 'Rezultat se lako proverava'],
        en: ['Happens every week', 'Takes significant time', 'The result is easy to check']
      }
    },
    {
      code: '02', tone: 'peach', image: 'assets/selzio-editorial-ai-apps-connect-pencil-v5.webp',
      cardTitleRu: 'Минимальное решение',
      cardSubtitleRu: 'Собираем под задачу',
      title: { ru: 'Сотрудник соавтор', sr: 'Zaposleni koautor', en: 'Employee co-creator' },
      question: { ru: 'Кто лучше всех знает эту работу?', sr: 'Ko najbolje poznaje ovaj posao?', en: 'Who knows this work best?' },
      summary: { ru: 'Сотрудник описывает знакомый процесс, проверяет решение на реальных примерах и улучшает его прежде всего для себя.', sr: 'Zaposleni opisuje poznat proces, proverava rešenje na stvarnim primerima i prvo unapređuje sopstveni rad.', en: 'The employee describes familiar work, tests the solution on real examples, and improves their own work first.' },
      hoverRu: {
        flowOnly: true,
        numbered: false,
        question: '',
        summary: '',
        lead: 'Для каждой задачи выбираем только необходимые компоненты:',
        points: [
          'Модель — GPT, Claude, Gemini или модель, развёрнутая локально',
          'Интерфейс — веб‑страница, приложение, Telegram‑бот или панель в рабочей системе',
          'Формат — готовый AI‑сервис, автоматизированный сценарий, внутреннее AI‑приложение или AI‑агент'
        ]
      },
      points: {
        ru: ['Выбираем мотивированного участника', 'Даём время на небольшой пилот', 'Собираем обратную связь без фильтров'],
        sr: ['Biramo motivisanog učesnika', 'Dajemo vreme za mali pilot', 'Prikupljamo iskrene povratne informacije'],
        en: ['Choose a motivated participant', 'Give them time for a small pilot', 'Collect unfiltered feedback']
      }
    },
    {
      code: '03', tone: 'violet', image: 'assets/selzio-editorial-tool-selection-purple.webp',
      cardTitleRu: 'Метод AI‑напарников',
      title: { ru: 'Кейсы и решения', sr: 'Projekti i rešenja', en: 'Projects & solutions' },
      question: { ru: 'Что мы уже создали и запустили?', sr: 'Šta smo već napravili i pokrenuli?', en: 'What have we already built and launched?' },
      summary: { ru: 'Сайты по технологии Easyte, AI‑инструменты и готовые решения для реальных задач бизнеса.', sr: 'Sajtovi napravljeni tehnologijom Easyte, AI alati i gotova rešenja za stvarne poslovne zadatke.', en: 'Websites built with Easyte, AI tools, and ready solutions for real business needs.' },
      hoverRu: {
        question: 'Как знание сотрудника становится инструментом?',
        summary: 'Сотруднику не нужно писать техническое задание. Он описывает знакомую работу обычными словами и проверяет решение на реальных примерах.',
        points: ['Сотрудник объясняет процесс', 'AI‑напарник создаёт минимальное решение', 'Selzio обеспечивает среду и доступы']
      },
      action: {
        href: 'sites.html',
        label: { ru: 'Смотреть проекты →', sr: 'Pogledajte projekte →', en: 'View projects →' }
      },
      points: {
        ru: ['Сайты по технологии Easyte', 'Готовые AI‑решения', 'Кейсы с реальным результатом'],
        sr: ['Sajtovi po tehnologiji Easyte', 'Gotova AI rešenja', 'Projekti sa stvarnim rezultatom'],
        en: ['Websites built with Easyte', 'Ready AI solutions', 'Case studies with real results']
      }
    },
    {
      code: '04', tone: 'navy', image: 'assets/selzio-editorial-ai-apps-connect-pencil-v5.webp',
      title: { ru: 'Безопасные данные', sr: 'Bezbedni podaci', en: 'Secure data' },
      question: { ru: 'Какие данные, доступы и действия действительно нужны?', sr: 'Koji podaci, pristupi i radnje su zaista potrebni?', en: 'Which data, permissions, and actions are truly needed?' },
      summary: { ru: 'Инструмент получает только необходимые источники и минимальные права. Секреты не передаются, критические действия подтверждаются человеком, а изменения остаются в журнале.', sr: 'Alat dobija samo potrebne izvore i minimalna prava. Tajne se ne prosleđuju, kritične radnje potvrđuje čovek, a promene ostaju zabeležene.', en: 'The tool receives only required sources and minimum permissions. Secrets are never shared, critical actions require human approval, and changes remain logged.' },
      points: {
        ru: ['Назначаем владельца и уровень данных', 'Разделяем среды и не передаём секреты', 'Подтверждаем действия и отзываем доступы'],
        sr: ['Određujemo vlasnika i nivo podataka', 'Odvajamo okruženja i ne delimo tajne', 'Potvrđujemo radnje i ukidamo pristupe'],
        en: ['Assign an owner and data level', 'Separate environments and never share secrets', 'Approve actions and revoke access']
      }
    },
    {
      code: '05', tone: 'sun', image: 'assets/selzio-editorial-implementation-blue.webp',
      title: { ru: 'Измеримый эффект', sr: 'Merljiv efekat', en: 'Measurable impact' },
      question: { ru: 'Как сравним результат до и после?', sr: 'Kako ćemo uporediti rezultat pre i posle?', en: 'How will we compare before and after?' },
      summary: { ru: 'Небольшой пилот отвечает на один вопрос: стало ли быстрее, точнее, дешевле или содержательнее.', sr: 'Mali pilot odgovara na jedno pitanje: da li je rad postao brži, tačniji, jeftiniji ili smisleniji.', en: 'A small pilot answers one question: did the work become faster, more accurate, cheaper, or more meaningful?' },
      points: {
        ru: ['Фиксируем исходный уровень', 'Ограничиваем срок и тестовую группу', 'Принимаем решение: развивать или остановить'],
        sr: ['Beležimo početno stanje', 'Ograničavamo rok i test grupu', 'Odlučujemo: razvijati ili zaustaviti'],
        en: ['Record the baseline', 'Time-box the test group', 'Decide whether to grow or stop']
      }
    },
    {
      code: '06', tone: 'green', image: 'assets/selzio-editorial-horizontal-adoption-v2.webp',
      title: { ru: 'Навык команды', sr: 'Veština tima', en: 'Team capability' },
      question: { ru: 'Как сотрудники повторят этот подход?', sr: 'Kako će zaposleni ponoviti ovaj pristup?', en: 'How will employees repeat this approach?' },
      summary: { ru: 'Рабочий пример становится учебным материалом. Команда учится не “пользоваться AI”, а улучшать свои процессы с его помощью.', sr: 'Radni primer postaje materijal za učenje. Tim ne uči samo da koristi AI, već da njime unapređuje procese.', en: 'A working example becomes learning material. The team learns not merely to use AI, but to improve its processes with it.' },
      points: {
        ru: ['Показываем удачный внутренний кейс', 'Даём шаблон описания задачи', 'Создаём понятный канал поддержки'],
        sr: ['Pokazujemo uspešan interni primer', 'Dajemo šablon za opis zadatka', 'Otvaramo jasan kanal podrške'],
        en: ['Show a successful internal case', 'Provide a task-description template', 'Create a clear support channel']
      }
    },
    { code: '07', kind: 'footer', tone: 'orange' },
    {
      code: '08', tone: 'blue', image: 'assets/selzio-editorial-handover-green.webp',
      title: { ru: 'Контроль компании', sr: 'Kontrola kompanije', en: 'Company control' },
      question: { ru: 'Как сохранить код, знания и контроль?', sr: 'Kako sačuvati kod, znanje i kontrolu?', en: 'How do we retain code, knowledge and control?' },
      summary: { ru: 'Код, инструкции и накопленные решения передаются компании, получают владельца и могут использоваться в соседних процессах.', sr: 'Kod, uputstva i prikupljena rešenja pripadaju kompaniji, dobijaju vlasnika i mogu da se koriste u drugim procesima.', en: 'Code, instructions, and accumulated solutions stay with the company, receive an owner, and can be reused in adjacent processes.' },
      points: {
        ru: ['Документируем рабочую версию', 'Назначаем внутреннего владельца', 'Собираем библиотеку решений'],
        sr: ['Dokumentujemo radnu verziju', 'Određujemo internog vlasnika', 'Gradimo biblioteku rešenja'],
        en: ['Document the working version', 'Assign an internal owner', 'Build a solution library']
      }
    }
  ];

  var interfaceText = {
    ru: {
      boardLabel: 'Девять блоков внедрения AI', chatLabel: 'Чат SELZIO', tagline: 'Внедрение AI в процессы компании',
      greeting: 'Здравствуйте, я Агент компании SELZIO мы внедряем AI в процессы компании. Я могу рассказать о нашем методе и записать вас на консультацию с инженером. С чего начнем?',
      placeholder: '', messageLabel: 'Сообщение SELZIO', sendLabel: 'Отправить',
      typing: 'SELZIO обрабатывает запрос…', error: 'Сейчас не удалось получить ответ. Попробуйте ещё раз через минуту.',
      collapseChat: 'Свернуть чат',
      footerLabel: 'Контакты SELZIO', contactLabel: 'Связаться с SELZIO', legalLabel: 'Юридические документы', languageLabel: 'Язык сайта',
      privacy: 'Политика обработки данных', consent: 'Согласие на обработку данных',
      back: 'Вернуться', toChat: 'Перейти в центральный чат →', close: 'Закрыть'
    },
    sr: {
      boardLabel: 'Devet blokova za uvođenje AI', chatLabel: 'SELZIO čet', tagline: 'Uvođenje AI u procese kompanije',
      greeting: 'Zdravo, ja sam agent kompanije SELZIO i uvodimo AI u procese kompanija. Mogu da vam predstavim naš metod i zakažem konsultaciju sa inženjerom. Od čega počinjemo?',
      placeholder: '', messageLabel: 'Poruka za SELZIO', sendLabel: 'Pošalji',
      typing: 'SELZIO obrađuje zahtev…', error: 'Odgovor trenutno nije dostupan. Pokušajte ponovo za minut.',
      collapseChat: 'Skupi čet',
      footerLabel: 'SELZIO kontakti', contactLabel: 'Kontaktirajte SELZIO', legalLabel: 'Pravni dokumenti', languageLabel: 'Jezik sajta',
      privacy: 'Politika obrade podataka', consent: 'Saglasnost za obradu podataka',
      back: 'Nazad', toChat: 'Pređite u centralni čet →', close: 'Zatvori'
    },
    en: {
      boardLabel: 'Nine AI adoption blocks', chatLabel: 'SELZIO chat', tagline: 'AI adoption in company processes',
      greeting: 'Hello, I am a SELZIO company agent. We implement AI in company processes. I can tell you about our method and arrange a consultation with an engineer. Where shall we begin?',
      placeholder: '', messageLabel: 'Message SELZIO', sendLabel: 'Send',
      typing: 'SELZIO is processing the request…', error: 'A response is not available right now. Please try again in a minute.',
      collapseChat: 'Collapse chat',
      footerLabel: 'SELZIO contacts', contactLabel: 'Contact SELZIO', legalLabel: 'Legal documents', languageLabel: 'Site language',
      privacy: 'Data processing policy', consent: 'Consent to data processing',
      back: 'Back', toChat: 'Go to the central chat →', close: 'Close'
    }
  };

  var board = document.querySelector('[data-open-window-board]');
  var dialog = document.querySelector('[data-direction-dialog]');
  var currentLang = 'ru';
  var chatState = { messages: [], busy: false };
  var inlineChatInput;
  var introRevealTimer = 0;
  var titleRevealTimers = [];
  var chatIntroTimer = 0;
  var greetingTypingTimer = 0;

  function text(value) { return value[currentLang] || value.ru; }
  function ui(key) { return interfaceText[currentLang][key]; }

  function renderBoard(skipIntro) {
    titleRevealTimers.forEach(function (timer) { window.clearTimeout(timer); });
    titleRevealTimers = [];
    window.clearTimeout(chatIntroTimer);
    window.clearTimeout(greetingTypingTimer);
    chatIntroTimer = 0;
    greetingTypingTimer = 0;
    board.classList.remove('is-chat-expanded');
    board.classList.toggle('is-intro-active', !skipIntro);
    board.replaceChildren();
    document.documentElement.lang = currentLang;
    document.documentElement.setAttribute('data-lang', currentLang);
    board.setAttribute('aria-label', ui('boardLabel'));
    dialog.querySelector('[data-direction-close]').setAttribute('aria-label', ui('close'));
    dialog.querySelector('.button--quiet').textContent = ui('back');
    dialog.querySelector('[data-direction-chat]').textContent = ui('toChat');
    var order = ['core', 0, 1, 2, 3, 4, 5, 6, 7];
    order.forEach(function (entry) {
      if (entry === 'core') {
        var core = document.createElement('section');
        core.className = 'window-cell window-cell--core window-cell--position-core';
        core.setAttribute('aria-label', ui('chatLabel'));
        core.innerHTML =
          '<button class="chat-collapse" type="button" data-chat-collapse aria-label="' + ui('collapseChat') + '">—</button>' +
          '<div class="inline-chat-body" data-inline-chat-body aria-live="polite"></div>' +
          '<form class="inline-chat-form" data-inline-chat-form aria-hidden="true">' +
            '<textarea rows="1" maxlength="1500" placeholder="' + ui('placeholder') + '" aria-label="' + ui('messageLabel') + '"></textarea>' +
            '<button type="submit" aria-label="' + ui('sendLabel') + '"></button>' +
          '</form>';
        board.appendChild(core);
        if (!skipIntro) {
          var intro = document.createElement('div');
          intro.className = 'core-intro window-cell--position-core';
          intro.setAttribute('aria-hidden', 'true');
          intro.innerHTML = '<img src="assets/selzio-logo-gg-transparent.png?v=20260803-1" alt="">';
          board.appendChild(intro);
        }
        mountInlineChat(core);
        return;
      }

      var direction = directions[entry];
      if (direction.kind === 'footer') {
        var footer = document.createElement('footer');
        footer.className = 'window-cell window-cell--footer window-cell--position-' + direction.code;
        footer.setAttribute('aria-label', ui('footerLabel'));
        footer.innerHTML =
          '<div class="footer-cell-brand">' +
            '<a href="/" aria-label="SELZIO — на главную"><img src="assets/selzio-logo-gg-transparent.png?v=20260803-1" alt="SELZIO"></a>' +
            '<p class="footer-cell-tagline">Внедрение AI в процессы компании</p>' +
          '</div>' +
          '<nav class="footer-cell-links" aria-label="' + ui('contactLabel') + '">' +
            '<a href="https://t.me/ishmakof" target="_blank" rel="noopener"><span>Telegram</span><strong>@ishmakof</strong></a>' +
            '<a href="mailto:selzioai@gmail.com"><span>Email</span><strong>selzioai@gmail.com</strong></a>' +
          '</nav>' +
          '<nav class="footer-cell-legal" aria-label="' + ui('legalLabel') + '">' +
            '<a href="privacy.html">' + ui('privacy') + '</a>' +
            '<a href="consent.html">' + ui('consent') + '</a>' +
          '</nav>' +
          '<div class="footer-cell-bottom">' +
            '<div class="footer-cell-languages" role="group" aria-label="' + ui('languageLabel') + '">' +
              ['ru', 'sr', 'en'].map(function (lang) {
                return '<button type="button" data-lang-button="' + lang + '" aria-pressed="' + (lang === currentLang ? 'true' : 'false') + '">' + lang.toUpperCase() + '</button>';
              }).join('') +
            '</div>' +
            '<p class="footer-cell-meta">© 2026 SELZIO</p>' +
          '</div>';
        board.appendChild(footer);
        return;
      }

      var cell = document.createElement('article');
      cell.className = 'window-cell window-cell--direction window-cell--position-' + direction.code + ' tone-' + direction.tone;
      cell.setAttribute('role', 'button');
      cell.setAttribute('tabindex', '0');
      cell.setAttribute('aria-haspopup', 'dialog');
      cell.setAttribute('data-direction-index', entry);
      var hoverCopy = currentLang === 'ru' && direction.hoverRu ? direction.hoverRu : {
        question: text(direction.question),
        summary: text(direction.summary),
        points: direction.points[currentLang]
      };
      if (hoverCopy.flowOnly) {
        cell.classList.add('is-flow-only', 'flow-count-' + hoverCopy.points.length);
        cell.style.setProperty('--flow-count', hoverCopy.points.length);
      }
      if (hoverCopy.lead) cell.classList.add('has-flow-lead');
      var showPointNumbers = hoverCopy.numbered !== false;
      if (!showPointNumbers) cell.classList.add('is-unnumbered');
      var compactPoints = hoverCopy.points.map(function (point, pointIndex) {
        var marker = showPointNumbers
          ? '<span>0' + (pointIndex + 1) + '</span>'
          : '<span class="cell-bullet" aria-hidden="true">•</span>';
        return '<li>' + marker + '<b>' + point + '</b></li>';
      }).join('');
      var compactLead = hoverCopy.lead ? '<li class="cell-lead"><b>' + hoverCopy.lead + '</b></li>' : '';
      var compactResult = hoverCopy.result ? '<li class="cell-result"><b>' + hoverCopy.result + '</b></li>' : '';
      var directionTitle = currentLang === 'ru' && direction.cardTitleRu ? direction.cardTitleRu : text(direction.title);
      var directionSubtitle = currentLang === 'ru' && direction.cardSubtitleRu ? direction.cardSubtitleRu : '';
      var directionTitleWords = directionTitle.trim().split(/\s+/);
      var directionTitleFirst = directionTitleWords.shift();
      var directionTitleRest = directionTitleWords.join(' ');
      cell.innerHTML =
        '<span class="cell-thumb" aria-hidden="true"><img src="' + direction.image + '" alt=""></span>' +
        '<h3><span>' + directionTitleFirst + '</span> <span>' + directionTitleRest + '</span></h3>' +
        (directionSubtitle ? '<span class="cell-cover-subtitle">' + directionSubtitle + '</span>' : '') +
        (hoverCopy.question || hoverCopy.summary ?
          '<span class="cell-context">' +
            '<strong class="cell-question">' + hoverCopy.question + '</strong>' +
            '<span class="cell-summary">' + hoverCopy.summary + '</span>' +
          '</span>' : '') +
        '<ul class="cell-points">' + compactLead + compactPoints + compactResult + '</ul>';
      board.appendChild(cell);
    });
    if (!skipIntro) prepareCoreIntroMorph();
    syncDirectionTitlesWithIntro();
  }

  function setLanguage(lang) {
    if (!interfaceText[lang] || lang === currentLang) return;
    currentLang = lang;
    chatState = { messages: [], busy: false };
    renderBoard(true);
  }

  function prepareCoreIntroMorph() {
    var core = board.querySelector('.window-cell--core');
    var intro = board.querySelector('.core-intro');
    var introLogo = intro && intro.querySelector('img');
    var targetLogo = board.querySelector('.footer-cell-brand img');
    if (!core || !introLogo || !targetLogo) return;

    var measure = function () {
      var coreRect = core.getBoundingClientRect();
      var targetRect = targetLogo.getBoundingClientRect();
      if (!coreRect.width || !coreRect.height || !targetRect.width || !targetRect.height) return;

      var naturalWidth = introLogo.naturalWidth || targetLogo.naturalWidth || 2119;
      var naturalHeight = introLogo.naturalHeight || targetLogo.naturalHeight || 742;
      var introBoxWidth = coreRect.width * 0.86;
      var introBoxHeight = coreRect.height * 0.72;
      var introContainScale = Math.min(introBoxWidth / naturalWidth, introBoxHeight / naturalHeight);
      var targetContainScale = Math.min(targetRect.width / naturalWidth, targetRect.height / naturalHeight);
      var targetScale = targetContainScale / introContainScale;
      var targetX = targetRect.left + targetRect.width / 2 - (coreRect.left + coreRect.width / 2);
      var targetY = targetRect.top + targetRect.height / 2 - (coreRect.top + coreRect.height / 2);

      introLogo.style.setProperty('--intro-to-x', targetX.toFixed(2) + 'px');
      introLogo.style.setProperty('--intro-to-y', targetY.toFixed(2) + 'px');
      introLogo.style.setProperty('--intro-to-scale', targetScale.toFixed(4));
    };

    window.requestAnimationFrame(function () {
      measure();
      window.requestAnimationFrame(measure);
    });
    introLogo.addEventListener('load', measure, { once: true });
    targetLogo.addEventListener('load', measure, { once: true });
  }

  function syncDirectionTitlesWithIntro() {
    var intro = board.querySelector('.core-intro');
    var core = board.querySelector('.window-cell--core');
    var directionCells = Array.from(board.querySelectorAll('.window-cell--direction'));
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var revealTitles = function () {
      window.clearTimeout(introRevealTimer);
      introRevealTimer = 0;
      board.classList.remove('is-intro-active');
      startInlineChatIntro(core, reducedMotion);
      titleRevealTimers.forEach(function (timer) { window.clearTimeout(timer); });
      titleRevealTimers = [];

      if (reducedMotion) {
        directionCells.forEach(function (cell) { cell.classList.add('is-title-visible'); });
        return;
      }

      directionCells.forEach(function (cell, index) {
        titleRevealTimers.push(window.setTimeout(function () {
          cell.classList.add('is-title-visible');
        }, index * 110));
      });
    };

    window.clearTimeout(introRevealTimer);
    if (!intro || reducedMotion) {
      window.requestAnimationFrame(revealTitles);
      return;
    }

    intro.addEventListener('animationend', function (event) {
      if (event.animationName === 'core-intro-layer') revealTitles();
    });
    introRevealTimer = window.setTimeout(revealTitles, 3000);
  }

  function mountInlineChat(core) {
    var body = core.querySelector('[data-inline-chat-body]');
    var form = core.querySelector('[data-inline-chat-form]');
    inlineChatInput = form.querySelector('textarea');
    var send = form.querySelector('button');
    var collapse = core.querySelector('[data-chat-collapse]');

    var greetingText = ui('greeting');
    var greeting = addChatMessage(body, 'assistant', '', false);
    greeting.classList.add('is-awaiting-type');
    core._chatIntro = { body: body, greeting: greeting, text: greetingText, started: false };

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      sendChatMessage(body, send);
    });

    inlineChatInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        form.requestSubmit();
      }
    });

    inlineChatInput.addEventListener('focus', function () {
      if (chatState.messages.length) board.classList.add('is-chat-expanded');
    });

    collapse.addEventListener('click', function () {
      board.classList.remove('is-chat-expanded');
      inlineChatInput.blur();
    });
  }

  function startInlineChatIntro(core, reducedMotion) {
    if (!core || !core._chatIntro || core._chatIntro.started) return;
    var intro = core._chatIntro;
    intro.started = true;
    var revealForm = function () {
      core.classList.add('is-chat-ready');
      var form = core.querySelector('[data-inline-chat-form]');
      if (form) form.removeAttribute('aria-hidden');
    };

    if (reducedMotion) {
      renderBionicText(intro.greeting, intro.text);
      intro.greeting.classList.remove('is-awaiting-type');
      revealForm();
      return;
    }

    chatIntroTimer = window.setTimeout(function () {
      var characters = Array.from(intro.text);
      var characterIndex = 0;
      intro.greeting.classList.remove('is-awaiting-type');
      intro.greeting.classList.add('is-typing');

      var typeNextCharacter = function () {
        characterIndex += 1;
        intro.greeting.textContent = characters.slice(0, characterIndex).join('');
        intro.body.scrollTop = intro.body.scrollHeight;
        if (characterIndex < characters.length) {
          greetingTypingTimer = window.setTimeout(typeNextCharacter, 14);
          return;
        }
        greetingTypingTimer = 0;
        intro.greeting.classList.remove('is-typing');
        renderBionicText(intro.greeting, intro.text);
        revealForm();
      };

      typeNextCharacter();
    }, 340);
  }

  function addChatMessage(body, role, content, remember) {
    var message = document.createElement('div');
    message.className = 'inline-chat-message inline-chat-message--' + role;
    if (role === 'assistant' && content) renderBionicText(message, content);
    else message.textContent = content;
    body.appendChild(message);
    if (remember !== false) {
      chatState.messages.push({ role: role, content: content });
      chatState.messages = chatState.messages.slice(-12);
    }
    body.scrollTop = body.scrollHeight;
    return message;
  }

  function renderBionicText(element, content) {
    var textValue = String(content || '');
    var wordPattern = /[\p{L}\p{N}]+/gu;
    var lastIndex = 0;
    var match;
    element.replaceChildren();

    while ((match = wordPattern.exec(textValue))) {
      if (match.index > lastIndex) element.appendChild(document.createTextNode(textValue.slice(lastIndex, match.index)));

      var characters = Array.from(match[0]);
      var boldLength;
      if (characters.length <= 3) boldLength = 1;
      else if (characters.length <= 5) boldLength = 2;
      else if (characters.length <= 8) boldLength = 3;
      else boldLength = Math.ceil(characters.length * 0.4);

      var lead = document.createElement('span');
      lead.className = 'bionic-lead';
      lead.textContent = characters.slice(0, boldLength).join('');
      element.appendChild(lead);
      element.appendChild(document.createTextNode(characters.slice(boldLength).join('')));
      lastIndex = wordPattern.lastIndex;
    }

    if (lastIndex < textValue.length) element.appendChild(document.createTextNode(textValue.slice(lastIndex)));
  }

  async function sendChatMessage(body, send) {
    var content = inlineChatInput.value.trim();
    if (!content || chatState.busy) return;

    inlineChatInput.value = '';
    addChatMessage(body, 'user', content, true);
    board.classList.add('is-chat-expanded');
    chatState.busy = true;
    send.disabled = true;
    var typing = addChatMessage(body, 'typing', ui('typing'), false);

    try {
      var response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatState.messages,
          language: currentLang,
          mode: 'diagnose',
          page: location.pathname
        })
      });
      var data = await response.json().catch(function () { return {}; });
      if (!response.ok || !data.reply) throw new Error(data.error || 'agent_unavailable');
      typing.remove();
      addChatMessage(body, 'assistant', data.reply, true);
    } catch (error) {
      typing.remove();
      addChatMessage(body, 'assistant', ui('error'), false);
    } finally {
      chatState.busy = false;
      send.disabled = false;
      inlineChatInput.focus();
    }
  }

  function openDirection(index) {
    var direction = directions[index];
    var primaryAction = dialog.querySelector('[data-direction-chat]');
    dialog.className = 'direction-dialog tone-' + direction.tone;
    dialog.querySelector('[data-direction-code]').textContent = direction.kind === 'footer' ? 'SELZIO' : direction.code + ' / 08';
    dialog.querySelector('[data-direction-kicker]').textContent = direction.kind === 'footer'
      ? (currentLang === 'ru' ? 'КОНТАКТЫ И ИНФОРМАЦИЯ' : currentLang === 'sr' ? 'KONTAKT I INFORMACIJE' : 'CONTACT AND INFORMATION')
      : (currentLang === 'ru' ? 'НАПРАВЛЕНИЕ ВНЕДРЕНИЯ' : currentLang === 'sr' ? 'PRAVAC UVOĐENJA' : 'ADOPTION DIRECTION');
    dialog.querySelector('[data-direction-title]').textContent = text(direction.title);
    dialog.querySelector('[data-direction-question]').textContent = text(direction.question);
    dialog.querySelector('[data-direction-summary]').textContent = text(direction.summary);
    primaryAction.textContent = direction.action ? text(direction.action.label) : ui('toChat');
    if (direction.action) primaryAction.setAttribute('data-direction-href', direction.action.href);
    else primaryAction.removeAttribute('data-direction-href');
    var list = dialog.querySelector('[data-direction-points]');
    list.replaceChildren();
    direction.points[currentLang].forEach(function (point, pointIndex) {
      var item = document.createElement('li');
      var number = document.createElement('span');
      var strong = document.createElement('strong');
      number.textContent = '0' + (pointIndex + 1);
      if (direction.links && direction.links[pointIndex]) {
        var link = document.createElement('a');
        link.href = direction.links[pointIndex];
        link.textContent = point;
        if (link.href.indexOf('https://') === 0) {
          link.target = '_blank';
          link.rel = 'noopener';
        }
        strong.appendChild(link);
      } else {
        strong.textContent = point;
      }
      item.append(number, strong);
      list.appendChild(item);
    });
    dialog.showModal();
  }

  board.addEventListener('click', function (event) {
    if (board.classList.contains('is-chat-expanded') && !event.target.closest('.window-cell--core')) {
      board.classList.remove('is-chat-expanded');
    }
    var languageButton = event.target.closest('[data-lang-button]');
    if (languageButton) {
      setLanguage(languageButton.getAttribute('data-lang-button'));
      return;
    }
    var cell = event.target.closest('[data-direction-index]');
    if (!cell) return;
    openDirection(Number(cell.getAttribute('data-direction-index')));
  });

  board.addEventListener('keydown', function (event) {
    var cell = event.target.closest('[data-direction-index]');
    if (!cell || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    openDirection(Number(cell.getAttribute('data-direction-index')));
  });

  dialog.addEventListener('click', function (event) {
    if (event.target === dialog || event.target.closest('[data-direction-close]')) dialog.close();
    if (event.target.closest('[data-direction-chat]')) {
      var directionHref = event.target.closest('[data-direction-chat]').getAttribute('data-direction-href');
      if (directionHref) {
        window.location.assign(directionHref);
        return;
      }
      dialog.close();
      window.requestAnimationFrame(function () { inlineChatInput.focus(); });
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && board.classList.contains('is-chat-expanded') && !dialog.open) {
      board.classList.remove('is-chat-expanded');
      inlineChatInput.blur();
    }
  });

  renderBoard();
})();
