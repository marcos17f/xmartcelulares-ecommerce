document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const p = getProduct(params.get('id'));
  const root = document.getElementById('pd-root');

  if(!p){
    root.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">${ICONS.search}<p>Produto não encontrado.</p><a href="catalogo.html" class="btn btn-gold">Ver catálogo</a></div>`;
    return;
  }

  document.title = `${p.name} — X-mart`;
  document.getElementById('crumb-name').textContent = p.name;
  const catLink = document.getElementById('crumb-cat');
  catLink.textContent = getCategory(p.category).name;
  catLink.href = `catalogo.html?cat=${p.category}`;

  const selected = {};
  Object.entries(p.options || {}).forEach(([k, vals]) => selected[k] = vals[0]);
  let qty = 1;

  function optionGroups(){
    return Object.entries(p.options || {}).map(([key, vals]) => `
      <div class="pd-opt-group">
        <h5>${key}</h5>
        <div class="pd-opt-list">
          ${vals.map(v => `<button type="button" class="pd-opt ${selected[key]===v?'active':''}" data-opt-key="${key}" data-opt-val="${v}">${v}</button>`).join('')}
        </div>
      </div>`).join('');
  }

  function specsRows(){
    return Object.entries(p.specs || {}).map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('');
  }

  root.innerHTML = `
    <div>
      <div class="pd-gallery-main">${productThumb(p, true)}</div>
      <div class="pd-thumbs">
        <div class="active">${productThumb(p)}</div>
        <div>${productThumb(p)}</div>
        <div>${productThumb(p)}</div>
      </div>
    </div>
    <div>
      <span class="pd-cat">${getCategory(p.category).name}${p.tag ? ' · ' + p.tag : ''}</span>
      <h1 class="pd-title">${p.name}</h1>
      <div class="pd-stock ${p.stock===0?'out':''}">${p.stock>0 ? `● Em estoque (${p.stock} unidades)` : '● Fora de estoque'}</div>
      <div class="pd-price-row">
        <span class="pd-price">${formatBRL(p.price)}</span>
        ${p.oldPrice ? `<span class="prod-old">${formatBRL(p.oldPrice)}</span>` : ''}
      </div>
      <p class="pd-installment">ou 12x de ${formatBRL(p.price/12)} sem juros no cartão · via PIX com desconto</p>
      <p class="pd-desc">${p.desc}</p>
      <div id="opt-groups">${optionGroups()}</div>
      <div class="qty-row">
        <div class="qty-box">
          <button type="button" id="qty-minus" aria-label="Diminuir quantidade">${ICONS.minus}</button>
          <span id="qty-val" aria-live="polite">1</span>
          <button type="button" id="qty-plus" aria-label="Aumentar quantidade">${ICONS.plus}</button>
        </div>
        <span style="color:var(--ink-faint); font-size:13px;">${p.stock} disponíveis</span>
      </div>
      <div class="pd-buy-row">
        <button class="btn btn-gold btn-block" id="add-cart-btn" ${p.stock===0?'disabled':''}>Adicionar ao carrinho</button>
        <button class="btn btn-outline" id="buy-now-btn" ${p.stock===0?'disabled':''}>Comprar agora</button>
      </div>
      <div class="pd-specs">
        <table>${specsRows()}</table>
      </div>
    </div>
  `;

  root.querySelectorAll('.pd-opt').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const key = btn.dataset.optKey;
      selected[key] = btn.dataset.optVal;
      root.querySelectorAll(`.pd-opt[data-opt-key="${key}"]`).forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.getElementById('qty-minus').addEventListener('click', ()=>{
    qty = Math.max(1, qty-1);
    document.getElementById('qty-val').textContent = qty;
  });
  document.getElementById('qty-plus').addEventListener('click', ()=>{
    qty = Math.min(p.stock || 1, qty+1);
    document.getElementById('qty-val').textContent = qty;
  });

  document.getElementById('add-cart-btn').addEventListener('click', ()=>{
    Store.addToCart(p.id, {...selected}, qty);
    toast(`${p.name} adicionado ao carrinho`);
  });
  document.getElementById('buy-now-btn').addEventListener('click', ()=>{
    Store.addToCart(p.id, {...selected}, qty);
    window.location.href = 'carrinho.html';
  });

  // relacionados
  const related = PRODUCTS.filter(r => r.category === p.category && r.id !== p.id).slice(0,4);
  if(related.length){
    document.getElementById('related-section').style.display = '';
    document.getElementById('related-grid').innerHTML = related.map(productCard).join('');
  }
});
