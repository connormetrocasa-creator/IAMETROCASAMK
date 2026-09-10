'use strict';
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const elements = document.querySelectorAll('.reveal');
if (!reduced.matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  elements.forEach(element => observer.observe(element));
}
const bar = document.querySelector('.progress-line');
const header = document.querySelector('.header');
const stage = document.querySelector('.award-stage');
const scene = document.querySelector('.award-scene');
const ribbon = document.querySelector('.campaign-ribbon');
const statement = document.querySelector('.scroll-text');
// Split only text nodes, preserving the semantic heading and highlighted phrase.
if (!reduced.matches) {
  const walker = document.createTreeWalker(statement, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const fragment = document.createDocumentFragment();
    for (const part of node.textContent.split(/(\s+)/)) {
      if (!part.trim()) fragment.append(document.createTextNode(part));
      else { const span = document.createElement('span'); span.className = 'word'; span.textContent = part; fragment.append(span); }
    }
    node.replaceWith(fragment);
  }
}
const words = [...statement.querySelectorAll('.word')];
const clamp = value => Math.max(0, Math.min(1, value));
let pending = false;
function onScroll() {
  const range = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${range > 0 ? clamp(scrollY / range) : 0})`;
  header.classList.toggle('compact', scrollY > 100);
  if (!reduced.matches) {
    const stageRect = stage.getBoundingClientRect();
    if (stageRect.top < innerHeight && stageRect.bottom > 0) {
      const p = clamp(-stageRect.top / Math.max(1, stage.offsetHeight - innerHeight));
      scene.style.setProperty('--scene-drift', `${-p * 95}px`);
      scene.style.setProperty('--scene-title', `${(1 - p) * 28}px`);
    }
    const rect = statement.getBoundingClientRect();
    const progress = clamp((innerHeight * .86 - rect.top) / (innerHeight * .6));
    words.forEach((word, index) => word.classList.toggle('lit', index < Math.ceil(progress * words.length)));
    const ribbonRect = ribbon.getBoundingClientRect();
    if (ribbonRect.top < innerHeight && ribbonRect.bottom > 0) ribbon.style.setProperty('--ribbon-x', `${-(innerHeight - ribbonRect.top) * .12}px`);
  } else words.forEach(word => word.classList.add('lit'));
  pending = false;
}
addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(onScroll); } }, { passive: true });
addEventListener('resize', onScroll);
reduced.addEventListener('change', () => { if (reduced.matches) document.documentElement.classList.remove('motion'); onScroll(); });
onScroll();
let noticeTimeout;
function notify(message) {
  const notice = document.getElementById('notice');
  notice.textContent = message;
  notice.classList.add('visible');
  clearTimeout(noticeTimeout);
  noticeTimeout = setTimeout(() => notice.classList.remove('visible'), 5500);
}
const materials = {
  image: { url: 'assets/stories-metrocasa.jpg', name: 'stories-metrocasa.jpg', mime: 'image/jpeg' },
  video: { url: 'assets/video-felix.mp4', name: 'video-felix.mp4', mime: 'video/mp4' }
};
document.querySelectorAll('[data-share]').forEach(button => button.addEventListener('click', async () => {
  const material = materials[button.dataset.share];
  if (!navigator.share || !navigator.canShare || !window.isSecureContext) {
    notify('Use Baixar e envie o arquivo pelo aplicativo da sua rede social.'); return;
  }
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch(material.url);
    if (!response.ok) throw new Error('Asset unavailable');
    const file = new File([await response.blob()], material.name, { type: material.mime });
    if (!navigator.canShare({ files: [file] })) { notify('Este navegador não compartilha arquivos. Use o botão Baixar.'); return; }
    await navigator.share({ files: [file], title: 'Metrocasa · Prêmio Reclame Aqui 2026' });
  } catch (error) {
    if (error.name !== 'AbortError') notify('Não foi possível compartilhar. Use Baixar e envie pelo aplicativo.');
  } finally { button.disabled = false; button.removeAttribute('aria-busy'); }
}));
const video = document.getElementById('video-felix');
if ('IntersectionObserver' in window) new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) video.pause(); }), { threshold: .05 }).observe(video);
document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); });
