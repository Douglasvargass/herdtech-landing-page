# HerdTech — Landing page

Página de divulgação da startup **HerdTech** (*Tecnologia para um rebanho mais produtivo*), feita com
**HTML, CSS e JavaScript puro** no formato **PWA** (instalável e com funcionamento offline).

## Conteúdo da página

- A startup e a proposta: tirar o rebanho do caderno
- O problema: contexto regional (Vale do Gado Jersey) e a dor do pequeno produtor
- Estudo de caso: Sítio Boa Vista, com o gráfico do prejuízo invisível
- A solução: Produtor e Fazenda, Rebanho e Vacinação
- Resultados esperados (antes e depois), próximos passos e equipe

## Estrutura

```
HerdTech-LandingPage/
├── index.html        # estrutura da página
├── manifest.json     # configuração do PWA (nome, cores, ícones)
├── sw.js             # service worker: cache para uso offline
├── css/style.css     # aparência
├── js/script.js      # menu, animações, botão "Instalar app" e registro do service worker
├── img/logo.png      # logo da HerdTech
└── icons/            # ícones do PWA
```

## Como ver no computador

O service worker só funciona com `http://` (não com duplo clique no arquivo). Na pasta do projeto:

```bash
npx serve .
```

e abra o endereço mostrado. Abrir o `index.html` direto também funciona, só sem o modo offline.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub e envie o conteúdo desta pasta (o `index.html` deve ficar na raiz).
2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/ (root)`.
4. Aguarde alguns minutos: o link `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/` aparece na mesma tela.

Todos os caminhos do site são relativos, então ele funciona dentro do endereço do repositório.

> Ao alterar qualquer arquivo do site, troque a versão do cache em `sw.js` (`herdtech-v1` → `herdtech-v2`).
> Sem isso, o navegador pode continuar mostrando os arquivos antigos.

## Equipe

Douglas, Guilherme, Julia e Vitor.
