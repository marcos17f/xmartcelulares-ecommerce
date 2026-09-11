// TODO: coloque aqui o número de WhatsApp do vendedor (código do país + DDD + número, só dígitos)
// Exemplo: '5589987654321'
export const WHATSAPP_NUMBER = '';

export const STORE_INFO = {
  name: 'X-mart Celulares',
  email: 'contato@xmartcelulares.com',
  addressLabel: 'WJHR+8Q Centro, Bom Jesus - PI',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=WJHR%2B8Q+Centro%2C+Bom+Jesus+-+PI',
  instagramUrl: 'https://www.instagram.com/xmartcelulares_/',
};

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

const PAYMENT_LABELS = {
  pix: 'Pix',
  credit_card: 'Cartão de Crédito',
};

export function buildOrderMessage({
  customerName,
  customerWhatsapp,
  fulfillment,
  paymentMethod,
  items,
  total,
  origin = '',
}) {
  const lines = items.map((item, index) => {
    const photoUrl = item.image ? `${origin}${item.image}` : '';
    const priceLine = `   Qtd: ${item.quantity} · ${item.priceLabel}`;
    const photoLine = photoUrl ? `\n   Foto: ${photoUrl}` : '';
    return `${index + 1}. ${item.name}\n${priceLine}${photoLine}`;
  });

  const fulfillmentLines =
    fulfillment?.type === 'delivery'
      ? [
          'Entrega:',
          `${fulfillment.address} - ${fulfillment.neighborhood}`,
          `${fulfillment.city} · CEP ${fulfillment.zip}`,
        ]
      : ['Retirada na loja', STORE_INFO.addressLabel];

  return [
    'Olá! Gostaria de finalizar meu pedido na X-mart:',
    '',
    `Cliente: ${customerName}`,
    `WhatsApp: ${customerWhatsapp}`,
    '',
    ...lines,
    '',
    ...fulfillmentLines,
    '',
    `Pagamento: ${PAYMENT_LABELS[paymentMethod] || paymentMethod}`,
    `Total: ${total}`,
    '',
    'Aguardo a confirmação para combinar os próximos passos. Obrigado!',
  ].join('\n');
}

export function buildSellerContactMessage({ orderNumber } = {}) {
  return orderNumber
    ? `Olá! Fiz o pedido ${orderNumber} na X-mart e gostaria de falar com um vendedor.`
    : 'Olá! Gostaria de falar com um vendedor da X-mart.';
}
