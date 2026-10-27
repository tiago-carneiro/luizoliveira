# Luiz Oliveira

Site estático com a mesma organização de páginas e roteamento por hash do projeto i9sbemestar. Mantém a identidade visual e o conteúdo do site Luiz Oliveira.

## Executar localmente

O roteador carrega HTML com `fetch`, portanto é necessário servir por HTTP:

```sh
cd "$HOME/Desktop/site-luizoliveira/alterado"
python3 -m http.server 8000
```

Abra http://localhost:8000/#/home. Não há instalação de dependências ou etapa de build.

## Estrutura

- `index.html`: estrutura compartilhada, cabeçalho e rodapé.
- `app.js`: entrada dos módulos.
- `router.js`: rotas, cache, títulos, navegação e página 404.
- `pages/home/index.html`: apresentação, trajetória, três áreas e informações de contato.
- `pages/rh-nr1/index.html`: RH, desenvolvimento organizacional e NR-1.
- `pages/clinica-neuro/index.html`: psicoterapia, abordagens e avaliação neuropsicológica.
- `pages/palestras/index.html`: temas, contratação, fotos e vídeos.
- `pages/404/index.html`: página não encontrada.
- `css/style.css`: estilos preservados e ajustes de navegação.
- `js/site.js`: menu e inicialização das páginas.
- `images/` e `videos/`: mídias locais do site original.

Rotas: `#/home`, `#/rh-nr1`, `#/clinica-neuro`, `#/palestras`.
Para direcionar a uma seção: `#/home?secao=sobre`.

O projeto i9sbemestar e a pasta original luizoliveira.daviux.com.br não foram alterados.
