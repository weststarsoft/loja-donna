# Loja Donna — Deploy no Vercel

## Estrutura de arquivos

```
loja-donna/
├── index.html       ← estrutura e estilos do app
├── app.js           ← toda a lógica do app
├── data.js          ← produtos, banners e contato (edite aqui!)
├── manifest.json    ← configuração PWA (instalar como app)
└── icons/
    ├── icon-192.png ← ícone do app (crie uma imagem 192x192px)
    └── icon-512.png ← ícone do app (crie uma imagem 512x512px)
```

---

## Passo a passo — GitHub + Vercel

### 1. Criar o repositório no GitHub

1. Acesse [github.com](https://github.com) e clique em **New repository**
2. Nome sugerido: `loja-donna`
3. Deixe como **Public** e clique em **Create repository**
4. Na próxima tela, clique em **uploading an existing file**
5. Arraste todos os arquivos do projeto para a área de upload
6. Clique em **Commit changes**

> Para a pasta `icons/`, crie duas imagens PNG com o logo da Donna:
> uma de 192×192px e outra de 512×512px. Pode usar o Canva gratuitamente.

---

### 2. Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta GitHub
2. Clique em **Add New Project**
3. Selecione o repositório `loja-donna`
4. Clique em **Deploy** — sem alterar nenhuma configuração
5. Em ~30 segundos o app estará no ar em um link tipo:
   `https://loja-donna.vercel.app`

---

### 3. Adicionar domínio próprio (opcional)

1. Compre seu domínio (ex: `lojadonna.com.br`) no [Registro.br](https://registro.br)
2. No painel do Vercel, vá em **Settings → Domains**
3. Digite seu domínio e siga as instruções para apontar o DNS
4. Pronto — em até 24h o app responde no seu domínio

---

### 4. Instalar como app no celular (PWA)

**Android (Chrome):**
1. Abra o link no Chrome
2. Toque nos 3 pontinhos → **Adicionar à tela inicial**

**iPhone (Safari):**
1. Abra o link no Safari
2. Toque no ícone de compartilhar → **Adicionar à Tela de Início**

---

## Como atualizar produtos e conteúdo

Tudo que você precisa editar está no arquivo `data.js`:

- **Produtos:** adicione ou remova itens no array `PRODUCTS`
- **Banners:** edite os banners no array `BANNERS`
- **WhatsApp:** troque o número em `WHATSAPP_NUMBER`
- **Instagram:** troque o usuário em `INSTAGRAM_USER`

Após editar, basta fazer commit no GitHub — o Vercel atualiza automaticamente em segundos.

---

## Próximos passos sugeridos

- [ ] Criar os ícones do app (192px e 512px) com o logo Donna
- [ ] Trocar os emojis por fotos reais dos produtos
- [ ] Atualizar o número do WhatsApp e Instagram
- [ ] Comprar domínio próprio
- [ ] Backoffice para gerenciar produtos sem mexer no código
