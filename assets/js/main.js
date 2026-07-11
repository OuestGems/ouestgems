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

  function normalize(value) {
    return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function contactLink() {
    var match = window.location.pathname.match(/oge-\d{3}/i);
    var reference = match ? ' concernant ' + match[0].toUpperCase() : '';
    var subject = encodeURIComponent('Demande d’information Ouest Gems Export' + reference);
    return 'mailto:ouestgems.export@gmail.com?subject=' + subject;
  }

  var shell = document.createElement('aside');
  shell.className = 'oge-assistant';
  shell.setAttribute('aria-label', 'Assistant Ouest Gems Export');
  shell.innerHTML = [
    '<button class="oge-assistant-toggle" type="button" aria-expanded="false" aria-controls="oge-assistant-panel">',
    '<span class="oge-assistant-status" aria-hidden="true"></span>',
    '<span>Une question ?</span>',
    '</button>',
    '<section class="oge-assistant-panel" id="oge-assistant-panel" hidden>',
    '<header><div><strong>Assistant Ouest Gems</strong><small>Réponses instantanées</small></div><button type="button" class="oge-assistant-close" aria-label="Fermer">×</button></header>',
    '<div class="oge-assistant-messages" aria-live="polite"></div>',
    '<p class="oge-assistant-quick-title">Choisissez une question</p>',
    '<div class="oge-assistant-quick" aria-label="Questions fréquentes"></div>',
    '<form class="oge-assistant-form"><label class="sr-only" for="oge-assistant-input">Votre question</label><input id="oge-assistant-input" type="text" autocomplete="off" placeholder="Écrivez votre question…"><button type="submit">Envoyer</button></form>',
    '<p class="oge-assistant-note">Assistant automatique · Pour une réponse personnalisée, contactez notre équipe.</p>',
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
      addMessage('Bonjour, je suis l’assistant Ouest Gems Export. Comment puis-je vous renseigner ?', 'bot');
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
        addMessage('Je n’ai pas encore une réponse validée à cette question. <a href="' + contactLink() + '">Écrivez-nous directement</a> : nous vous répondrons personnellement.', 'bot', true);
      }
    }, 220);
  });
})();
