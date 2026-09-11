// TODO: substituir pelo catálogo real vindo do banco de dados/CMS.
// Esta é a única fonte de dados dos produtos — todas as páginas (home, listagem,
// produto e carrinho) leem daqui, então cada produto tem uma página própria.

export const CATEGORIES = [
  { slug: 'iphones', label: 'iPhones' },
  { slug: 'macbooks', label: 'MacBooks' },
  { slug: 'ipads', label: 'iPads' },
  { slug: 'watches', label: 'Relógios' },
  { slug: 'acessorios', label: 'Acessórios' },
];

function slugify(text) {
  const DIACRITICS = new RegExp('[̀-ͯ]', 'g');
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITICS, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Monta a lista de pills expansíveis (especificações) de um produto a partir
// de pares [rótulo curto, descrição] e uma única imagem de apoio.
function buildPills(image, entries) {
  return entries.map(([label, description]) => ({
    id: slugify(label),
    label,
    description,
    image,
  }));
}

const IPHONE_COLORS = [
  { name: 'Preto', image: '/images/iphone-preto.png' },
  { name: 'Grafite', image: '/images/iphone-grafite.png' },
  { name: 'Titânio Natural', image: '/images/iphone-titanio-natural.png' },
  { name: 'Dourado', image: '/images/iphone-dourado.png' },
  { name: 'Branco', image: '/images/iphone-branco.png' },
  { name: 'Rosa', image: '/images/iphone-rosa.png' },
];

const IPHONE_THUMBS = [
  '/images/iphone-13-pro-thumb-1.png',
  '/images/iphone-13-pro-thumb-2.png',
  '/images/iphone-13-pro-thumb-3.png',
  '/images/iphone-13-pro-thumb-4.png',
];

// Linha iPhone 18 — em pré-venda, ainda sem estoque físico.
const IPHONE_18_RELEASE_NOTE = 'Pré-venda · chegada prevista em breve';
const IPHONE_18_IMAGE = '/images/iphone-18-lineup.webp';
const IPHONE_18_THUMBS = ['/images/iphone-18-lineup.webp', '/images/iphone-18-colors.jpg'];
const IPHONE_DUO_COLOR_NAMES = ['Azul', 'Vinho', 'Preto'];
const IPHONE_DUO_IMAGE = '/images/iphone-duo.jpg';
const IPHONE_DUO_SPECS = [
  'Tela Super Retina XDR de 7,6" — 50% maior que a do iPhone 18 Pro Max.',
  'Design dobrável: a proporção da tela interna é consistente com a da parte externa, para uma experiência visual mais imersiva entre os modelos de iPhone.',
  'Tela interna produzida com 10 camadas ultrafinas e acabamento nano-texture customizado, que reduz reflexos.',
  'Câmera FaceTime escondida sob a tela: fica invisível até ser ativada, então nada atrapalha a imagem e a superfície fica incrivelmente lisa e plana.',
  'O melhor iPhone para curtir filmes, séries e jogos.',
  'iOS 27 reimaginado: passe de uma tela pra outra ou mude de posição naturalmente, aproveitando a área da tela interna e a praticidade da externa no dia a dia.',
  'Abra o telefone ou deixe em pé (modo cavalete) pra gravar vídeos e fazer chamadas sem precisar segurar o aparelho.',
  'Sistema de câmera com Duo Preview e Animação para Crianças, pra ajudar todo mundo a sair bem na foto.',
  'Duo FaceTime deixa mais gente participar das chamadas de vídeo, e a Captura Inteligente vira o fotógrafo automaticamente.',
  'Fotos incríveis em 48MP e vídeos em 4K a 120 qps.',
  'Chip A20 Pro com Duplo Neural Engine de 16 núcleos, projetado pra dar conta de processos complexos de IA. CPU de 6 núcleos até 20% mais rápida e banda de memória até 50% maior que no A19 Pro.',
  'Sistema avançado de gerenciamento térmico com câmara de vapor, mantendo o desempenho Pro em tarefas e jogos pesados.',
  'Primeiro sistema de bateria dupla para iPhone, com mais capacidade aproveitando o espaço liberado pelo eSIM, e modem C2 com eficiência de consumo revolucionária.',
  'Até 31 horas de reprodução de vídeo na tela interna e até 44 horas na tela externa. Recarrega até 50% da bateria em cerca de 20 minutos com a recarga rápida com fio.',
  'Reserva sem compromisso: você só paga quando o aparelho chegar.',
];

// Especificações reais divulgadas pela Apple pro iPhone 18 Pro / Pro Max.
const IPHONE_18_PRO_COLOR_NAMES = ['Prateado', 'Glacial', 'Bordô', 'Preto'];
const IPHONE_18_PRO_THUMBS = [
  ...IPHONE_18_THUMBS,
  '/images/iphone-18-camera-control.jpg',
  '/images/iphone-18-camera-styles.jpg',
  '/images/iphone-18-action-button.jpg',
  '/images/iphone-18-durability.jpg',
];
const IPHONE_18_PRO_COMMON_SPECS = [
  'Câmera: sistema de 3 câmeras traseiras de 48MP com zoom óptico de até 8x. Principal Fusion 48MP (24/48mm, ƒ/1.48–ƒ/4.0) com abertura variável; ultra-angular Fusion 48MP (13mm, ƒ/2.2); teleobjetiva Fusion 48MP (100/200mm, ƒ/2.8).',
  'Novos controles Pro e Estilos Fotográficos 3 pra ajustar textura e granulação, com abertura variável que ajusta iluminação e profundidade de campo automaticamente — de retratos espontâneos a vídeos cinematográficos.',
  'Chip A20 Pro com acondicionamento inspirado na série M: CPU de 6 núcleos até 50% mais rápida, até 40% mais desempenho gráfico que o iPhone 17 Pro, Duplo Neural Engine de 16 núcleos e 50% mais largura de banda de memória pra Apple Intelligence.',
  'Modem C2 de nova geração: mais qualidade e confiabilidade de rede, com upload até 50% mais rápido em alguns países e menor consumo de bateria.',
  'Recarga com fio mais rápida: até 50% de bateria em cerca de 15 minutos com adaptador compatível. No Pro Max, até 20 horas a mais de reprodução de vídeo (e até 7 horas com apenas 5 minutos de recarga).',
  'Câmera frontal Center Stage de 18MP, e Siri com vozes mais expressivas e ditado em todo o sistema.',
  'Dynamic Island redesenhada: acompanhe até três Atividades ao Vivo ao mesmo tempo, com placares de jogos, navegação e música num instante.',
  'Estrutura unibody em alumínio, parte de trás em Ceramic Shield e frente em Ceramic Shield 2 — resistência a arranhões 3x maior que o iPhone 16 Pro.',
  'Botão Controle da Câmera: fotografe, grave vídeos e ajuste configurações num instante.',
  'Botão de Ação configurável: mantenha pressionado para ativar o modo Silencioso, Tradutor, Atalhos e muito mais.',
  'Disponível em 4 cores — Prateado, Glacial, Bordô e Preto — com o vidro da parte de trás no mesmo tom.',
  'Reserva sem compromisso: você só paga quando o aparelho chegar.',
];

// Especificações em destaque (pills expansíveis) do iPhone 18 Pro / Pro Max.
const IPHONE_18_PRO_PILLS = [
  {
    id: 'cores',
    label: 'Cores',
    description:
      'Escolha entre quatro cores lindas, com o vidro da parte de trás no mesmo tom: Prateado, Glacial, Bordô e Preto.',
    image: '/images/iphone-18-colors.jpg',
  },
  {
    id: 'tamanhos',
    label: 'Em dois tamanhos',
    description:
      'iPhone 18 Pro Max de 6,9 polegadas e iPhone 18 Pro de 6,3 polegadas, com telas Super Retina XDR brilhantes com ProMotion de até 120Hz.',
    image: IPHONE_18_IMAGE,
  },
  {
    id: 'camera-principal',
    label: 'Nova câmera principal',
    description:
      'A abertura variável na câmera Fusion principal de 48MP tem ajuste automático para iluminação e profundidade de campo, para você tirar suas melhores fotos mesmo com baixa luminosidade.',
    image: '/images/iphone-18-camera-styles.jpg',
  },
  {
    id: 'dynamic-island',
    label: 'Dynamic Island redesenhada',
    description:
      'Veja até três Atividades ao Vivo de uma vez e mais informações num instante, como placares de jogos, navegação e música.',
    image: IPHONE_18_IMAGE,
  },
  {
    id: 'resistencia',
    label: 'Resistência',
    description:
      'Estrutura unibody resistente em alumínio, parte de trás em Ceramic Shield e da frente em Ceramic Shield 2, 3x mais resistente a arranhões que o iPhone 16 Pro.',
    image: '/images/iphone-18-durability.jpg',
  },
  {
    id: 'controle-camera',
    label: 'Controle da Câmera',
    description: 'Faça fotos, grave vídeos, altere ajustes e muito mais num instante.',
    image: '/images/iphone-18-camera-control.jpg',
  },
  {
    id: 'botao-acao',
    label: 'Botão de Ação',
    description:
      'Configure para ter acesso rápido ao seu recurso favorito. Mantenha pressionado para ativar o modo Silencioso, Traduzir, Atalhos e muito mais.',
    image: '/images/iphone-18-action-button.jpg',
  },
];
const IPHONE_18_PRO_SPECS = ['Tela Super Retina XDR de 6,3" com ProMotion de até 120Hz.', ...IPHONE_18_PRO_COMMON_SPECS];
const IPHONE_18_PRO_MAX_SPECS = ['Tela Super Retina XDR de 6,9" com ProMotion de até 120Hz.', ...IPHONE_18_PRO_COMMON_SPECS];

export const PRODUCTS = [
  {
    id: 'iphone-duo',
    category: 'iphones',
    name: 'iPhone Duo',
    summary: '7,6" dobrável · 256GB · Azul, Vinho ou Preto',
    description:
      'O iPhone Duo é o iPhone dobrável da Apple: tela interna Super Retina XDR de 7,6" (50% maior que a do iPhone 18 Pro Max), câmera FaceTime escondida sob a tela e chip A20 Pro. Reserve o seu agora e seja um dos primeiros a receber, com nota fiscal e garantia X-mart.',
    image: IPHONE_DUO_IMAGE,
    thumbnails: [IPHONE_DUO_IMAGE, IPHONE_18_IMAGE],
    colorNames: IPHONE_DUO_COLOR_NAMES,
    optionsLabel: 'Armazenamento',
    options: ['256GB', '512GB'],
    price: 6499,
    comingSoon: true,
    releaseNote: IPHONE_18_RELEASE_NOTE,
    specs: IPHONE_DUO_SPECS,
    specPills: buildPills(IPHONE_DUO_IMAGE, [
      ['Tela Dobrável', 'Tela Super Retina XDR de 7,6" — 50% maior que a do iPhone 18 Pro Max, com proporção interna consistente com a externa.'],
      ['Acabamento da Tela', 'Tela interna produzida com 10 camadas ultrafinas e acabamento nano-texture customizado, que reduz reflexos.'],
      ['Câmera FaceTime Escondida', 'Fica invisível sob a tela até ser ativada, deixando a superfície incrivelmente lisa e plana.'],
      ['iOS 27 Reimaginado', 'Passe de uma tela pra outra ou mude de posição naturalmente, aproveitando a tela interna e a praticidade da externa no dia a dia.'],
      ['Modo Cavalete', 'Abra o telefone ou deixe em pé pra gravar vídeos e fazer chamadas sem precisar segurar o aparelho.'],
      ['Sistema de Câmeras Duo', 'Duo Preview, Duo FaceTime e Captura Inteligente, com fotos em 48MP e vídeos em 4K a 120 qps.'],
      ['Desempenho e Bateria', 'Chip A20 Pro com Duplo Neural Engine, câmara de vapor e bateria dupla — até 31h de vídeo na tela interna.'],
    ]),
  },
  {
    id: 'iphone-18-pro',
    category: 'iphones',
    name: 'iPhone 18 Pro',
    summary: '6,3" · 256GB · Prateado, Glacial, Bordô ou Preto',
    description:
      'O melhor sistema de câmeras da Apple até hoje: câmera Fusion principal de 48MP com abertura variável, zoom óptico de até 8x e chip A20 Pro. Tela Super Retina XDR de 6,3" com ProMotion de até 120Hz. Reserve o seu agora e seja um dos primeiros a receber, com nota fiscal e garantia X-mart.',
    image: IPHONE_18_IMAGE,
    thumbnails: IPHONE_18_PRO_THUMBS,
    highlightsImage: '/images/iphone-18-pro-highlights.png',
    colorNames: IPHONE_18_PRO_COLOR_NAMES,
    optionsLabel: 'Armazenamento',
    options: ['256GB', '512GB', '1TB'],
    price: 8999,
    comingSoon: true,
    releaseNote: IPHONE_18_RELEASE_NOTE,
    specs: IPHONE_18_PRO_SPECS,
    specPills: IPHONE_18_PRO_PILLS,
  },
  {
    id: 'iphone-18-pro-max',
    category: 'iphones',
    name: 'iPhone 18 Pro Max',
    summary: '6,9" · 256GB · Prateado, Glacial, Bordô ou Preto',
    description:
      'O melhor sistema de câmeras da Apple até hoje: câmera Fusion principal de 48MP com abertura variável, zoom óptico de até 8x e chip A20 Pro. Tela Super Retina XDR de 6,9" com ProMotion de até 120Hz e até 7 horas de vídeo com apenas 5 minutos de recarga. Reserve o seu agora e seja um dos primeiros a receber, com nota fiscal e garantia X-mart.',
    image: IPHONE_18_IMAGE,
    thumbnails: IPHONE_18_PRO_THUMBS,
    highlightsImage: '/images/iphone-18-pro-highlights.png',
    colorNames: IPHONE_18_PRO_COLOR_NAMES,
    optionsLabel: 'Armazenamento',
    options: ['256GB', '512GB', '1TB'],
    price: 9999,
    comingSoon: true,
    releaseNote: IPHONE_18_RELEASE_NOTE,
    specs: IPHONE_18_PRO_MAX_SPECS,
    specPills: IPHONE_18_PRO_PILLS,
  },
  {
    id: 'iphone-15-pro-max',
    category: 'iphones',
    name: 'iPhone 15 Pro Max',
    summary: '256GB · Titânio Natural',
    description:
      'iPhone 15 Pro Max com tela Super Retina XDR de 6,7", chip A17 Pro e sistema de câmeras Pro com zoom óptico 5x. Importado dos EUA com garantia X-mart.',
    image: '/images/iphone-15.png',
    thumbnails: [...IPHONE_THUMBS, '/images/iphone-15.png'],
    colors: IPHONE_COLORS,
    optionsLabel: 'Armazenamento',
    options: ['128GB', '256GB', '512GB'],
    price: 7999,
    rating: 5,
    reviewCount: 214,
    isNew: true,
    specPills: buildPills('/images/iphone-15.png', [
      ['Tela', 'Tela Super Retina XDR de 6,7", brilhante e resistente a arranhões.'],
      ['Câmera Pro', 'Sistema de câmeras Pro com zoom óptico de 5x e gravação em ProRes.'],
      ['Chip A17 Pro', 'O chip mais avançado já usado num iPhone, ótimo pra jogos pesados.'],
      ['Cores', 'Acabamento em Titânio Natural, leve e premium.'],
    ]),
  },
  {
    id: 'iphone-13-pro',
    category: 'iphones',
    name: 'iPhone 13 Pro',
    summary: '128GB · Grafite',
    description:
      'Apple iPhone 13 Pro com tela Super Retina XDR de 6,1", chip A15 Bionic e sistema de câmeras Pro. Importado dos EUA com garantia X-mart.',
    image: '/images/iphone-13-pro-grafite.png',
    thumbnails: IPHONE_THUMBS,
    colors: IPHONE_COLORS,
    optionsLabel: 'Armazenamento',
    options: ['128GB', '256GB', '512GB'],
    price: 4999,
    rating: 4.5,
    reviewCount: 312,
    specPills: buildPills('/images/iphone-13-pro-grafite.png', [
      ['Tela', 'Tela Super Retina XDR de 6,1" com ProMotion de até 120Hz.'],
      ['Câmera Pro', 'Sistema de câmeras Pro com Modo Cinema e Modo Fotográfico.'],
      ['Chip A15 Bionic', 'Rápido e eficiente, com ótima duração de bateria.'],
      ['Cores', 'Disponível em Grafite, Prateado, Dourado e Azul-sierra.'],
    ]),
  },
  {
    id: 'iphone-14',
    category: 'iphones',
    name: 'iPhone 14',
    summary: '128GB · Meia-noite',
    description:
      'iPhone 14 com tela Super Retina XDR de 6,1", chip A15 Bionic e sistema de câmeras avançado com Modo Ação. Importado dos EUA com garantia X-mart.',
    image: '/images/iphone-13-pro-grafite.png',
    thumbnails: IPHONE_THUMBS,
    colors: IPHONE_COLORS,
    optionsLabel: 'Armazenamento',
    options: ['128GB', '256GB'],
    price: 4299,
    rating: 4.5,
    reviewCount: 156,
    specPills: buildPills('/images/iphone-13-pro-grafite.png', [
      ['Tela', 'Tela Super Retina XDR de 6,1", brilhante mesmo sob luz do sol.'],
      ['Câmera Avançada', 'Sistema de câmeras com Modo Ação, pra vídeos estáveis mesmo em movimento.'],
      ['Segurança', 'Detecção de Acidente de Carro, pra chamar ajuda automaticamente.'],
      ['Chip A15 Bionic', 'GPU de 5 núcleos, rápido pra jogos e apps do dia a dia.'],
    ]),
  },
  {
    id: 'macbook-air-m3',
    category: 'macbooks',
    name: 'MacBook Air M3',
    summary: '8GB RAM · 256GB SSD',
    description:
      'MacBook Air com chip M3, tela Liquid Retina de 13,6" e até 18 horas de bateria. Leve, silencioso e pronto para o dia a dia. Importado dos EUA com garantia X-mart.',
    image: '/images/macbook-pro.png',
    thumbnails: ['/images/macbook-pro.png', '/images/macbook-fechado.png'],
    optionsLabel: 'Armazenamento',
    options: ['256GB', '512GB', '1TB'],
    price: 9499,
    rating: 4.5,
    reviewCount: 98,
    isNew: true,
    specPills: buildPills('/images/macbook-pro.png', [
      ['Chip M3', 'CPU de 8 núcleos, rápido e silencioso — sem ventoinha.'],
      ['Tela', 'Tela Liquid Retina de 13,6" com 500 nits de brilho.'],
      ['Bateria', 'Até 18 horas de bateria em uma única carga.'],
      ['Design', 'Ultrafino, em alumínio reciclado, fácil de levar pra qualquer lugar.'],
    ]),
  },
  {
    id: 'macbook-air-m2',
    category: 'macbooks',
    name: 'MacBook Air M2',
    summary: '8GB RAM · 256GB SSD · Estelar',
    description:
      'MacBook Air com chip M2, design ultrafino e tela Liquid Retina de 13,6". Ótimo custo-benefício para quem quer um Mac original. Importado dos EUA com garantia X-mart.',
    image: '/images/macbook-fechado.png',
    thumbnails: ['/images/macbook-fechado.png', '/images/macbook-pro.png'],
    optionsLabel: 'Armazenamento',
    options: ['256GB', '512GB'],
    price: 9499,
    originalPrice: 10999,
    rating: 5,
    reviewCount: 64,
    specPills: buildPills('/images/macbook-fechado.png', [
      ['Chip M2', 'Ótimo equilíbrio entre desempenho e economia de bateria.'],
      ['Tela', 'Tela Liquid Retina de 13,6" com milhões de cores.'],
      ['Portas', 'MagSafe, dois USB-C e conector de fone de ouvido.'],
      ['Design', 'Fino, leve e completamente silencioso.'],
    ]),
  },
  {
    id: 'ipad-air',
    category: 'ipads',
    name: 'iPad Air',
    summary: '64GB · Wi-Fi',
    description:
      'iPad Air com chip M1, tela Liquid Retina de 10,9" e suporte à Apple Pencil. Rápido, versátil e portátil. Importado dos EUA com garantia X-mart.',
    image: '/images/ipad-air.png',
    thumbnails: ['/images/ipad-air.png'],
    optionsLabel: 'Armazenamento',
    options: ['64GB', '256GB'],
    price: 4799,
    originalPrice: 5499,
    rating: 4.5,
    reviewCount: 88,
    specPills: buildPills('/images/ipad-air.png', [
      ['Chip M1', 'Desempenho rápido pra multitarefa, edição e criação.'],
      ['Tela', 'Tela Liquid Retina de 10,9" com True Tone.'],
      ['Apple Pencil', 'Compatível com Apple Pencil (2ª geração) e Magic Keyboard.'],
      ['Câmera', 'Câmera frontal Ultra Wide de 12MP com Enquadramento Automático.'],
    ]),
  },
  {
    id: 'ipad-air-5',
    category: 'ipads',
    name: 'iPad Air 5ª Geração',
    summary: '256GB · Wi-Fi',
    description:
      'iPad Air de 5ª geração com chip M1 e 256GB de armazenamento, ideal para produtividade e criação. Importado dos EUA com garantia X-mart.',
    image: '/images/ipad-air.png',
    thumbnails: ['/images/ipad-air.png'],
    optionsLabel: 'Armazenamento',
    options: ['256GB'],
    price: 5799,
    rating: 5,
    reviewCount: 41,
    specPills: buildPills('/images/ipad-air.png', [
      ['Chip M1', 'Desempenho rápido pra multitarefa, edição e criação.'],
      ['Tela', 'Tela Liquid Retina de 10,9" com True Tone.'],
      ['Armazenamento', '256GB, espaço de sobra pra fotos, apps e projetos.'],
      ['Conectividade', 'Wi-Fi rápido, pronto pra streaming e downloads grandes.'],
    ]),
  },
  {
    id: 'apple-watch-9',
    category: 'watches',
    name: 'Apple Watch Series 9',
    summary: '45mm · GPS · Meia-noite',
    description:
      'Apple Watch Series 9 com tela Retina sempre ativa, novo chip S9 e recursos avançados de saúde. Importado dos EUA com garantia X-mart.',
    image: '/images/apple-watch-9.png',
    thumbnails: ['/images/apple-watch-9.png'],
    optionsLabel: 'Tamanho',
    options: ['41mm', '45mm'],
    price: 2999,
    rating: 4.5,
    reviewCount: 132,
    isNew: true,
    specPills: buildPills('/images/apple-watch-9.png', [
      ['Tela', 'Tela Retina sempre ativa, mais brilhante ao ar livre.'],
      ['Chip S9', 'Novo gesto de Toque Duplo pra controlar sem tocar na tela.'],
      ['Saúde', 'Monitor de frequência cardíaca, oxigênio no sangue e ECG.'],
      ['Bateria', 'Até 18 horas de bateria por carga.'],
    ]),
  },
  {
    id: 'apple-watch-se',
    category: 'watches',
    name: 'Apple Watch SE',
    summary: '40mm · GPS',
    description:
      'Apple Watch SE com os principais recursos de saúde e segurança da Apple por um ótimo preço. Importado dos EUA com garantia X-mart.',
    image: '/images/apple-watch-9.png',
    thumbnails: ['/images/apple-watch-9.png'],
    optionsLabel: 'Tamanho',
    options: ['40mm', '44mm'],
    price: 2299,
    rating: 4,
    reviewCount: 57,
    specPills: buildPills('/images/apple-watch-9.png', [
      ['Tela', 'Tela Retina resistente, sempre visível mesmo com o pulso baixo.'],
      ['Recursos de Saúde', 'Detecção de queda e notificação de frequência cardíaca alta ou baixa.'],
      ['Segurança', 'Detecção de Acidente de Carro e SOS de Emergência.'],
      ['Bateria', 'Até 18 horas de bateria por carga.'],
    ]),
  },
  {
    id: 'airpods-pro-2',
    category: 'acessorios',
    name: 'AirPods Pro 2',
    summary: 'Cancelamento de ruído ativo',
    description:
      'AirPods Pro (2ª geração) com cancelamento de ruído ativo, áudio espacial personalizado e estojo com carga MagSafe. Importado dos EUA com garantia X-mart.',
    image: '/images/airpods-pro-2.png',
    thumbnails: ['/images/airpods-pro-2.png'],
    price: 1899,
    rating: 5,
    reviewCount: 201,
    specPills: buildPills('/images/airpods-pro-2.png', [
      ['Cancelamento de Ruído', 'Cancelamento de ruído ativo até 2x mais eficaz que a geração anterior.'],
      ['Áudio Espacial', 'Áudio espacial personalizado com rastreamento de movimento de cabeça.'],
      ['Estojo', 'Estojo com carga MagSafe e alto-falante de localização.'],
      ['Bateria', 'Até 6h de música com uma carga, 30h com o estojo.'],
    ]),
  },
  {
    id: 'airpods-pro',
    category: 'acessorios',
    name: 'AirPods Pro',
    summary: 'Cancelamento de ruído ativo',
    description:
      'AirPods Pro com cancelamento de ruído ativo e modo ambiente para você escolher o quanto quer ouvir do mundo ao redor. Importado dos EUA com garantia X-mart.',
    image: '/images/airpods-pro.png',
    thumbnails: ['/images/airpods-pro.png'],
    price: 1899,
    originalPrice: 2199,
    rating: 4.5,
    reviewCount: 174,
    specPills: buildPills('/images/airpods-pro.png', [
      ['Cancelamento de Ruído', 'Cancelamento de ruído ativo, com modo ambiente ajustável.'],
      ['Áudio Espacial', 'Áudio espacial com áudio dinâmico pra som envolvente.'],
      ['Estojo', 'Estojo de recarga sem fio, compacto e prático.'],
      ['Bateria', 'Até 4,5h de música com uma carga, 24h com o estojo.'],
    ]),
  },
  {
    id: 'jbl-charge-5',
    category: 'acessorios',
    name: 'JBL Charge 5',
    summary: 'Caixa de som à prova d’água',
    description:
      'Caixa de som portátil JBL Charge 5, à prova d’água e poeira (IP67), com até 20 horas de bateria e power bank integrado.',
    image: '/images/jbl-charge5.png',
    thumbnails: ['/images/jbl-charge5.png'],
    price: 1199,
    originalPrice: 1399,
    rating: 4.5,
    reviewCount: 96,
    specPills: buildPills('/images/jbl-charge5.png', [
      ['Som', 'Som JBL Original Pro, com graves potentes.'],
      ['Resistência', 'À prova d’água e poeira (IP67) — leva pra qualquer lugar.'],
      ['Bateria', 'Até 20 horas de bateria.'],
      ['Power Bank', 'Power bank integrado pra carregar seu celular.'],
    ]),
  },
  {
    id: 'jbl-fone-bluetooth',
    category: 'acessorios',
    name: 'JBL Fone Bluetooth',
    summary: 'Over-ear · Bateria de 40h',
    description: 'Fone de ouvido over-ear JBL com Bluetooth, som JBL Pure Bass e até 40 horas de bateria.',
    image: '/images/jbl-fone.png',
    thumbnails: ['/images/jbl-fone.png'],
    price: 899,
    rating: 4.5,
    reviewCount: 63,
    isNew: true,
    specPills: buildPills('/images/jbl-fone.png', [
      ['Som', 'Som JBL Pure Bass, potente e equilibrado.'],
      ['Bateria', 'Até 40 horas de bateria com uma carga.'],
      ['Conforto', 'Design over-ear leve, confortável pro dia todo.'],
      ['Bluetooth', 'Conexão estável e de longo alcance.'],
    ]),
  },
  {
    id: 'jbl-flip-6',
    category: 'acessorios',
    name: 'JBL Flip 6',
    summary: 'Caixa de som à prova d’água',
    description: 'Caixa de som portátil JBL Flip 6, à prova d’água (IP67) e com som potente para qualquer ocasião.',
    image: '/images/jbl-flip.png',
    thumbnails: ['/images/jbl-flip.png'],
    price: 699,
    rating: 4,
    reviewCount: 38,
    isNew: true,
    specPills: buildPills('/images/jbl-flip.png', [
      ['Som', 'Som JBL Original Pro em um design compacto.'],
      ['Resistência', 'À prova d’água e poeira (IP67).'],
      ['Bateria', 'Até 12 horas de bateria.'],
      ['Portátil', 'Alça de mão, fácil de levar pra qualquer lugar.'],
    ]),
  },
  {
    id: 'jbl-xtreme-3',
    category: 'acessorios',
    name: 'JBL Xtreme 3',
    summary: 'Caixa de som portátil grande',
    description: 'Caixa de som JBL Xtreme 3 com som potente, alça de transporte e resistência à água e poeira.',
    image: '/images/jbl-xtreme.png',
    thumbnails: ['/images/jbl-xtreme.png'],
    price: 1699,
    rating: 4.5,
    reviewCount: 29,
    isNew: true,
    specPills: buildPills('/images/jbl-xtreme.png', [
      ['Som', 'Som estéreo potente, com PartyBoost pra conectar outras caixas.'],
      ['Resistência', 'À prova d’água e poeira (IP67), com flutuação.'],
      ['Bateria', 'Até 15 horas de bateria.'],
      ['Portátil', 'Alça de transporte reforçada.'],
    ]),
  },
  {
    id: 'jbl-boombox-3',
    category: 'acessorios',
    name: 'JBL Boombox 3',
    summary: 'Caixa de som de alta potência',
    description: 'Caixa de som JBL Boombox 3, com som de altíssima potência e até 24 horas de bateria.',
    image: '/images/jbl-boombox3.png',
    thumbnails: ['/images/jbl-boombox3.png'],
    price: 3299,
    rating: 5,
    reviewCount: 22,
    isNew: true,
    specPills: buildPills('/images/jbl-boombox3.png', [
      ['Som', 'Som de altíssima potência, com grave profundo.'],
      ['Bateria', 'Até 24 horas de bateria.'],
      ['Resistência', 'À prova d’água e poeira (IP67).'],
      ['Power Bank', 'Power bank integrado de alta capacidade.'],
    ]),
  },
];

export function getProductById(id) {
  return PRODUCTS.find((product) => product.id === id) || null;
}

export function getProductsByCategory(categoria) {
  if (!categoria) return PRODUCTS;
  if (categoria === 'ofertas') return PRODUCTS.filter((product) => product.originalPrice);
  return PRODUCTS.filter((product) => product.category === categoria);
}
