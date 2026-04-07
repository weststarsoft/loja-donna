// ─────────────────────────────────────────
//  APP.JS — lógica principal da Loja Donna
// ─────────────────────────────────────────

let cart     = [];
let wishlist = [];
let activeCat  = 'all';
let bannerIdx  = 0;

// helpers
const fmt  = v => 'R$ ' + v.toFixed(2).replace('.', ',');
const fmtV = v => v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v;
const mod  = (n, m) => ((n % m) + m) % m;

// ── CONTATO ───────────────────────────────
function openWhatsApp() {
  window.open('https://wa.me/' + WHATSAPP_NUMBER, '_blank');
}
function openInstagram() {
  window.open('https://instagram.com/' + INSTAGRAM_USER, '_blank');
}

// ── NAVEGAÇÃO ─────────────────────────────
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
  const ni = document.getElementById('nav-' + name);
  if (ni) ni.classList.add('active');
  if (name === 'cart')     renderCart();
  if (name === 'wishlist') renderWishlist();
}

function toggleDrawer() {
  document.getElementById('drawer').classList.toggle('open');
  document.getElementById('drawer-overlay').classList.toggle('open');
}

function updateBadge() {
  document.getElementById('cart-badge').textContent =
    cart.reduce((a, c) => a + c.qty, 0);
}

// ── BANNERS ───────────────────────────────
function initBanners() {
  const dotsEl = document.getElementById('banner-dots');
  BANNERS.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'bdot' + (i === 0 ? ' active' : '');
    d.onclick = () => goBanner(i);
    dotsEl.appendChild(d);
  });
  applyBanner(0);
  setInterval(() => goBanner((bannerIdx + 1) % BANNERS.length), 3400);
}

function goBanner(i) {
  bannerIdx = i;
  applyBanner(i);
  document.querySelectorAll('.bdot').forEach((d, j) =>
    d.classList.toggle('active', j === i)
  );
}

function applyBanner(i) {
  const b = BANNERS[i];
  document.getElementById('banner-card').style.background = b.bg;
  const t = document.getElementById('b-title');
  t.textContent = b.title; t.style.color = b.titleColor;
  const s = document.getElementById('b-sub');
  s.textContent = b.sub; s.style.color = b.subColor;
  document.getElementById('b-emoji').textContent = b.emoji;
  const cta = document.getElementById('b-cta');
  cta.style.background = b.ctaBg;
  cta.style.color = b.ctaColor;
}

// ── CATEGORIAS ────────────────────────────
function initCatTabs() {
  const wrap = document.getElementById('cat-tabs');

  const all = document.createElement('button');
  all.className = 'cat-tab active';
  all.dataset.cat = 'all';
  all.textContent = 'Todas';
  all.onclick = () => {
    activeCat = 'all';
    document.querySelectorAll('.cat-tab')
      .forEach(t => t.classList.toggle('active', t.dataset.cat === 'all'));
    renderSections();
  };
  wrap.appendChild(all);

  CATS.forEach(c => {
    const t = document.createElement('button');
    t.className = 'cat-tab';
    t.dataset.cat = c.id;
    t.textContent = c.label;
    t.onclick = () => setCat(c.id);
    wrap.appendChild(t);
  });
}

function setCat(cat) {
  activeCat = cat;
  document.querySelectorAll('.cat-tab')
    .forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
  renderSections();
  showScreen('home');
}

