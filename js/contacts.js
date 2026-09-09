// Contatos exibidos quando o cliente quer falar com alguém da loja
// (ex: na confirmação do pedido). Edite os números/links conforme forem definidos.

// TODO: preencher com os vendedores da X-mart quando tiverem WhatsApp definido
const SELLERS = [];

// TODO: preencher quando a loja passar o número de WhatsApp da garantia
const GARANTIA = { name: 'Garantia', role: 'Fale com a gente', phone: null, avatar: null };
const INSTAGRAM_URL = 'https://www.instagram.com/xmartcelulares_/';
const STORE_EMAIL = null; // TODO: e-mail de contato da loja

function initials(name) {
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}

function avatarHtml(name, avatar) {
  return avatar
    ? `<img src="${avatar}" alt="${name}" loading="lazy">`
    : initials(name);
}

function whatsappLink(phone, message) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Monta o HTML de todos os cards de contato (vendedoras, garantia, Instagram, localização, e-mail). */
function renderContactCards(message) {
  const sellerCards = SELLERS.map((s) => `
    <a class="contact-card" href="${whatsappLink(s.phone, message)}" target="_blank" rel="noopener">
      <span class="contact-avatar">${avatarHtml(s.name, s.avatar)}</span>
      <span class="contact-info"><strong>${s.name}</strong><span>${s.role}</span></span>
      <span class="contact-icon whatsapp">${ICONS.whatsapp}</span>
    </a>`).join('');

  const garantiaCard = GARANTIA.phone
    ? `<a class="contact-card" href="${whatsappLink(GARANTIA.phone, message)}" target="_blank" rel="noopener">
         <span class="contact-avatar">${avatarHtml(GARANTIA.name, GARANTIA.avatar)}</span>
         <span class="contact-info"><strong>${GARANTIA.name}</strong><span>${GARANTIA.role}</span></span>
         <span class="contact-icon whatsapp">${ICONS.whatsapp}</span>
       </a>`
    : `<button type="button" class="contact-card disabled" onclick="toast('Contato de garantia em breve')">
         <span class="contact-avatar">${avatarHtml(GARANTIA.name, GARANTIA.avatar)}</span>
         <span class="contact-info"><strong>Garantia</strong><span>Fale com a gente · em breve</span></span>
         <span class="contact-icon whatsapp">${ICONS.whatsapp}</span>
       </button>`;

  const instagramCard = INSTAGRAM_URL
    ? `<a class="contact-card" href="${INSTAGRAM_URL}" target="_blank" rel="noopener">
         <span class="contact-avatar">IG</span>
         <span class="contact-info"><strong>Instagram</strong><span>&#64;xmartcelulares_</span></span>
         <span class="contact-icon instagram">${ICONS.instagram}</span>
       </a>`
    : `<button type="button" class="contact-card disabled" onclick="toast('Link do Instagram em breve')">
         <span class="contact-avatar">IG</span>
         <span class="contact-info"><strong>Instagram</strong><span>&#64;xmartcelulares_ · em breve</span></span>
         <span class="contact-icon instagram">${ICONS.instagram}</span>
       </button>`;

  const emailCard = STORE_EMAIL
    ? `<a class="contact-card" href="mailto:${STORE_EMAIL}">
         <span class="contact-avatar" style="display:flex;">${ICONS.mail}</span>
         <span class="contact-info"><strong>E-mail</strong><span>${STORE_EMAIL}</span></span>
         <span class="contact-icon email">${ICONS.mail}</span>
       </a>`
    : `<button type="button" class="contact-card disabled" onclick="toast('E-mail de contato em breve')">
         <span class="contact-avatar" style="display:flex;">${ICONS.mail}</span>
         <span class="contact-info"><strong>E-mail</strong><span>Fale por e-mail · em breve</span></span>
         <span class="contact-icon email">${ICONS.mail}</span>
       </button>`;

  return sellerCards + garantiaCard + instagramCard + emailCard;
}
