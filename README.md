# X-mart Celulares

E-commerce de produtos Apple importados, feito em Next.js (App Router). Tema preto/vermelho, carrinho persistido em `localStorage`, reserva de pré-venda e finalização de compra pelo WhatsApp.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000` (ou a próxima porta livre).

## Estrutura

```
app/          rotas (App Router)
components/   componentes React
lib/          catálogo de produtos, carrinho (Context) e helpers
styles/       CSS global
public/       imagens e vídeos
```

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Home |
| `/produtos?categoria=<iphones\|macbooks\|ipads\|watches\|acessorios\|ofertas>` | Listagem por categoria |
| `/produto/[slug]` | Página de um produto (veja os ids em `lib/catalog.js`) |
| `/carrinho` | Carrinho |
| `/checkout` | Checkout |
| `/pedido-confirmado` | Confirmação de pedido |
| `/contato` | Contato |

## Antes de colocar no ar

- **WhatsApp**: coloque o número real da loja em `lib/whatsapp.js` (constante `WHATSAPP_NUMBER`, só dígitos com código do país). Sem isso, os botões de "Reservar"/"Finalizar Compra" abrem o WhatsApp pedindo pra escolher um contato, em vez de já abrir a conversa com a loja.
- **Catálogo**: os produtos, preços e imagens ficam em `lib/catalog.js` — é a única fonte de dados do site (home, listagem, produto e carrinho leem daqui).

## Deploy na Vercel

1. Importe este repositório na Vercel.
2. Não precisa configurar nenhuma variável de ambiente — o site não usa banco de dados nem chaves de API.
3. Deploy. A Vercel detecta o Next.js automaticamente (build command `next build`), sem configuração extra necessária.

O build de produção (`npm run build`) já foi testado e sai limpo, sem erros.
