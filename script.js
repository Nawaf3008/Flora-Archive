const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

$('.theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('flora-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
if(localStorage.getItem('flora-theme') === 'dark') document.body.classList.add('dark');

$('.nav-more').addEventListener('click', e => { $('.more-menu').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', $('.more-menu').classList.contains('open')); });
$('.menu-btn').addEventListener('click', () => $('.nav-links').classList.toggle('mobile'));

const modal = $('#searchModal');
const openSearch = () => { modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); $('#globalSearch').focus(); };
$('.search-open').addEventListener('click', openSearch);
$('.modal-close', modal).addEventListener('click', () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); });
const archive = [
  ['Desert lavender', 'Species Archive · Native Plants'], ['Pollinator activity in Salvia officinalis', 'Field Journal · Pollination'], ['What does heat feel like to a leaf?', 'Research Notes · Plant Physiology'], ['Life at the edge of water', 'Projects · Ecology'], ['Seed dispersal along the dry wadi', 'Field Journal · Desert']
];
$('#globalSearch').addEventListener('input', e => { const q=e.target.value.toLowerCase().trim(); $('#searchResults').innerHTML = q ? archive.filter(x=>x.join(' ').toLowerCase().includes(q)).map(x=>`<a href="#journal"><strong>${x[0]}</strong><span>${x[1]}</span></a>`).join('') || '<p>No records found yet. Try a broader search.</p>' : '<p>Search across observations, species, research notes, projects, and resources.</p>'; });
$('#speciesSearch').addEventListener('click', () => { const q=$('#speciesInput').value.trim(); if(q){openSearch(); $('#globalSearch').value=q; $('#globalSearch').dispatchEvent(new Event('input'));} });
$('#speciesInput').addEventListener('keydown', e => {if(e.key==='Enter') $('#speciesSearch').click();});

const lightbox=$('#lightbox'); $$('.gallery-grid img').forEach(img=>img.addEventListener('click',()=>{ $('img',lightbox).src=img.src; $('img',lightbox).alt=img.alt; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false');})); $('.modal-close',lightbox).addEventListener('click',()=>lightbox.classList.remove('open'));
$('#newsletterForm').addEventListener('submit',e=>{e.preventDefault(); $('#formNote').textContent=`Thank you — field notes will be sent to ${$('#email').value}.`; e.target.reset();});
$('#year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){const num=e.target;const target=+num.dataset.count;let n=0;const step=Math.max(1,Math.ceil(target/42));const run=()=>{n=Math.min(target,n+step);num.textContent=n.toLocaleString();if(n<target)requestAnimationFrame(run)};run();observer.unobserve(num)}}),{threshold:.45});$$('[data-count]').forEach(n=>observer.observe(n));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$$('.search-modal,.lightbox').forEach(x=>x.classList.remove('open'));}});
