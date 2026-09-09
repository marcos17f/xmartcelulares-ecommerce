document.addEventListener('DOMContentLoaded', () => {
  const layout = document.getElementById('checkout-layout');
  const cart = Store.getCart();

  if(!cart.length){
    layout.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        ${ICONS.empty}
        <p>Seu carrinho está vazio — adicione produtos antes de finalizar a compra.</p>
        <a href="catalogo.html" class="btn btn-gold">Ver produtos</a>
      </div>`;
    return;
  }

  let payMethod = 'pix';
  let deliveryMethod = 'entrega';
  const user = Store.getUser();

  function summaryHtml(){
    const subtotal = Store.cartTotal();
    const itemsHtml = cart.map(item=>{
      const p = getProduct(item.id);
      return `<div class="summary-row"><span>${item.qty}x ${p.name}</span><span>${formatBRL(p.price*item.qty)}</span></div>`;
    }).join('');
    const entregaLabel = deliveryMethod === 'retirada' ? 'Retirada em mãos' : 'A combinar';
    return `
      <div class="summary-box">
        <h3>Resumo do pedido</h3>
        ${itemsHtml}
        <div class="summary-row"><span>Entrega</span><span>${entregaLabel}</span></div>
        <div class="summary-row total"><span>Total</span><b>${formatBRL(subtotal)}</b></div>
        <button class="btn btn-gold btn-block" id="confirm-order-btn" style="margin-top:18px;">Confirmar pedido</button>
        <p style="font-size:12px; color:var(--ink-faint); margin-top:12px;">O valor final do frete é combinado após a confirmação do pedido.</p>
      </div>`;
  }

  function render(){
    layout.innerHTML = `
      <div>
        <div class="form-card">
          <h3><i>1</i> Seus dados</h3>
          <div class="form-row two">
            <div class="field"><label for="f-nome">Nome completo</label><input type="text" id="f-nome" name="name" autocomplete="name" value="${user?.nome||''}" placeholder="Seu nome"><span class="field-error" id="err-f-nome"></span></div>
            <div class="field"><label for="f-whats">WhatsApp</label><input type="tel" id="f-whats" name="tel" autocomplete="tel" inputmode="tel" value="${user?.whats||''}" placeholder="(00) 00000-0000"><span class="field-error" id="err-f-whats"></span></div>
          </div>
        </div>

        <div class="form-card">
          <h3><i>2</i> Entrega</h3>
          <div class="pay-methods" style="margin-bottom:18px;">
            <label class="pay-opt ${deliveryMethod==='entrega'?'active':''}">
              <input type="radio" name="delivery" value="entrega" ${deliveryMethod==='entrega'?'checked':''}>
              <span class="pay-opt-text">Receber em casa<small>Enviamos para todo o Brasil</small></span>
            </label>
            <label class="pay-opt ${deliveryMethod==='retirada'?'active':''}">
              <input type="radio" name="delivery" value="retirada" ${deliveryMethod==='retirada'?'checked':''}>
              <span class="pay-opt-text">Retirar em mãos<small>Combinamos o horário pelo WhatsApp</small></span>
            </label>
          </div>
          <div id="address-fields" ${deliveryMethod==='retirada' ? 'style="display:none"' : ''}>
            <p style="font-size:13.5px; color:var(--ink-faint); margin-bottom:14px;">Preencha o endereço de entrega.</p>
            <div class="form-row three">
              <div class="field"><label for="f-cep">CEP</label><input type="text" id="f-cep" name="postal-code" autocomplete="postal-code" inputmode="numeric" placeholder="00000-000"></div>
              <div class="field" style="grid-column: span 2;"><label for="f-end">Endereço</label><input type="text" id="f-end" name="address-line1" autocomplete="address-line1" placeholder="Rua, número"><span class="field-error" id="err-f-end"></span></div>
            </div>
            <div class="form-row two">
              <div class="field"><label for="f-bairro">Bairro</label><input type="text" id="f-bairro" name="address-line2" autocomplete="address-line2" placeholder="Bairro"></div>
              <div class="field"><label for="f-cidade">Cidade</label><input type="text" id="f-cidade" name="address-level2" autocomplete="address-level2" placeholder="Cidade"></div>
            </div>
            <div class="field"><label for="f-comp">Complemento / referência</label><input type="text" id="f-comp" name="address-line3" autocomplete="address-line3" placeholder="Opcional"></div>
          </div>
          <p id="pickup-note" style="font-size:13.5px; color:var(--ink-dim); ${deliveryMethod==='retirada' ? '' : 'display:none'}">Combinamos o dia e o horário da retirada pelo WhatsApp assim que o pedido for confirmado.</p>
        </div>

        <div class="form-card">
          <h3><i>3</i> Pagamento</h3>
          <div class="pay-methods">
            <label class="pay-opt ${payMethod==='pix'?'active':''}">
              <input type="radio" name="pay" value="pix" ${payMethod==='pix'?'checked':''}>
              <span class="pay-opt-text">Pix<small>Confirmação imediata, com desconto</small></span>
            </label>
            <label class="pay-opt ${payMethod==='cartao'?'active':''}">
              <input type="radio" name="pay" value="cartao" ${payMethod==='cartao'?'checked':''}>
              <span class="pay-opt-text">Cartão de crédito<small>Em até 12x sem juros</small></span>
            </label>
          </div>
        </div>
      </div>
      ${summaryHtml()}
    `;

    layout.querySelectorAll('input[name="pay"]').forEach(r=>{
      r.addEventListener('change', ()=>{ payMethod = r.value; render(); });
    });
    layout.querySelectorAll('input[name="delivery"]').forEach(r=>{
      r.addEventListener('change', ()=>{ deliveryMethod = r.value; render(); });
    });

    function clearFieldErrors(){
      ['f-nome','f-whats','f-end'].forEach(id=>{
        document.getElementById(id).classList.remove('invalid');
        const err = document.getElementById('err-'+id);
        if(err) err.textContent = '';
      });
    }
    function showFieldError(id, msg){
      document.getElementById(id).classList.add('invalid');
      const err = document.getElementById('err-'+id);
      if(err) err.textContent = msg;
    }

    document.getElementById('confirm-order-btn').addEventListener('click', ()=>{
      clearFieldErrors();
      const nome = document.getElementById('f-nome').value.trim();
      const whats = document.getElementById('f-whats').value.trim();
      const end = deliveryMethod === 'retirada' ? '' : document.getElementById('f-end').value.trim();

      let firstInvalid = null;
      if(!nome){ showFieldError('f-nome', 'Preencha seu nome completo.'); firstInvalid = firstInvalid || 'f-nome'; }
      if(!whats){ showFieldError('f-whats', 'Preencha um WhatsApp para contato.'); firstInvalid = firstInvalid || 'f-whats'; }
      if(deliveryMethod !== 'retirada' && !end){ showFieldError('f-end', 'Preencha o endereço de entrega.'); firstInvalid = firstInvalid || 'f-end'; }
      if(firstInvalid){
        document.getElementById(firstInvalid).focus();
        return;
      }

      const orderNumber = 'XM' + Math.floor(10000 + Math.random()*89999);

      const payLabel = { pix: 'Pix', cartao: 'Cartão de crédito' }[payMethod];
      const itemsMsg = cart.map(item => {
        const p = getProduct(item.id);
        const opts = Object.entries(item.opts||{}).map(([k,v])=>`${k}: ${v}`).join(', ');
        return `• ${item.qty}x ${p.name}${opts ? ` (${opts})` : ''} — ${formatBRL(p.price*item.qty)}`;
      }).join('\n');
      let entregaMsg;
      if(deliveryMethod === 'retirada'){
        entregaMsg = 'Retirada em mãos na loja';
      } else {
        const partes = ['f-end','f-bairro','f-cidade','f-comp','f-cep']
          .map(id => document.getElementById(id)?.value.trim())
          .filter(Boolean);
        entregaMsg = `Entrega no endereço\n*Endereço:* ${partes.join(', ')}`;
      }
      const msg = `Olá! Acabei de fazer o pedido ${orderNumber} no site da X-mart.\n\n`
        + `*Itens:*\n${itemsMsg}\n\n`
        + `*Total:* ${formatBRL(Store.cartTotal())}\n`
        + `*Entrega:* ${entregaMsg}\n`
        + `*Pagamento:* ${payLabel}\n`
        + `*Nome:* ${nome}`;
      Store.clearCart();
      layout.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          <div style="width:60px;height:60px;background:var(--gold);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 22px;">${ICONS.check}</div>
          <h2 style="font-size:24px; margin-bottom:10px;">Pedido #${orderNumber} recebido!</h2>
          <p style="margin-bottom:30px;">Obrigado, ${nome.split(' ')[0]}! Fale com a gente para confirmar ${deliveryMethod==='retirada' ? 'o horário de retirada' : 'os detalhes e o valor do frete'}.</p>
          <div class="contact-title">Fale com a gente</div>
          <p class="contact-sub">Estamos por aqui para te ajudar</p>
          <div class="contact-grid">${renderContactCards(msg)}</div>
          <a href="index.html" class="btn btn-outline" style="margin-top:28px; display:inline-block;">Voltar à loja</a>
        </div>`;
    });
  }

  render();
});
