document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  let activeCat = params.get('cat') || 'all';
  const busca = (params.get('busca') || '').toLowerCase();
  const onlyPromo = params.get('promo') === '1';
  const initialPrice = params.get('preco');
  const initialStock = params.get('estoque') === '1';
  const initialSort = params.get('ordenar');

  const catList = document.getElementById('filter-categories');
  function renderCatFilters(){
    catList.innerHTML = `
      <div class="filter-opt"><label><input type="radio" name="cat" value="all" ${activeCat==='all'?'checked':''}> Todas as categorias</label></div>
      ${CATEGORIES.map(c => `
        <div class="filter-opt"><label><input type="radio" name="cat" value="${c.slug}" ${activeCat===c.slug?'checked':''}> ${c.name}</label></div>
      `).join('')}
    `;
    catList.querySelectorAll('input[name="cat"]').forEach(inp=>{
      inp.addEventListener('change', ()=>{ activeCat = inp.value; render(); });
    });
  }

  if(onlyPromo) document.getElementById('filter-promo').checked = true;
  if(initialStock) document.getElementById('filter-stock').checked = true;
  if(initialPrice){
    const radio = document.querySelector(`input[name="price"][value="${initialPrice}"]`);
    if(radio) radio.checked = true;
  }
  if(initialSort) document.getElementById('sort-select').value = initialSort;

  function syncUrl({ priceVal, stockOnly, promoOnly, sort }){
    const qs = new URLSearchParams();
    if(activeCat !== 'all') qs.set('cat', activeCat);
    if(busca) qs.set('busca', busca);
    if(promoOnly) qs.set('promo', '1');
    if(priceVal !== 'all') qs.set('preco', priceVal);
    if(stockOnly) qs.set('estoque', '1');
    if(sort !== 'relevance') qs.set('ordenar', sort);
    const query = qs.toString();
    const url = window.location.pathname + (query ? `?${query}` : '');
    history.replaceState(null, '', url);
  }

  function currentFilters(){
    const priceVal = document.querySelector('input[name="price"]:checked').value;
    const stockOnly = document.getElementById('filter-stock').checked;
    const promoOnly = document.getElementById('filter-promo').checked;
    const sort = document.getElementById('sort-select').value;
    return { priceVal, stockOnly, promoOnly, sort };
  }

  function render(){
    const { priceVal, stockOnly, promoOnly, sort } = currentFilters();
    let list = PRODUCTS.slice();

    if(activeCat !== 'all') list = list.filter(p => p.category === activeCat);
    if(busca) list = list.filter(p => p.name.toLowerCase().includes(busca) || p.short.toLowerCase().includes(busca));
    if(priceVal !== 'all'){
      const [min,max] = priceVal.split('-').map(Number);
      list = list.filter(p => p.price >= min && p.price <= max);
    }
    if(stockOnly) list = list.filter(p => p.stock > 0);
    if(promoOnly) list = list.filter(p => p.oldPrice);

    if(sort === 'price-asc') list.sort((a,b)=>a.price-b.price);
    else if(sort === 'price-desc') list.sort((a,b)=>b.price-a.price);
    else if(sort === 'name') list.sort((a,b)=>a.name.localeCompare(b.name));

    const grid = document.getElementById('catalog-grid');
    document.getElementById('result-count').textContent = `${list.length} produto${list.length===1?'':'s'}`;

    const crumb = document.getElementById('crumb-current');
    crumb.textContent = busca ? `Busca: “${busca}”` : (activeCat==='all' ? 'Catálogo' : getCategory(activeCat).name);

    syncUrl({ priceVal, stockOnly, promoOnly, sort });

    grid.innerHTML = list.length ? list.map(productCard).join('') : `
      <div class="empty-state" style="grid-column:1/-1;">
        ${ICONS.search}
        <p>Nenhum produto encontrado com esses filtros.</p>
      </div>`;
  }

  renderCatFilters();
  document.querySelectorAll('input[name="price"], #filter-stock, #filter-promo').forEach(el=>{
    el.addEventListener('change', render);
  });
  document.getElementById('sort-select').addEventListener('change', render);

  render();
});