// ── COVER FLOW INFINITO ───────────────────
function makeCoverFlow(items, uid) {
  const n = items.length;
  let active = 0;
  let animating = false;

  function slotStyle(rel) {
    const abs = Math.abs(rel);
    return {
      scale: rel === 0 ? 1 : 0.78 - abs * 0.03,
      tx:    rel * 130,
      tz:    rel === 0 ? 0 : -115 - abs * 16,
      ry:    rel === 0 ? 0 : rel > 0 ? -26 : 26,
      op:    abs > 1 ? 0.40 : rel === 0 ? 1 : 0.68,
      zi:    10 - abs * 3,
      trans: animating
        ? 'transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.38s ease'
        : 'none',
    };
  }

  function applyStyles() {
    wrap.querySelectorAll('.cf-card').forEach((card, i) => {
      let rel = i - active;
      if (rel >  n / 2) rel -= n;
      if (rel < -n / 2) rel += n;
      const s = slotStyle(rel);
      card.style.transition = s.trans;
      card.style.transform  =
        `translateX(${s.tx}px) translateZ(${s.tz}px) rotateY(${s.ry}deg) scale(${s.scale})`;
      card.style.opacity      = s.op;
      card.style.zIndex       = s.zi;
      card.style.pointerEvents = rel === 0 ? 'auto' : 'none';
    });
    const dotsEl = document.getElementById('d-' + uid);
    if (dotsEl)
      dotsEl.querySelectorAll('.cf-dot')
        .forEach((d, i) => d.classList.toggle('active', i === active));
  }

  function go(dir) {
    if (animating) return;
    animating = true;
    active = mod(active + dir, n);
    applyStyles();
    setTimeout(() => animating = false, 400);
  }

  // ── build cards ──
  const wrap = document.createElement('div');
  wrap.className = 'cf-wrap';
  wrap.style.cssText = 'transform-style:preserve-3d';

  items.forEach(p => {
    const liked  = wishlist.includes(p.id);
    const inCart = cart.find(x => x.id === p.id);
    const urgent = p.estoque <= 3;

    const card = document.createElement('div');
    card.className = 'cf-card';
    const imagemHTML = p.imagem
      ? `<img src="${p.imagem}" alt="${p.nome}"
            style="width:100%;height:100%;object-fit:cover;display:block;">`
      : `<span style="font-size:88px">${p.emoji}</span>`;

    card.innerHTML = `
      <div class="cf-img">
        ${imagemHTML}
        <button class="cf-heart${liked ? ' liked' : ''}" data-id="${p.id}">
          ${liked ? '❤️' : '🤍'}
        </button>
        <div class="cf-badges">
          <span class="bs${urgent ? '' : ' safe'}">
            ${urgent ? '🔥 Restam ' + p.estoque : p.estoque + ' unid.'}
          </span>
          <span class="bv">
            <svg class="vdot" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="#993556" stroke-width="1.4" fill="none"/>
              <circle cx="8" cy="8" r="2" stroke="#993556" stroke-width="1.4" fill="none"/>
            </svg>
            ${fmtV(p.views)}
          </span>
        </div>
      </div>
      <div class="cf-info">
        <div class="cf-name">${p.nome}</div>
        <div class="cf-prices">
          <span class="cf-old">${fmt(p.preco_antigo)}</span>
          <span class="cf-price">${fmt(p.preco_atual)}</span>
        </div>
        <button class="cf-btn${inCart ? ' added' : ''}" data-id="${p.id}">
          ${inCart ? '✓ Adicionado' : '+ Sacola'}
        </button>
      </div>`;

    // favoritar
    card.querySelector('.cf-heart').onclick = e => {
      e.stopPropagation();
      const id = +e.currentTarget.dataset.id;
      const ix = wishlist.indexOf(id);
      if (ix > -1) wishlist.splice(ix, 1); else wishlist.push(id);
      e.currentTarget.classList.toggle('liked');
      e.currentTarget.textContent = wishlist.includes(id) ? '❤️' : '🤍';
    };

    // adicionar ao carrinho
    card.querySelector('.cf-btn').onclick = e => {
      e.stopPropagation();
      const id = +e.currentTarget.dataset.id;
      const pr = PRODUCTS.find(x => x.id === id);
      const ex = cart.find(x => x.id === id);
      if (ex) ex.qty++; else cart.push({ ...pr, qty: 1 });
      updateBadge();
      e.currentTarget.className   = 'cf-btn added';
      e.currentTarget.textContent = '✓ Adicionado';
      const b = document.getElementById('cart-badge');
      b.style.transform = 'scale(1.5)';
      setTimeout(() => b.style.transform = '', 200);
    };

    wrap.appendChild(card);
  });

  // ── swipe / teclado ──
  let sx = 0;
  wrap.addEventListener('mousedown',  e => sx = e.clientX);
  wrap.addEventListener('mouseup',    e => { if (Math.abs(e.clientX - sx) > 36) go(e.clientX < sx ? 1 : -1); });
  wrap.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
  wrap.addEventListener('touchend',   e => {
    if (Math.abs(e.changedTouches[0].clientX - sx) > 36)
      go(e.changedTouches[0].clientX < sx ? 1 : -1);
  }, { passive: true });
  wrap.setAttribute('tabindex', '0');
  wrap.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft')  go(-1);
  });

  // ── dots ──
  const dotsEl = document.createElement('div');
  dotsEl.className = 'cf-dots';
  dotsEl.id = 'd-' + uid;
  items.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'cf-dot' + (i === 0 ? ' active' : '');
    d.onclick = () => { active = i; animating = false; applyStyles(); };
    dotsEl.appendChild(d);
  });

  applyStyles();
  return { wrap, dotsEl };
}

