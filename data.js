// ─────────────────────────────────────────
//  DATA.JS — edite aqui os produtos, banners
//  e informações de contato da loja
// ─────────────────────────────────────────

// CONTATO — substitua pelos dados reais
const WHATSAPP_NUMBER = '5511999999999'; // DDI + DDD + número, sem espaços
const INSTAGRAM_USER  = 'lojadonna';

// BANNERS — carrossel do topo
const BANNERS = [
  {
    title: 'Copa do Mundo 🇧🇷',
    sub:   'Vista o Brasil com estilo',
    emoji: '🏆',
    bg:    'linear-gradient(135deg,#c8e6b8,#9FE1CB)',
    titleColor: '#085041',
    subColor:   '#0F6E56',
    ctaBg:      '#0F6E56',
    ctaColor:   '#fff',
  },
  {
    title: 'Coleção Especial',
    sub:   'Peças exclusivas Donna',
    emoji: '✨',
    bg:    'linear-gradient(135deg,#FBEAF0,#F4C0D1)',
    titleColor: '#4B1528',
    subColor:   '#72243E',
    ctaBg:      '#D4537E',
    ctaColor:   '#fff',
  },
  {
    title: 'Semana de Ofertas',
    sub:   'Até 50% de desconto',
    emoji: '🏷️',
    bg:    'linear-gradient(135deg,#FAEEDA,#FAC775)',
    titleColor: '#412402',
    subColor:   '#633806',
    ctaBg:      '#854F0B',
    ctaColor:   '#fff',
  },
  {
    title: 'Treino & Estilo',
    sub:   'Looks perfeitos pra malhar',
    emoji: '🏃',
    bg:    'linear-gradient(135deg,#E6F1FB,#B5D4F4)',
    titleColor: '#042C53',
    subColor:   '#185FA5',
    ctaBg:      '#185FA5',
    ctaColor:   '#fff',
  },
];

// CATEGORIAS — ordem das abas e do drawer
const CATS = [
  { id: 'Ofertas',          label: '🏷️ Ofertas' },
  { id: 'Coleção Especial', label: '✨ Coleção'  },
  { id: 'Treino',           label: '🏃 Treino'   },
  { id: 'Novidade',         label: '🌟 Novidade' },
];

// PRODUTOS — adicione, remova ou edite à vontade
// emoji: use um emoji como placeholder de imagem por enquanto
// estoque <= 3  → badge "🔥 Restam X"
// estoque > 3   → badge "X unid."
const PRODUCTS = [
  // ── Coleção Especial ──────────────────────
  {
    id: 1, nome: 'Body Verde Amarelo',
    emoji: '🩱', cat: 'Coleção Especial',
    preco_antigo: 129.90, preco_atual: 89.90,
    estoque: 3, views: 847,
  },
  {
    id: 2, nome: 'Vestido Brasil Luxo',
    emoji: '👗', cat: 'Coleção Especial',
    preco_antigo: 259.90, preco_atual: 189.90,
    estoque: 2, views: 1203,
  },
  {
    id: 3, nome: 'Conjunto Ouro Verde',
    emoji: '🧣', cat: 'Coleção Especial',
    preco_antigo: 199.90, preco_atual: 149.90,
    estoque: 5, views: 562,
  },
  {
    id: 4, nome: 'Blusa Copa 2026',
    emoji: '👚', cat: 'Coleção Especial',
    preco_antigo: 99.90, preco_atual: 69.90,
    estoque: 8, views: 934,
  },
  // ── Ofertas ───────────────────────────────
  {
    id: 5, nome: 'Vestido Floral Rose',
    emoji: '🌸', cat: 'Ofertas',
    preco_antigo: 189.90, preco_atual: 99.90,
    estoque: 4, views: 723,
  },
  {
    id: 6, nome: 'Saia Midi Jeans',
    emoji: '👗', cat: 'Ofertas',
    preco_antigo: 139.90, preco_atual: 79.90,
    estoque: 1, views: 1450,
  },
  {
    id: 7, nome: 'Top Cropped Premium',
    emoji: '👙', cat: 'Ofertas',
    preco_antigo: 89.90, preco_atual: 49.90,
    estoque: 6, views: 389,
  },
  {
    id: 8, nome: 'Short Jeans Destroyed',
    emoji: '🩳', cat: 'Ofertas',
    preco_antigo: 119.90, preco_atual: 69.90,
    estoque: 3, views: 601,
  },
  // ── Treino ────────────────────────────────
  {
    id: 9, nome: 'Conjunto Treino Rosa',
    emoji: '🏋️', cat: 'Treino',
    preco_antigo: 229.90, preco_atual: 159.90,
    estoque: 5, views: 892,
  },
  {
    id: 10, nome: 'Legging Compressão',
    emoji: '🩱', cat: 'Treino',
    preco_antigo: 159.90, preco_atual: 99.90,
    estoque: 7, views: 1102,
  },
  {
    id: 11, nome: 'Top Fitness Glow',
    emoji: '🌟', cat: 'Treino',
    preco_antigo: 99.90, preco_atual: 69.90,
    estoque: 2, views: 445,
  },
  {
    id: 12, nome: 'Calça Jogger Premium',
    emoji: '🧘', cat: 'Treino',
    preco_antigo: 189.90, preco_atual: 129.90,
    estoque: 4, views: 678,
  },
  // ── Novidade ──────────────────────────────
  {
    id: 13, nome: 'Blazer Oversized Nude',
    emoji: '🧥', cat: 'Novidade',
    preco_antigo: 299.90, preco_atual: 219.90,
    estoque: 3, views: 2341,
  },
  {
    id: 14, nome: 'Vestido Cetim Noite',
    emoji: '✨', cat: 'Novidade',
    preco_antigo: 349.90, preco_atual: 269.90,
    estoque: 2, views: 1876,
  },
  {
    id: 15, nome: 'Calça Wide Leg',
    emoji: '👖', cat: 'Novidade',
    preco_antigo: 219.90, preco_atual: 169.90,
    estoque: 6, views: 934,
  },
  {
    id: 16, nome: 'Camisa Linho Off White',
    emoji: '👔', cat: 'Novidade',
    preco_antigo: 179.90, preco_atual: 129.90,
    estoque: 4, views: 512,
  },
];
