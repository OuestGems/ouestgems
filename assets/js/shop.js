(function () {
  'use strict';
  var products = [
    { id: 'main', name: 'Pendentif Main d’émeraude', category: 'Pendentif · Pièce manifeste', meta: 'Or ciselé, émeraude naturelle de Swat', price: 490, image: 'assets/produits/main.jpg', section: 'colliers', stripe: '' },
    { id: 'cage', name: 'Collier Cage spirale', category: 'Collier', meta: 'Argent, émeraude libre dans la cage', price: 320, image: 'assets/produits/cage.jpg', section: 'colliers', stripe: '' },
    { id: 'goutte', name: 'Pendentif Émeraude filée', category: 'Pendentif', meta: 'Fil d’or, émeraude taille émeraude', price: 410, image: 'assets/produits/goutte.jpg', section: 'colliers', stripe: '' },
    { id: 'branche', name: 'Bague Branche', category: 'Bague', meta: 'Or, monture en branches, émeraude sertie', price: 540, image: 'assets/produits/branche.jpg', section: 'bagues', stripe: '' },
    { id: 'griffes', name: 'Bague Griffes', category: 'Bague', meta: 'Argent martelé, émeraude sertie, taille réglable', price: 380, image: 'assets/produits/griffes.jpg', section: 'bagues', stripe: '' }
  ];
  var grid = document.querySelector('#product-grid');
  var panel = document.querySelector('#product-panel');
  var menu = document.querySelector('#menu');
  var scrim = document.querySelector('.scrim');
  var menuButton = document.querySelector('.menu-button');
  var mail = 'ouestgems.export@gmail.com';
  var euro = function (price) { return price.toLocaleString('fr-FR') + ' €'; };

  grid.innerHTML = products.map(function (product, index) {
    return '<article class="product-card" id="' + (index === 0 || products[index - 1].section !== product.section ? product.section : '') + '">' +
      '<button class="product-image" type="button" data-product="' + product.id + '" aria-label="Découvrir ' + product.name + '"><img src="' + product.image + '" alt="' + product.name + '" loading="' + (index < 2 ? 'eager' : 'lazy') + '"><span>Vue rapide</span></button>' +
      '<div class="product-info"><div><p>' + product.category + '</p><h3>' + product.name + '</h3></div><strong>' + euro(product.price) + '</strong></div>' +
      '<button class="quick-buy" type="button" data-product="' + product.id + '">Découvrir et commander</button></article>';
  }).join('');

  function showScrim() { scrim.hidden = false; requestAnimationFrame(function () { scrim.classList.add('visible'); }); }
  function hideScrim() { scrim.classList.remove('visible'); window.setTimeout(function () { if (!menu.classList.contains('open') && !panel.classList.contains('open')) scrim.hidden = true; }, 350); }
  function closeAll() { menu.classList.remove('open'); panel.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); panel.setAttribute('aria-hidden', 'true'); menuButton.setAttribute('aria-expanded', 'false'); document.body.classList.remove('locked'); hideScrim(); }
  function openMenu() { closeAll(); menu.classList.add('open'); menu.setAttribute('aria-hidden', 'false'); menuButton.setAttribute('aria-expanded', 'true'); document.body.classList.add('locked'); showScrim(); menu.querySelector('.close-button').focus(); }
  function openProduct(id) {
    var product = products.find(function (item) { return item.id === id; }); if (!product) return;
    closeAll(); panel.querySelector('img').src = product.image; panel.querySelector('img').alt = product.name;
    panel.querySelector('.panel-category').textContent = product.category; panel.querySelector('h2').textContent = product.name;
    panel.querySelector('.panel-meta').textContent = product.meta; panel.querySelector('.panel-price').textContent = euro(product.price);
    var buy = panel.querySelector('.panel-buy');
    buy.href = product.stripe || 'mailto:' + mail + '?subject=' + encodeURIComponent('Commande — ' + product.name) + '&body=' + encodeURIComponent('Bonjour,\n\nJe souhaite commander la pièce « ' + product.name + ' » au prix de ' + euro(product.price) + '.\n\nMerci de me transmettre le lien de paiement sécurisé.');
    buy.textContent = product.stripe ? 'Payer en ligne' : 'Commander cette pièce';
    panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false'); document.body.classList.add('locked'); showScrim(); panel.querySelector('.panel-close').focus();
  }
  menuButton.addEventListener('click', openMenu);
  document.querySelectorAll('.close-button').forEach(function (button) { button.addEventListener('click', closeAll); });
  document.querySelectorAll('[data-product]').forEach(function (button) { button.addEventListener('click', function () { openProduct(button.dataset.product); }); });
  scrim.addEventListener('click', closeAll);
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeAll(); });
  menu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeAll); });
  document.querySelector('.bag-button').addEventListener('click', function () { openProduct(products[0].id); });
})();
