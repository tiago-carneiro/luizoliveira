const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
function closeMenu() {
  menu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Abrir menu');
}
hamburger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); hamburger.focus(); }
});
menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();
let observer;
function initPage() {
  closeMenu();
  observer?.disconnect();
  const elements = document.querySelectorAll('#app .reveal');
  if (!('IntersectionObserver' in window)) { elements.forEach(el => el.classList.add('show')); return; }
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('show'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  elements.forEach(el => observer.observe(el));
}
document.addEventListener('page:loaded', initPage);
// O link de acessibilidade não é uma rota.
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault(); document.getElementById('app').focus();
});
