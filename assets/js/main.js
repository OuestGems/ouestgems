(function () {
  'use strict';

  document.querySelectorAll('.thumbs img').forEach(function (img) {
    img.addEventListener('click', function () {
      var wrap = img.closest('.gallery');
      if (!wrap) return;
      var main = wrap.querySelector('.gallery-main');
      if (main) main.src = img.src;
      wrap.querySelectorAll('.thumbs img').forEach(function (item) { item.classList.remove('active'); });
      img.classList.add('active');
    });
  });

  document.querySelectorAll('[data-contact]').forEach(function (button) {
    button.addEventListener('click', function () {
      var modal = document.querySelector('.modal');
      if (modal) modal.classList.add('open');
    });
  });
  document.querySelectorAll('[data-close]').forEach(function (button) {
    button.addEventListener('click', function () {
      var modal = document.querySelector('.modal');
      if (modal) modal.classList.remove('open');
    });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      var modal = document.querySelector('.modal');
      if (modal) modal.classList.remove('open');
    }
  });

  var answers = [
    {
      id: 'natural',
      label: 'Sont-elles naturelles ?',
      keywords: ['naturelle', 'naturel', 'vraie', 'authentique', 'authenticite'],
      answer: 'Oui. Ouest Gems Export présente une sélection d’émeraudes naturelles choisies directement à la source.'
    },
    {
      id: 'origin',
      label: 'Quelle est leur origine ?',
      keywords: ['origine', 'pakistan', 'swat', 'mine', 'provenance'],
      answer: 'Les pierres présentées proviennent du Pakistan, notamment de la vallée de Swat. L’origine précise disponible est indiquée sur chaque fiche.'
    },
    {
      id: 'certificate',
      label: 'Sont-elles certifiées ?',
      keywords: ['certificat', 'certifie', 'certification', 'laboratoire', 'rapport', 'guild', 'gia', 'ssef', 'gemtrue'],
      answer: 'Chaque fiche indique le laboratoire et la référence du rapport gemmologique disponible pour la pierre. Vous pouvez demander le dossier complet avant toute décision.'
    },
    {
      id: 'price',
      label: 'Comment connaître le prix ?',
      keywords: ['prix', 'tarif', 'combien', 'cout', 'coût', 'budget'],
      answer: 'Les prix sont communiqués sur demande afin de vous transmettre en même temps les informations complètes propres à la pierre qui vous intéresse.'
    },
    {
      id: 'details',
      label: 'Recevoir photos et vidéos',
      keywords: ['photo', 'video', 'vidéo', 'dossier', 'dimension', 'poids', 'carat', 'information'],
      answer: 'Oui. Nous pouvons vous transmettre des photographies complémentaires, des vidéos et les informations gemmologiques disponibles pour chaque pierre.'
    },
    {
      id: 'treatment',
      label: 'Quel est le traitement ?',
      keywords: ['traitement', 'huile', 'huilage', 'resine', 'résine'],
      answer: 'Le traitement éventuel dépend de chaque pierre et doit être vérifié sur son certificat. Demandez-nous la référence concernée pour obtenir l’information exacte.'
    },
    {
      id: 'shipping-area',
      label: 'Livrez-vous dans le monde entier ?',
      keywords: ['livraison', 'livrez', 'expedition', 'expédiez', 'pays', 'monde', 'international', 'etranger', 'étranger'],
      answer: 'Oui. Ouest Gems Export expédie ses pierres partout dans le monde depuis la France, sous 48 heures. Les envois sont assurés.'
    },
    {
      id: 'shipping-time',
      label: 'Quel est le délai d’expédition ?',
      keywords: ['delai', 'délai', '48h', '48 h', 'quand', 'rapidement'],
      answer: 'Les pierres sont expédiées depuis la France sous 48 heures.'
    },
    {
      id: 'insured',
      label: 'Les envois sont-ils assurés ?',
      keywords: ['assure', 'assuré', 'assurance', 'securise', 'sécurisé'],
      answer: 'Oui. Les envois sont assurés.'
    },
    {
      id: 'payment',
      label: 'Comment puis-je payer ?',
      keywords: ['paiement', 'payer', 'reglement', 'règlement', 'virement', 'carte bancaire', 'paypal'],
      answer: 'Le règlement s’effectue par virement bancaire.'
    },
    {
      id: 'reservation',
      label: 'Puis-je réserver une pierre ?',
      keywords: ['reserver', 'réserver', 'reservation', 'réservation', 'bloquer', '12h', '12 h'],
      answer: 'Oui. Une pierre peut être réservée pendant 12 heures.'
    },
    {
      id: 'original-certificate',
      label: 'Le certificat original est-il fourni ?',
      keywords: ['certificat original', 'original du certificat', 'livre avec', 'livré avec'],
      answer: 'Oui. Le certificat original disponible est fourni avec la pierre.'
    },
    {
      id: 'jewelry',
      label: 'Proposez-vous aussi des bijoux ?',
      keywords: ['bijou', 'bijoux', 'bague', 'collier', 'joaillerie', 'monture', 'sertissage'],
      answer: 'Ouest Gems Export propose uniquement des pierres, sans création de bijoux.'
    },
    {
      id: 'professionals',
      label: 'Travaillez-vous avec des professionnels ?',
      keywords: ['professionnel', 'bijoutier', 'joaillier', 'partenariat', 'revendeur', 'b2b'],
      answer: 'Oui. Des partenariats avec des professionnels sont possibles sur simple demande.'
    },
    {
      id: 'sourcing',
      label: 'Pouvez-vous rechercher une pierre ?',
      keywords: ['recherche personnalisee', 'recherche personnalisée', 'sur mesure', 'critere', 'critère', 'couleur precise', 'couleur précise'],
      answer: 'Oui. Une recherche personnalisée selon vos critères est possible sur simple demande.'
    }
  ];

  var isEnglish = document.documentElement.lang.toLowerCase().indexOf('en') === 0;
  var englishAnswers = [
    { id: 'natural', label: 'Are the emeralds natural?', keywords: ['natural', 'genuine', 'real', 'authentic'], answer: 'Yes. Ouest Gems Export presents a selection of natural emeralds chosen directly at the source.' },
    { id: 'origin', label: 'Where do the emeralds come from?', keywords: ['origin', 'pakistan', 'swat', 'mine', 'provenance', 'come from'], answer: 'The stones presented come from Pakistan, particularly the Swat Valley. The available origin information is shown on each stone’s page.' },
    { id: 'certificate', label: 'Are the emeralds certified?', keywords: ['certificate', 'certified', 'certification', 'laboratory', 'report', 'guild', 'gia', 'ssef', 'gemtrue'], answer: 'Each stone’s page states the gemological laboratory and report reference available for that emerald. You may request the complete documentation before making a decision.' },
    { id: 'price', label: 'How can I obtain the price?', keywords: ['price', 'cost', 'budget', 'how much', 'quote'], answer: 'Prices are provided on request so that we can send you the complete information specific to the stone at the same time.' },
    { id: 'details', label: 'Can I receive more photos and videos?', keywords: ['photo', 'video', 'documentation', 'dimension', 'weight', 'carat', 'information'], answer: 'Yes. We can provide additional photographs, videos and all available gemological information for each stone.' },
    { id: 'treatment', label: 'Has the emerald been treated?', keywords: ['treatment', 'treated', 'oil', 'oiling', 'resin'], answer: 'Any treatment depends on the individual stone and must be checked on its certificate. Send us the reference concerned to receive the exact information.' },
    { id: 'shipping-area', label: 'Do you ship worldwide?', keywords: ['shipping', 'ship', 'delivery', 'country', 'worldwide', 'international', 'abroad'], answer: 'Yes. Ouest Gems Export ships stones worldwide from France within 48 hours. Shipments are insured.' },
    { id: 'shipping-time', label: 'What is the dispatch time?', keywords: ['dispatch time', 'delivery time', '48 hours', 'when', 'how quickly'], answer: 'Stones are dispatched from France within 48 hours.' },
    { id: 'insured', label: 'Are shipments insured?', keywords: ['insured', 'insurance', 'secure shipment'], answer: 'Yes. Shipments are insured.' },
    { id: 'payment', label: 'How can I pay?', keywords: ['payment', 'pay', 'bank transfer', 'credit card', 'paypal'], answer: 'Payment is made by bank transfer.' },
    { id: 'reservation', label: 'Can I reserve a stone?', keywords: ['reserve', 'reservation', 'hold', '12 hours'], answer: 'Yes. A stone can be reserved for 12 hours.' },
    { id: 'original-certificate', label: 'Is the original certificate included?', keywords: ['original certificate', 'certificate included', 'provided with'], answer: 'Yes. The available original certificate is provided with the stone.' },
    { id: 'jewelry', label: 'Do you also sell jewellery?', keywords: ['jewellery', 'jewelry', 'ring', 'necklace', 'setting', 'mounting'], answer: 'Ouest Gems Export offers loose stones only and does not create jewellery.' },
    { id: 'professionals', label: 'Do you work with professionals?', keywords: ['professional', 'jeweller', 'jeweler', 'partnership', 'retailer', 'b2b'], answer: 'Yes. Partnerships with professionals are available on request.' },
    { id: 'sourcing', label: 'Can you source a specific stone?', keywords: ['specific stone', 'personal search', 'bespoke', 'criteria', 'specific colour', 'specific color', 'source'], answer: 'Yes. A personalised search based on your criteria is available on request.' }
  ];
  if (isEnglish) answers = englishAnswers;

  var copy = isEnglish ? {
    toggle: 'Any questions?', instant: 'Instant answers', close: 'Close', choose: 'Choose a question',
    frequent: 'Frequently asked questions', question: 'Your question', placeholder: 'Type your question…',
    send: 'Send', note: 'Automated assistant · For a personalised answer, contact our team.',
    greeting: 'Hello, I am the Ouest Gems Export assistant. How may I help you?',
    fallback: 'I do not yet have a validated answer to that question. <a href="{link}">Contact us directly</a> and our team will reply personally.'
  } : {
    toggle: 'Une question ?', instant: 'Réponses instantanées', close: 'Fermer', choose: 'Choisissez une question',
    frequent: 'Questions fréquentes', question: 'Votre question', placeholder: 'Écrivez votre question…',
    send: 'Envoyer', note: 'Assistant automatique · Pour une réponse personnalisée, contactez notre équipe.',
    greeting: 'Bonjour, je suis l’assistant Ouest Gems Export. Comment puis-je vous renseigner ?',
    fallback: 'Je n’ai pas encore une réponse validée à cette question. <a href="{link}">Écrivez-nous directement</a> : nous vous répondrons personnellement.'
  };

  function normalize(value) {
    return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function contactLink() {
    var match = window.location.pathname.match(/oge-\d{3}/i);
    var reference = match ? (isEnglish ? ' about ' : ' concernant ') + match[0].toUpperCase() : '';
    var subject = encodeURIComponent((isEnglish ? 'Information request — Ouest Gems Export' : 'Demande d’information Ouest Gems Export') + reference);
    return 'mailto:ouestgems.export@gmail.com?subject=' + subject;
  }

  var shell = document.createElement('aside');
  shell.className = 'oge-assistant';
  shell.setAttribute('aria-label', 'Assistant Ouest Gems Export');
  shell.innerHTML = [
    '<button class="oge-assistant-toggle" type="button" aria-expanded="false" aria-controls="oge-assistant-panel">',
    '<span class="oge-assistant-status" aria-hidden="true"></span>',
    '<span>' + copy.toggle + '</span>',
    '</button>',
    '<section class="oge-assistant-panel" id="oge-assistant-panel" hidden>',
    '<header><div><strong>Ouest Gems Assistant</strong><small>' + copy.instant + '</small></div><button type="button" class="oge-assistant-close" aria-label="' + copy.close + '">×</button></header>',
    '<div class="oge-assistant-messages" aria-live="polite"></div>',
    '<p class="oge-assistant-quick-title">' + copy.choose + '</p>',
    '<div class="oge-assistant-quick" aria-label="' + copy.frequent + '"></div>',
    '<form class="oge-assistant-form"><label class="sr-only" for="oge-assistant-input">' + copy.question + '</label><input id="oge-assistant-input" type="text" autocomplete="off" placeholder="' + copy.placeholder + '"><button type="submit">' + copy.send + '</button></form>',
    '<p class="oge-assistant-note">' + copy.note + '</p>',
    '</section>'
  ].join('');
  document.body.appendChild(shell);

  var toggle = shell.querySelector('.oge-assistant-toggle');
  var panel = shell.querySelector('.oge-assistant-panel');
  var close = shell.querySelector('.oge-assistant-close');
  var messages = shell.querySelector('.oge-assistant-messages');
  var quick = shell.querySelector('.oge-assistant-quick');
  var form = shell.querySelector('.oge-assistant-form');
  var input = shell.querySelector('#oge-assistant-input');

  function addMessage(text, role, allowHtml) {
    var item = document.createElement('div');
    item.className = 'oge-message oge-message-' + role;
    if (allowHtml) item.innerHTML = text;
    else item.textContent = text;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
  }

  function openPanel() {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    if (!messages.children.length) {
      addMessage(copy.greeting, 'bot');
    }
  }

  function closePanel() {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }

  function respond(entry) {
    addMessage(entry.label, 'user');
    window.setTimeout(function () { addMessage(entry.answer, 'bot'); }, 180);
  }

  answers.forEach(function (entry) {
    var button = document.createElement('button');
    button.type = 'button';
    button.textContent = entry.label;
    button.addEventListener('click', function () { respond(entry); });
    quick.appendChild(button);
  });

  toggle.addEventListener('click', function () { panel.hidden ? openPanel() : closePanel(); });
  close.addEventListener('click', closePanel);
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var question = input.value.trim();
    if (!question) return;
    addMessage(question, 'user');
    input.value = '';
    var normalized = normalize(question);
    var found = answers.find(function (entry) {
      return entry.keywords.some(function (keyword) { return normalized.indexOf(normalize(keyword)) !== -1; });
    });
    window.setTimeout(function () {
      if (found) {
        addMessage(found.answer, 'bot');
      } else {
        addMessage(copy.fallback.replace('{link}', contactLink()), 'bot', true);
      }
    }, 220);
  });
})();

