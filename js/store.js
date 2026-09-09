// Camada de dados do front-end: carrinho e conta do cliente guardados em localStorage.
// Isso simula um back-end pra fins de demonstração/protótipo. Numa próxima etapa,
// isso deve ser trocado por chamadas a uma API real (com estoque, pedidos e pagamento de verdade).

const Store = {
  KEY_CART: 'xmart_cart',
  KEY_USER: 'xmart_user',

  getCart(){
    try{ return JSON.parse(localStorage.getItem(this.KEY_CART)) || []; }
    catch(e){ return []; }
  },
  saveCart(cart){ localStorage.setItem(this.KEY_CART, JSON.stringify(cart)); },

  addToCart(productId, opts, qty){
    const cart = this.getCart();
    const optKey = JSON.stringify(opts || {});
    const existing = cart.find(i => i.id === productId && JSON.stringify(i.opts) === optKey);
    if(existing){ existing.qty += qty; }
    else{ cart.push({ id: productId, opts: opts || {}, qty }); }
    this.saveCart(cart);
    this.updateCartBadge();
  },

  removeFromCart(index){
    const cart = this.getCart();
    cart.splice(index, 1);
    this.saveCart(cart);
    this.updateCartBadge();
  },

  updateQty(index, qty){
    const cart = this.getCart();
    if(!cart[index]) return;
    cart[index].qty = Math.max(1, qty);
    this.saveCart(cart);
    this.updateCartBadge();
  },

  clearCart(){ this.saveCart([]); this.updateCartBadge(); },

  cartCount(){ return this.getCart().reduce((n,i)=>n+i.qty, 0); },

  cartTotal(){
    return this.getCart().reduce((sum,i)=>{
      const p = getProduct(i.id);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  },

  updateCartBadge(){
    const count = this.cartCount();
    document.querySelectorAll('[data-cart-badge]').forEach(el=>{
      el.textContent = count;
      const link = el.closest('.icon-btn');
      if(link) link.setAttribute('aria-label', `Carrinho, ${count} ${count===1?'item':'itens'}`);
    });
  },

  // --- conta (mock) ---
  getUser(){
    try{ return JSON.parse(localStorage.getItem(this.KEY_USER)); }
    catch(e){ return null; }
  },
  setUser(user){ localStorage.setItem(this.KEY_USER, JSON.stringify(user)); },
  logout(){ localStorage.removeItem(this.KEY_USER); },
};

function toast(msg){
  let el = document.getElementById('toast');
  if(!el){
    el = document.createElement('div');
    el.id = 'toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  el.innerHTML = `${ICONS.check} <span>${msg}</span>`;
  el.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(()=> el.classList.remove('show'), 2600);
}
