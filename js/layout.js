// Header e footer são montados via JS pra evitar repetir o mesmo HTML em cada página
// (o projeto não usa build/framework — só HTML/CSS/JS puro, como os outros sites da loja).

function renderHeader(active){
  const links = [
    { href: 'index.html', label: 'Início', key: 'inicio' },
    { href: 'catalogo.html', label: 'Todos os produtos', key: 'catalogo' },
    { href: 'catalogo.html?cat=celulares', label: 'Celulares', key: 'celulares' },
    { href: 'catalogo.html?cat=acessorios', label: 'Acessórios', key: 'acessorios' },
  ];
  const catStrip = CATEGORIES.map(c => `<a href="catalogo.html?cat=${c.slug}">${c.name}</a>`).join('');

  return `
  <div class="topbar">Especialista em produtos Apple • Enviamos para todo o Brasil</div>
  <header class="site">
    <div class="nav wrap">
      <a href="index.html" class="logo">
        <span>X<span class="sub">-mart</span></span>
      </a>
      <div class="search-box">
        ${ICONS.search}
        <label for="global-search" class="sr-only">Buscar produtos</label>
        <input type="search" id="global-search" autocomplete="off" placeholder="Buscar produtos…" />
      </div>
      <nav class="nav-links">
        ${links.map(l => `<a href="${l.href}" class="${active===l.key?'active':''}">${l.label}</a>`).join('')}
      </nav>
      <div class="nav-actions">
        <a href="conta.html" class="icon-btn" aria-label="Minha conta" title="Minha conta">${ICONS.user}</a>
        <a href="carrinho.html" class="icon-btn" aria-label="Carrinho" title="Carrinho">${ICONS.cart}<span class="badge" data-cart-badge aria-hidden="true">0</span></a>
        <button class="menu-toggle" id="menu-toggle" aria-label="Abrir menu" aria-expanded="false">${ICONS.menu}</button>
      </div>
    </div>
    <div class="mobile-menu" id="mobile-menu">
      <div class="search-box">
        ${ICONS.search}
        <label for="mobile-search" class="sr-only">Buscar produtos</label>
        <input type="search" id="mobile-search" autocomplete="off" placeholder="Buscar produtos…" />
      </div>
      <nav class="mobile-nav-links">
        ${links.map(l => `<a href="${l.href}" class="${active===l.key?'active':''}">${l.label}</a>`).join('')}
      </nav>
    </div>
    <div class="cat-strip">${catStrip}</div>
  </header>`;
}

function renderFooter(){
  return `
  <footer class="site">
    <div class="wrap">
      <div class="footer-trust">
        <div class="footer-trust-item">${ICONS.check} Garantia X-mart em todo pedido</div>
        <div class="footer-trust-item">${ICONS.pix}${ICONS.card} Pix e cartão em até 12x</div>
        <div class="footer-trust-item">${ICONS.empty} Nota fiscal sempre incluída</div>
      </div>
      <div class="footer-grid">
        <div>
          <div class="footer-logo"><span>X<span style="color:var(--gold)">-mart</span></span></div>
          <p>Especialista em produtos Apple: iPhones e Macs importados dos EUA, acessórios, som e smartwatch — tudo num só lugar.</p>
          <p>✈️ Enviamos para todo o Brasil 🇧🇷</p>
        </div>
        <div>
          <h4>Categorias</h4>
          ${CATEGORIES.map(c=>`<a href="catalogo.html?cat=${c.slug}">${c.name}</a>`).join('')}
        </div>
        <div>
          <h4>Ajuda</h4>
          <a href="carrinho.html">Meu carrinho</a>
          <a href="conta.html">Minha conta</a>
          <a href="trocas-garantia.html">Trocas e garantia</a>
          <a href="formas-pagamento.html">Formas de pagamento</a>
        </div>
        <div>
          <h4>Fale com a gente</h4>
          <a href="https://www.instagram.com/xmartcelulares_/" target="_blank" rel="noopener">${ICONS.instagram.replace('viewBox="0 0 24 24"','viewBox="0 0 24 24" width="14" height="14" style="display:inline;vertical-align:-2px;margin-right:6px;"')} @xmartcelulares_</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} X-mart. Todos os direitos reservados.</span>
        <!-- TODO: substituir pelo CNPJ real da loja antes de publicar -->
        <span>CNPJ 00.000.000/0001-00</span>
      </div>
    </div>
  </footer>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const headerMount = document.getElementById('header-mount');
  const footerMount = document.getElementById('footer-mount');
  if(headerMount) headerMount.innerHTML = renderHeader(headerMount.dataset.active || '');
  if(footerMount) footerMount.innerHTML = renderFooter();
  Store.updateCartBadge();

  if('IntersectionObserver' in window){
    const revealIO = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){ entry.target.classList.add('in'); revealIO.unobserve(entry.target); }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el=>revealIO.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
  }

  const search = document.getElementById('global-search');
  if(search){
    search.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' && search.value.trim()){
        window.location.href = 'catalogo.html?busca=' + encodeURIComponent(search.value.trim());
      }
    });
  }

  const mobileSearch = document.getElementById('mobile-search');
  if(mobileSearch){
    mobileSearch.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' && mobileSearch.value.trim()){
        window.location.href = 'catalogo.html?busca=' + encodeURIComponent(mobileSearch.value.trim());
      }
    });
  }

  const menuToggle = document.getElementById('menu-toggle');
  const headerEl = document.querySelector('header.site');
  if(menuToggle && headerEl){
    menuToggle.addEventListener('click', ()=>{
      const open = headerEl.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', open);
      menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      menuToggle.innerHTML = open ? ICONS.close : ICONS.menu;
    });
  }
});