// ── SEÇÕES ────────────────────────────────
function renderSections() {
  const container = document.getElementById('home-sections');
  container.innerHTML = '';

  const sections = activeCat === 'all'
    ? CATS
    : [CATS.find(c => c.id === activeCat)].filter(Boolean);

  sections.forEach(cat => {
    const items = PRODUCTS.filter(p => p.cat === cat.id);
    const sec   = document.createElement('div');
    sec.className = 'section-block';

    const hdr = document.createElement('div');
    hdr.className = 'section-header';
    hdr.innerHTML = `
      <div>
        <div class="sec-title">${cat.label}</div>
        ${cat.id === 'Coleção Especial'
          ? '<div class="sec-sub">Copa do Mundo 2026 🇧🇷</div>'
          : ''}
      </div>
      <span class="sec-all">Ver todas</span>`;
    sec.appendChild(hdr);

    const { wrap, dotsEl } = makeCoverFlow(items, 'cf' + cat.id.replace(/\s/g, ''));
    sec.appendChild(wrap);
    sec.appendChild(dotsEl);
    container.appendChild(sec);
  });
}

// ── CARRINHO ──────────────────────────────
function renderCart() {
  const cc = document.getElementById('cart-content');
  if (!cart.length) {
    cc.innerHTML = `
      <div class="cart-empty">
        <span style="font-size:48px">🛍️</span>
        <span>Sua sacola está vazia</span>
        <button class="btn-p" style="max-width:200px;margin-top:14px"
          onclick="showScreen('home')">Ver produtos</button>
      </div>`;
    return;
  }
  const sub  = cart.reduce((a, c) => a + c.preco_atual * c.qty, 0);
  const desc = sub * 0.05;
  cc.innerHTML = `
    <div class="cart-list">
      ${cart.map(item => `
        <div class="cart-item">
          <div class="ci-img">${item.emoji}</div>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:500;color:#222">${item.nome}</div>
            <div style="font-size:14px;font-weight:500;color:#D4537E;margin-top:2px">
              ${fmt(item.preco_atual)}
            </div>
            <div class="qty-ctrl">
              <button class="qty-btn" onclick="chQty(${item.id},-1)">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="chQty(${item.id},1)">+</button>
            </div>
          </div>
          <button class="cart-remove" onclick="rmCart(${item.id})">🗑️</button>
        </div>`).join('')}
    </div>
    <div class="cart-footer">
      <div class="ctr"><span>Subtotal</span><span>${fmt(sub)}</span></div>
      <div class="ctr">
        <span style="color:#3B6D11">Desconto 5%</span>
        <span style="color:#3B6D11">− ${fmt(desc)}</span>
      </div>
      <div class="ctr main"><span>Total</span><span>${fmt(sub - desc)}</span></div>
      <button class="btn-p" onclick="checkout()">Finalizar Pedido</button>
    </div>`;
}

