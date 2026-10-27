/* Hash router: pages/<rota>/index.html, com cache por caminho. */
const cache = new Map();
const pages = {
  home: 'Luiz Oliveira | Psicologia, RH e Palestras',
  'rh-nr1': 'RH e NR-1 | Luiz Oliveira',
  'clinica-neuro': 'Psicologia Clínica e Neuropsicologia | Luiz Oliveira',
  palestras: 'Palestras | Luiz Oliveira'
};
let requestId = 0;

async function loadPage(route) {
  if (cache.has(route)) return cache.get(route);
  const response = await fetch(`./pages/${route}/index.html`);
  if (!response.ok) throw new Error('Página indisponível');
  const html = await response.text();
  cache.set(route, html);
  return html;
}

export async function router() {
  const app = document.getElementById('app');
  const id = ++requestId;
  const [path, query = ''] = (location.hash || '#/home').replace(/^#\/+/, '').split('?');
  const requested = path || 'home';
  let route = Object.hasOwn(pages, requested) ? requested : '404';
  app.setAttribute('aria-busy', 'true');
  let html;
  try {
    html = await loadPage(route);
  } catch {
    route = '404';
    try { html = await loadPage('404'); }
    catch { html = '<section class="container not-found"><h1>Não foi possível carregar a página.</h1><p>Verifique a conexão e tente novamente.</p><a href="#/home">Voltar para a home</a></section>'; }
  }
  // Uma navegação anterior nunca deve substituir a página mais recente.
  if (id !== requestId) return;
  app.querySelectorAll('video').forEach(video => video.pause());
  app.innerHTML = html;
  app.removeAttribute('aria-busy');
  document.title = pages[route] || 'Página não encontrada | Luiz Oliveira';
  document.querySelectorAll('.menu a').forEach(link => {
    if (link.getAttribute('href') === `#/${route}`) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  document.dispatchEvent(new CustomEvent('page:loaded', { detail: { route } }));
  app.focus({ preventScroll: true });
  const section = new URLSearchParams(query).get('secao');
  requestAnimationFrame(() => {
    if (id !== requestId) return;
    const target = section && app.querySelector(`[id="${CSS.escape(section)}"]`);
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  });
}
window.addEventListener('hashchange', router);
function start() {
  if (!location.hash || location.hash === '#') history.replaceState(null, '', '#/home');
  router();
}
if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', start, { once: true });
else start();
