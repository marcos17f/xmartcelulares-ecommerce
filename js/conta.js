document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('auth-root');
  let mode = 'login';

  function renderLoggedIn(user){
    root.innerHTML = `
      <div class="auth-card">
        <h1>Olá, ${user.nome.split(' ')[0]}</h1>
        <p class="sub">${user.email}</p>
        <div class="form-card" style="padding:18px; margin-bottom:16px;">
          <h3 style="margin-bottom:6px;">Meus pedidos</h3>
          <p style="color:var(--ink-faint); font-size:13.5px;">Você ainda não tem pedidos por aqui. Que tal dar uma olhada nas novidades?</p>
        </div>
        <a href="catalogo.html" class="btn btn-outline btn-block" style="margin-bottom:10px;">Continuar comprando</a>
        <button class="btn btn-gold btn-block" id="logout-btn">Sair da conta</button>
      </div>`;
    document.getElementById('logout-btn').addEventListener('click', ()=>{
      Store.logout();
      render();
    });
  }

  function renderForm(){
    root.innerHTML = `
      <div class="auth-card">
        <h1>Minha conta</h1>
        <p class="sub">Entre ou crie uma conta para acompanhar seus pedidos.</p>
        <div class="auth-tabs">
          <button type="button" data-tab="login" class="${mode==='login'?'active':''}">Entrar</button>
          <button type="button" data-tab="cadastro" class="${mode==='cadastro'?'active':''}">Criar conta</button>
        </div>
        <div class="form-msg" id="auth-msg" role="alert"></div>
        <form id="auth-form">
          ${mode==='cadastro' ? `<div class="field" style="margin-bottom:14px;"><label for="a-nome">Nome completo</label><input type="text" id="a-nome" autocomplete="name" required></div>` : ''}
          <div class="field" style="margin-bottom:14px;"><label for="a-email">E-mail</label><input type="email" id="a-email" autocomplete="email" spellcheck="false" required></div>
          <div class="field" style="margin-bottom:14px;"><label for="a-senha">Senha</label><input type="password" id="a-senha" autocomplete="${mode==='cadastro'?'new-password':'current-password'}" required minlength="4"></div>
          ${mode==='cadastro' ? `<div class="field" style="margin-bottom:14px;"><label for="a-whats">WhatsApp</label><input type="tel" id="a-whats" autocomplete="tel" inputmode="tel" placeholder="(00) 00000-0000"></div>` : ''}
          <button type="submit" class="btn btn-gold btn-block">${mode==='login' ? 'Entrar' : 'Criar conta'}</button>
        </form>
        <div class="auth-links">
          ${mode==='login' ? `Ainda não tem conta? <a href="#" id="to-cadastro">Cadastre-se</a>` : `Já tem conta? <a href="#" id="to-login">Entrar</a>`}
        </div>
      </div>`;

    root.querySelectorAll('[data-tab]').forEach(btn=>{
      btn.addEventListener('click', ()=>{ mode = btn.dataset.tab; render(); });
    });
    const toCadastro = document.getElementById('to-cadastro');
    if(toCadastro) toCadastro.addEventListener('click', (e)=>{ e.preventDefault(); mode='cadastro'; render(); });
    const toLogin = document.getElementById('to-login');
    if(toLogin) toLogin.addEventListener('click', (e)=>{ e.preventDefault(); mode='login'; render(); });

    document.getElementById('auth-form').addEventListener('submit', (e)=>{
      e.preventDefault();
      const msg = document.getElementById('auth-msg');
      const email = document.getElementById('a-email').value.trim();
      const senha = document.getElementById('a-senha').value;

      if(mode === 'cadastro'){
        const nome = document.getElementById('a-nome').value.trim();
        const whats = document.getElementById('a-whats').value.trim();
        if(!nome || !email || senha.length < 4){
          msg.textContent = 'Preencha nome, e-mail e uma senha com pelo menos 4 caracteres.';
          msg.className = 'form-msg show error';
          const invalidId = !nome ? 'a-nome' : (!email ? 'a-email' : 'a-senha');
          document.getElementById(invalidId).focus();
          return;
        }
        Store.setUser({ nome, email, whats });
        toast('Conta criada com sucesso');
        renderLoggedIn(Store.getUser());
        return;
      }

      // login mock: qualquer e-mail/senha cadastrados via este mesmo formulário funcionam
      const existing = Store.getUser();
      if(existing && existing.email === email){
        toast(`Bem-vindo de volta, ${existing.nome.split(' ')[0]}`);
        renderLoggedIn(existing);
      } else {
        msg.textContent = 'Não encontramos essa conta. Crie um cadastro para continuar.';
        msg.className = 'form-msg show error';
        document.getElementById('a-email').focus();
      }
    });
  }

  function render(){
    const user = Store.getUser();
    if(user) renderLoggedIn(user);
    else renderForm();
  }

  render();
});
