function productCard(p){
  const tagHtml = p.tag ? `<span class="prod-tag">${p.tag}</span>` : (p.stock===0 ? `<span class="prod-tag out">Esgotado</span>` : '');
  return `
  <div class="prod-card">
    <a href="produto.html?id=${p.id}" class="prod-thumb" aria-label="${p.name}">
      ${tagHtml}
      ${productThumb(p)}
    </a>
    <div class="prod-body">
      <span class="prod-cat">${getCategory(p.category).name}</span>
      <a href="produto.html?id=${p.id}"><h3 class="prod-name">${p.name}</h3></a>
      <div class="prod-price-row">
        <span class="prod-price">${formatBRL(p.price)}</span>
        ${p.oldPrice ? `<span class="prod-old">${formatBRL(p.oldPrice)}</span>` : ''}
      </div>
    </div>
    <button class="prod-cta" data-quick-add="${p.id}">Adicionar ao carrinho</button>
  </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const catGrid = document.getElementById('cat-grid');
  if(catGrid){
    catGrid.innerHTML = CATEGORIES.map(c => `
      <a href="catalogo.html?cat=${c.slug}" class="cat-card">
        ${ICONS[c.icon]}
        <span>${c.name}</span>
      </a>`).join('');
  }

  const featuredGrid = document.getElementById('featured-grid');
  if(featuredGrid){
    const featured = PRODUCTS.filter(p => p.tag).slice(0,4);
    featuredGrid.innerHTML = featured.map(productCard).join('');
  }

  const dealsGrid = document.getElementById('deals-grid');
  if(dealsGrid){
    const deals = PRODUCTS.filter(p => p.oldPrice).slice(0,4);
    dealsGrid.innerHTML = deals.map(productCard).join('');
  }

  document.body.addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-quick-add]');
    if(!btn) return;
    const p = getProduct(btn.dataset.quickAdd);
    const defaultOpts = {};
    Object.entries(p.options||{}).forEach(([k,vals])=> defaultOpts[k]=vals[0]);
    Store.addToCart(p.id, defaultOpts, 1);
    toast(`${p.name} adicionado ao carrinho`);
  });

  // Modal "Reservar pelo Instagram" — mostra a mensagem pronta pro cliente copiar,
  // já que o Instagram (diferente do WhatsApp) não permite abrir o chat com texto preenchido.
  const igModal = document.getElementById('ig-modal');
  const reserveBtn = document.getElementById('reserve-ig-btn');
  if(igModal && reserveBtn){
    const modalClose = document.getElementById('ig-modal-close');
    modalClose.innerHTML = ICONS.close;
    const copyBtn = document.getElementById('ig-copy-btn');
    const messageEl = document.getElementById('ig-modal-message');
    let lastFocused = null;

    function openModal(){
      lastFocused = document.activeElement;
      igModal.hidden = false;
      requestAnimationFrame(()=> igModal.classList.add('show'));
      modalClose.focus();
      document.addEventListener('keydown', onKeydown);
    }
    function closeModal(){
      igModal.classList.remove('show');
      document.removeEventListener('keydown', onKeydown);
      setTimeout(()=>{ igModal.hidden = true; if(lastFocused) lastFocused.focus(); }, 200);
    }
    function onKeydown(e){
      if(e.key === 'Escape') closeModal();
    }

    reserveBtn.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    igModal.addEventListener('click', (e)=>{ if(e.target === igModal) closeModal(); });

    copyBtn.addEventListener('click', async ()=>{
      try{
        await navigator.clipboard.writeText(messageEl.textContent.trim());
        copyBtn.textContent = 'Copiado!';
        toast('Mensagem copiada — cole no chat do Instagram');
        setTimeout(()=>{ copyBtn.textContent = 'Copiar mensagem'; }, 2200);
      }catch(err){
        toast('Não deu pra copiar automaticamente — selecione o texto manualmente');
      }
    });
  }
});
