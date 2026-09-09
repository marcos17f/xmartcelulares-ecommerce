# X-mart Celulares

Loja online da X-mart: especialista em produtos Apple, iPhones e Macs importados dos EUA, acessórios, som e smartwatch, com entrega para todo o Brasil.

Protótipo de e-commerce em HTML, CSS e JavaScript puros — sem framework nem build.

## Estrutura

- `index.html`, `catalogo.html`, `produto.html`, `carrinho.html`, `checkout.html`, `conta.html` — páginas do site
- `trocas-garantia.html`, `formas-pagamento.html` — páginas institucionais
- `css/style.css` — estilos
- `js/` — lógica de cada página, catálogo de produtos (`products.js`), carrinho/conta (`store.js`) e componentes de header/footer (`layout.js`)
- `img/` — imagens de produtos, hero e logo

## Rodando localmente

Como não há build, basta servir a pasta com qualquer servidor estático:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Dados de exemplo

O catálogo em `js/products.js` contém dados de exemplo — troque nome, preço, estoque e especificações pelos produtos reais da loja antes de publicar. Veja também o comentário `TODO` no rodapé (`js/layout.js`) para substituir o CNPJ placeholder.
# xmartcelulares-ecommerce
