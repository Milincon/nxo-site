# Procedia, como colocar no ar

Site estatico. Nao tem build: os arquivos da raiz sao publicados como estao.

## Estrutura

| Arquivo | O que e |
|---|---|
| `index.html` `planos.html` `cases.html` `sistemas.html` `contato.html` `privacidade.html` | As seis paginas |
| `assets/procedia.css` | Folha de estilo unica. Toda alteracao visual passa por aqui |
| `assets/site.js` | Menu, entrada dos elementos, contagem dos numeros, consentimento e pixel |
| `assets/fonts/` | Geist e Instrument Serif em woff2, auto-hospedadas |
| `assets/marca/` | Logos v2 em SVG |
| `_redirects` | Redireciona as URLs antigas da NXO (301) |
| `_headers` | Cabecalhos de seguranca e cache |
| `_arquivo-nxo/` | Site antigo, so para consulta |

## 1. Publicar

Rode `atualizar-site.bat`. Ele faz commit, sincroniza com o GitHub e envia.

Se der erro de trava, abra o PowerShell na pasta e rode antes:

```
Get-ChildItem .git -Recurse -Force -Filter *.lock | Remove-Item -Force
```

## 2. Apontar o dominio procediasistemas.com.br

No **Netlify**, no site que ja existe:

1. Site configuration, Domain management, Add a domain.
2. Digite `procediasistemas.com.br` e confirme.
3. O Netlify mostra os registros de DNS. Duas opcoes:
   - **Nameservers do Netlify** (mais simples): troque os nameservers no registrador do dominio
     pelos que o Netlify indicar. Propaga em algumas horas.
   - **Registro manual**: no registrador, crie um registro `A` para o apex apontando para o IP do
     Netlify e um `CNAME` de `www` para o endereco `.netlify.app` do site.
4. Marque `procediasistemas.com.br` como **Primary domain**. O `www` passa a redirecionar sozinho.
5. Espere o certificado HTTPS ser emitido (automatico, Let's Encrypt).
6. Em Domain management, remova `nxoagencia.com.br` quando nao quiser mais manter o antigo no ar.

## 3. Renomear o repositorio

O repositorio ainda se chama `nxo-site`. No GitHub: Settings, Repository name, mude para
`procedia-site` e salve. Depois, na pasta do projeto:

```
git remote set-url origin https://github.com/Milincon/procedia-site.git
```

O GitHub mantem o redirecionamento do nome antigo por um tempo, entao nada quebra no intervalo.

## 4. Formulario de contato

O formulario usa **Netlify Forms** (`data-netlify="true"`). Depois do primeiro deploy, as
mensagens aparecem no painel do Netlify em Forms. Configure ali a notificacao por e-mail quando
a caixa da Procedia existir.

## 5. Pixel

O ID fica em um unico lugar: `assets/site.js`, linha com `var PIXEL_ID`. O pixel so carrega
depois que o visitante aceita os cookies.

Depois de publicar, confira no Gerenciador de Eventos se o dominio novo aparece recebendo eventos
`PageView`, `Lead` e `Contact`.

## 6. Quando o e-mail existir

Hoje o site nao tem endereco de e-mail, so WhatsApp. Quando criar a caixa, os lugares para
incluir sao: rodape de todas as paginas, a lista de canais em `contato.html` e o contato do
controlador em `privacidade.html`.
