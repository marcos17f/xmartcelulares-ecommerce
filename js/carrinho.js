const COUPONS = { 'XMART10': 0.10, 'BEMVINDO5': 0.05 };

document.addEventListener('DOMContentLoaded', () => {
  const layout = document.getElementById('cart-layout');
  let appliedCoupon = null;
  let couponMsg = '';

  function render(){
    const cart = Store.getCart();

    if(!cart.length){
      layout.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          ${ICONS.empty}
          <p>Seu carrinho está vazio.</p>
          <a href="catalogo.html" class="btn btn-gold">Ver produtos</a>
        </div>`;
      return;
    }

    const itemsHtml = cart.map((item, i) => {
      const p = getProduct(item.id);
      if(!p) return '';
      const optsText = Object.entries(item.opts||{}).map(([k,v])=>`${k}: ${v}`).join(' · ');
      return `
      <div class="cart-item">
        <a href="produto.html?id=${p.id}" class="thumb" aria-label="${p.name}">${productThumb(p)}</a>
        <div>
          <a href="produto.html?id=${p.id}"><h4>${p.name}</h4></a>
          <div class="meta">${optsText}</div>
          <div class="qty-box" style="width:fit-content;">
            <button type="button" data-qty-minus="${i}" aria-label="Diminuir quantidade">${ICONS.minus}</button>
            <span aria-live="polite">${item.qty}</span>
            <button type="button" data-qty-plus="${i}" aria-label="Aumentar quantidade">${ICONS.plus}</button>
          </div>
          <button class="remove" data-remove="${i}">${ICONS.trash} Remover</button>
        </div>
        <div class="price">${formatBRL(p.price * item.qty)}</div>
      </div>`;
    }).join('');

    const subtotal = Store.cartTotal();
    const discount = appliedCoupon ? subtotal * appliedCoupon.pct : 0;
    const total = subtotal - discount;

    layout.innerHTML = `
      <div>${itemsHtml}</div>
      <div class="summary-box">
        <h3>Resumo do pedido</h3>
        <div class="summary-row"><span>Subtotal</span><span>${formatBRL(subtotal)}</span></div>
        ${appliedCoupon ? `<div class="summary-row"><span>Cupom ${appliedCoupon.code}</span><span>− ${formatBRL(discount)}</span></div>` : ''}
        <div class="summary-row"><span>Entrega</span><span>A combinar</span></div>
        <div class="coupon-row">
          <input type="text" id="coupon-input" aria-label="Cupom de desconto" autocomplete="off" placeholder="Cupom de desconto" value="${appliedCoupon ? appliedCoupon.code : ''}">
          <button class="btn btn-outline" id="coupon-btn">Aplicar</button>
        </div>
        <div id="coupon-msg" role="status" aria-live="polite" style="font-size:12.5px; color: ${appliedCoupon ? 'var(--gold)' : 'var(--red)'}; margin-bottom:10px;">${couponMsg}</div>
        <div class="summary-row total"><span>Total</span><b>${formatBRL(total)}</b></div>
        <a href="checkout.html" class="btn btn-gold btn-block" style="margin-top:18px;">Finalizar compra</a>
        <a href="catalogo.html" style="display:block; text-align:center; margin-top:14px; font-size:13.5px; color:var(--ink-faint);">Continuar comprando</a>
      </div>
    `;

    layout.querySelectorAll('[data-remove]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const idx = Number(btn.dataset.remove);
        const item = Store.getCart()[idx];
        const p = item && getProduct(item.id);
        if(p && !confirm(`Remover ${p.name} do carrinho?`)) return;
        Store.removeFromCart(idx);
        render();
      });
    });
    layout.querySelectorAll('[data-qty-plus]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const idx = Number(btn.dataset.qtyPlus);
        const item = Store.getCart()[idx];
        Store.updateQty(idx, item.qty + 1);
        render();
      });
    });
    layout.querySelectorAll('[data-qty-minus]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const idx = Number(btn.dataset.qtyMinus);
        const item = Store.getCart()[idx];
        if(item.qty <= 1) return;
        Store.updateQty(idx, item.qty - 1);
        render();
      });
    });
    const couponBtn = document.getElementById('coupon-btn');
    if(couponBtn){
      couponBtn.addEventListener('click', ()=>{
        const code = document.getElementById('coupon-input').value.trim().toUpperCase();
        if(COUPONS[code]){
          appliedCoupon = { code, pct: COUPONS[code] };
          couponMsg = `Cupom aplicado: ${(COUPONS[code]*100).toFixed(0)}% de desconto.`;
        } else {
          appliedCoupon = null;
          couponMsg = code ? 'Cupom inválido — confira o código e tente de novo.' : 'Digite um código de cupom.';
        }
        render();
      });
    }
  }

  render();
});
