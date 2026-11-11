const productData = {
  "pendentif-main": { name: "Pendentif Main d’émeraude", category: "Pièce manifeste", price: "490 €", image: "assets/produits/main.jpg", description: "Un talisman sculptural façonné autour d’une émeraude naturelle au caractère affirmé." },
  "collier-cage": { name: "Collier Cage spirale", category: "Collier", price: "320 €", image: "assets/produits/cage.jpg", description: "Une ligne organique en or enlace l’émeraude et en révèle les nuances profondes." },
  "pendentif-file": { name: "Pendentif Émeraude filée", category: "Pendentif", price: "410 €", image: "assets/produits/goutte.jpg", description: "Une construction aérienne, dessinée comme un fil continu autour d’une émeraude naturelle." },
  "bague-branche": { name: "Bague Branche", category: "Bague", price: "540 €", image: "assets/produits/branche.jpg", description: "Une monture organique et texturée qui semble avoir poussé autour de la pierre." },
  "bague-griffes": { name: "Bague Griffes", category: "Bague", price: "380 €", image: "assets/produits/griffes.jpg", description: "Une bague franche et contemporaine, centrée sur la profondeur d’une émeraude rectangulaire." }
};

const state = { cart: [], favorites: new Set() };
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menu = $("[data-menu]");
const selectionPanel = $("[data-selection-panel]");
const dialog = $("[data-product-dialog]");

function openPanel(panel) {
  [menu, selectionPanel].forEach((item) => { if (item !== panel) item.classList.remove("open"); });
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");
  document.body.classList.add("panel-open");
}

function closePanels() {
  [menu, selectionPanel].forEach((panel) => { panel.classList.remove("open"); panel.setAttribute("aria-hidden", "true"); });
  document.body.classList.remove("panel-open");
  $$('[data-menu-open]').forEach((button) => button.setAttribute("aria-expanded", "false"));
}

$$('[data-menu-open]').forEach((button) => button.addEventListener("click", () => {
  openPanel(menu);
  button.setAttribute("aria-expanded", "true");
}));
$$('[data-panel-close]').forEach((button) => button.addEventListener("click", closePanels));
$$('.menu-panel a').forEach((link) => link.addEventListener("click", closePanels));

function openProduct(id) {
  const product = productData[id];
  dialog.dataset.activeProduct = id;
  $("[data-dialog-image]").src = product.image;
  $("[data-dialog-image]").alt = product.name;
  $("[data-dialog-category]").textContent = product.category;
  $("[data-dialog-name]").textContent = product.name;
  $("[data-dialog-description]").textContent = product.description;
  $("[data-dialog-price]").textContent = product.price;
  dialog.showModal();
}

$$('[data-product]').forEach((card) => {
  $('.card-image', card).addEventListener('click', () => openProduct(card.dataset.product));
  $('.favorite', card).addEventListener('click', (event) => {
    const id = card.dataset.product;
    if (state.favorites.has(id)) state.favorites.delete(id); else state.favorites.add(id);
    event.currentTarget.classList.toggle('active', state.favorites.has(id));
    event.currentTarget.textContent = state.favorites.has(id) ? '♥' : '♡';
    $$('[data-favorites-count]').forEach((node) => node.textContent = state.favorites.size);
  });
});

$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
$('[data-add-cart]').addEventListener('click', () => {
  const id = dialog.dataset.activeProduct;
  if (!state.cart.includes(id)) state.cart.push(id);
  $$('[data-cart-count]').forEach((node) => node.textContent = state.cart.length);
  dialog.close();
  renderSelection('Votre sélection', state.cart);
  openPanel(selectionPanel);
});

function renderSelection(title, ids) {
  $('[data-selection-title]').textContent = title;
  const content = $('[data-selection-content]');
  if (!ids.length) {
    content.innerHTML = `<p class="selection-empty">Votre sélection est encore vide.</p>`;
    return;
  }
  content.innerHTML = ids.map((id) => {
    const product = productData[id];
    return `<article class="selection-item"><img src="${product.image}" alt=""><div><h3>${product.name}</h3><p>${product.price}</p></div><span>↗</span></article>`;
  }).join('');
}

$('[data-cart-open]').addEventListener('click', () => { renderSelection('Votre sélection', state.cart); openPanel(selectionPanel); });
$('[data-favorites-open]')?.addEventListener('click', () => { renderSelection('Vos favoris', [...state.favorites]); openPanel(selectionPanel); });

const story = $('.collection-story');
const heading = $('[data-story-heading]');
const envelope = $('[data-envelope]');
const flap = $('.envelope-flap');
const cards = $$('.product-card');
const progressBar = $('[data-story-progress]');

function clamp(value, min = 0, max = 1) { return Math.max(min, Math.min(max, value)); }
function rangeProgress(value, start, end) { return clamp((value - start) / (end - start)); }

function updateStory() {
  const rect = story.getBoundingClientRect();
  const total = story.offsetHeight - innerHeight;
  const progress = clamp(-rect.top / total);
  progressBar.style.height = `${progress * 100}%`;

  if (innerWidth > 900) {
    const headingFade = rangeProgress(progress, .16, .31);
    heading.style.opacity = 1 - headingFade * .82;
    heading.style.filter = `blur(${headingFade * 7}px)`;
    heading.style.transform = `translateY(${-headingFade * 40}px)`;

    const envelopeOpen = rangeProgress(progress, .17, .38);
    flap.style.transform = `rotateX(${-180 * envelopeOpen}deg)`;
    envelope.style.transform = `translateY(${12 - envelopeOpen * 8}%) scale(${.92 + envelopeOpen * .08})`;
    envelope.style.opacity = 1 - rangeProgress(progress, .5, .65);

    const fan = rangeProgress(progress, .35, .63);
    const spread = rangeProgress(progress, .62, .87);
    cards.forEach((card, index) => {
      const i = index - 2;
      const fanX = i * 58 * fan;
      const fanY = (190 - Math.abs(i) * 18) * (1 - fan);
      const finalX = i * Math.min(250, innerWidth * .19) * spread;
      const x = fanX * (1 - spread) + finalX;
      const rotation = i * 7 * (1 - spread);
      const scale = .72 + fan * .18 + spread * .08;
      card.style.opacity = clamp(fan * 1.8);
      card.style.transform = `translate(${x}px, ${fanY}px) rotate(${rotation}deg) scale(${scale})`;
    });
  }
}

const floatingJewels = $$('[data-float]');
function updateFloat() {
  const match = $('.match').getBoundingClientRect();
  floatingJewels.forEach((jewel) => {
    const amount = Number(jewel.dataset.float);
    const offset = (innerHeight - match.top) * amount;
    jewel.style.translate = `0 ${offset}px`;
  });
}

let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateStory(); updateFloat(); ticking = false; });
}, { passive: true });
addEventListener('resize', updateStory);
updateStory();

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePanels();
});
