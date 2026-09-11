// TODO: coloque aqui o número de WhatsApp da loja (código do país + DDD + número, só dígitos)
// Exemplo: '5511987654321'
export const WHATSAPP_NUMBER = '';

export function buildWhatsAppLink(message) {
  const text = encodeURIComponent(message);
  return WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
    : `https://api.whatsapp.com/send?text=${text}`;
}

export function buildReservationMessage({ productName, variantLabel, quantity = 1, image, origin = '' }) {
  const photoUrl = image ? `${origin}${image}` : '';
  const variantLine = variantLabel ? `\nVariante: ${variantLabel}` : '';
  const photoLine = photoUrl ? `\nFoto: ${photoUrl}` : '';

  return [
    'Olá! Quero fazer uma reserva de pré-venda na X-mart:',
    '',
    `Produto: ${productName}${variantLine}`,
    `Quantidade: ${quantity}${photoLine}`,
    '',
    'Podem me avisar assim que estiver disponível para retirada/entrega? Obrigado!',
  ].join('\n');
}

export function buildOrderMessage({ items, total, origin = '' }) {
  const lines = items.map((item, index) => {
    const photoUrl = item.image ? `${origin}${item.image}` : '';
    const priceLine = `   Qtd: ${item.quantity} · ${item.priceLabel}`;
    const photoLine = photoUrl ? `\n   Foto: ${photoUrl}` : '';
    return `${index + 1}. ${item.name}\n${priceLine}${photoLine}`;
  });

  return [
    'Olá! Gostaria de finalizar meu pedido na X-mart:',
    '',
    ...lines,
    '',
    `Total: ${total}`,
    '',
    'Aguardo a confirmação para combinar o pagamento. Obrigado!',
  ].join('\n');
}