function chQty(id, d) {
  const i = cart.find(x => x.id === id);
  if (!i) return;
  i.qty += d;
  if (i.qty <= 0) cart = cart.filter(x => x.id !== id);
  updateBadge();
  renderCart();
}

function rmCart(id) {
  cart = cart.filter(x => x.id !== id);
  updateBadge();
  renderCart();
}

function checkout() {
  const code = 'DN' + Math.floor(1000 + Math.random() * 9000);
  const msg  = encodeURIComponent(
    `Olá! Gostaria de confirmar meu pedido *${code}*.\n\n` +
    cart.map(i => `• ${i.nome} (x${i.qty}) — ${fmt(i.preco_atual * i.qty)}`).join('\n')
  );
  document.getElementById('screen-cart').innerHTML = `
    <div class="confirm-screen">
      <span style="font-size:56px">🎉</span>
      <div style="font-size:20px;font-weight:500;color:#222">Pedido Registrado!</div>
      <div style="font-size:14px;color:#888;line-height:1.6">
        Toque no botão abaixo para confirmar via WhatsApp.
      </div>
      <div class="confirm-code">${code}</div>
      <div style="font-size:12px;color:#bbb">Guarde este código</div>
      <button class="btn-p" style="margin-top:16px"
        onclick="window.open('https://wa.me/${WHATSAPP_NUMBER}?text=${msg}','_blank')">
        💬 Confirmar no WhatsApp
      </button>
      <button class="btn-s" onclick="cart=[];updateBadge();showScreen('home')">
        Continuar Comprando
      </button>
    </div>`;
}

// ── LISTA DE DESEJOS ──────────────────────
function renderWishlist() {
  const wc    = document.getElementById('wishlist-content');
  const items = PRODUCTS.filter(p => wishlist.includes(p.id));
  if (!items.length) {
    wc.innerHTML = `
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;
        justify-content:center;gap:10px;padding:40px;color:#aaa;font-size:14px;min-height:200px">
        <span style="font-size:48px">🤍</span>
        <span>Nenhum favorito ainda</span>
        <span style="font-size:12px">Toque no coração dos produtos</span>
      </div>`;
    return;
  }
  wc.innerHTML = `
    <div style="padding:14px;display:flex;flex-direction:column;gap:10px">
      ${items.map(p => `
        <div style="background:#fff;border:0.5px solid #eee;border-radius:14px;
          padding:12px;display:flex;gap:12px;align-items:center">
          <div style="width:60px;height:76px;background:#f5f5f5;border-radius:10px;
            display:flex;align-items:center;justify-content:center;font-size:30px;flex-shrink:0">
            ${p.emoji}
          </div>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:500;color:#222">${p.nome}</div>
            <div style="font-size:16px;font-weight:500;color:#D4537E;margin-top:4px">
              ${fmt(p.preco_atual)}
            </div>
          </div>
          <button onclick="addFromWish(${p.id})"
            style="background:#D4537E;color:#fff;border:none;border-radius:10px;
              padding:9px 13px;font-size:12px;cursor:pointer;font-weight:500">
            + Sacola
          </button>
        </div>`).join('')}
    </div>`;
}

function addFromWish(id) {
  const p  = PRODUCTS.find(x => x.id === id);
  const ex = cart.find(x => x.id === id);
  if (ex) ex.qty++; else cart.push({ ...p, qty: 1 });
  updateBadge();
  renderWishlist();
}

// ── INIT ──────────────────────────────────
initBanners();
initCatTabs();
renderSections();
updateBadge();