/* Collection filters, purchase journey and contact forms */
(function () {
  'use strict';

  var filterForm = document.querySelector('[data-collection-filters]');
  if (filterForm) {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.catalogue-grid .gem-card'));
    var count = document.querySelector('[data-result-count]');

    function filterCollection() {
      var weight = filterForm.querySelector('[name="weight"]').value;
      var lab = filterForm.querySelector('[name="lab"]').value;
      var visible = 0;

      cards.forEach(function (card) {
        var carats = parseFloat(card.dataset.weight || '0');
        var weightMatch = weight === 'all' ||
          (weight === 'under-1-25' && carats < 1.25) ||
          (weight === '1-25-1-50' && carats >= 1.25 && carats <= 1.50) ||
          (weight === 'over-1-50' && carats > 1.50);
        var labMatch = lab === 'all' || card.dataset.lab === lab;
        card.hidden = !(weightMatch && labMatch);
        if (!card.hidden) visible += 1;
      });

      if (count) count.textContent = visible + (visible > 1 ? ' pièces' : ' pièce');
    }

    filterForm.addEventListener('change', filterCollection);
    filterForm.addEventListener('reset', function () {
      window.setTimeout(filterCollection, 0);
    });
  }

  var contactForm = document.querySelector('[data-inquiry-form]');
  if (contactForm) {
    var referenceField = contactForm.querySelector('[name="reference"]');
    var requestField = contactForm.querySelector('[name="request"]');
    var status = contactForm.querySelector('[data-form-status]');
    var contactSection = contactForm.closest('#contact');
    var contactLead = contactSection ? contactSection.querySelector('.inquiry-copy .lead') : null;
    var contactReassurance = contactSection ? contactSection.querySelector('.product-copy') : null;
    var formNote = contactForm.querySelector('.form-note');
    var subjectField = document.createElement('input');
    subjectField.type = 'hidden';
    subjectField.name = '_subject';
    subjectField.value = 'Nouvelle demande Ouest Gems Export';
    contactForm.appendChild(subjectField);

    if (contactLead) {
      contactLead.textContent = 'Notre équipe répond personnellement sous 24 heures ouvrées et peut transmettre le prix, des photographies complémentaires, des vidéos et le dossier gemmologique de chaque pierre.';
    }
    if (contactReassurance) {
      contactReassurance.textContent = 'Accusé de réception immédiat · Réponse sous 24 h ouvrées · Aucune obligation d’achat.';
    }
    if (formNote) {
      formNote.textContent = 'Vous recevrez immédiatement une confirmation par e-mail. Notre équipe vous répondra personnellement sous 24 heures ouvrées.';
    }
    var requestedReference = new URLSearchParams(window.location.search).get('reference');
    if (referenceField && requestedReference) referenceField.value = requestedReference.toUpperCase();

    document.querySelectorAll('[data-contact]').forEach(function (button) {
      button.addEventListener('click', function () {
        if (referenceField && button.dataset.reference) referenceField.value = button.dataset.reference;
      });
    });

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      var selectedReference = referenceField ? referenceField.value : '';
      var selectedRequest = requestField ? requestField.value : '';
      subjectField.value = 'Nouvelle demande Ouest Gems' +
        (selectedReference ? ' — ' + selectedReference : ' — générale') +
        (selectedRequest ? ' — ' + selectedRequest : '');
      var data = new FormData(contactForm);
      var submitButton = contactForm.querySelector('[type="submit"]');
      var originalLabel = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Envoi en cours…';
      if (status) {
        status.hidden = false;
        status.textContent = 'Transmission sécurisée de votre demande…';
      }

      fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      }).then(function (response) {
        if (!response.ok) throw new Error('Formspree response error');
        contactForm.reset();
        if (referenceField && selectedReference) referenceField.value = selectedReference;
        if (status) {
          status.textContent = 'Merci. Votre demande' +
            (selectedReference ? ' pour la pierre ' + selectedReference : '') +
            ' a bien été transmise. Un e-mail de confirmation vient de vous être envoyé et notre équipe vous répondra sous 24 heures ouvrées.';
          status.classList.add('success');
        }
        submitButton.textContent = 'Demande envoyée';
      }).catch(function () {
        if (status) {
          status.innerHTML = 'L’envoi n’a pas abouti. Vous pouvez nous écrire à <a href="mailto:ouestgems.export@gmail.com">ouestgems.export@gmail.com</a>.';
          status.classList.remove('success');
        }
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      });
    });
  }
})();
