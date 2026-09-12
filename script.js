const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

$('.theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('flora-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
if(localStorage.getItem('flora-theme') === 'dark') document.body.classList.add('dark');

const exploreButton = $('.nav-more');
const exploreMenu = $('.more-menu');

exploreButton.addEventListener('click', e => {
  e.stopPropagation();

  const isOpen = exploreMenu.classList.toggle('open');
  exploreButton.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', e => {
  if (!exploreMenu.contains(e.target) && !exploreButton.contains(e.target)) {
    exploreMenu.classList.remove('open');
    exploreButton.setAttribute('aria-expanded', 'false');
  }
});
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

const experimentalPlants = [
  {
    scientificName: "Ficus benjamina",
    commonName: "Weeping fig",
    keywords: [
  "ficus",
  "ficus benjamina",
  "weeping fig",
  "benjamin fig",
  "benjamin tree",
  "variegated ficus",
  "variegated weeping fig",
  "variegata",
  "indoor",
  "houseplant",
  "physiology",
  "stress",
  "recovery",
  "experiment"
],
    information:
      "An indoor physiological experiment observing how a variegated Ficus benjamina responds to stress, recovery, and changing care conditions.",
    context: "Experimental plant · Indoor cultivation"
  },
  {
    scientificName: "Vitex trifolia",
    commonName: "Simpleleaf chastetree",
    keywords: [
  "vitex",
  "vitex trifolia",
  "simpleleaf chastetree",
  "simple leaf chastetree",
  "chastetree",
  "chaste tree",
  "three-leaved chaste tree",
  "lagundi",
  "cultivated",
  "garden plant",
  "resilience",
  "growth",
  "experiment"
],
    information:
      "An experimental plant being observed for its growth, resilience, and response to cultivation conditions over time.",
    context: "Experimental plant · Cultivated observation"
  },
  {
    scientificName: "Schefflera arboricola",
    commonName: "Dwarf umbrella tree",
    keywords: ["schefflera", "umbrella tree", "dwarf umbrella", "indoor", "houseplant", "Umbrella tree", "Umbrella Tree", "Dwarf umbrella", "Houseplant", "Indoor"],
    information:
      "An indoor experimental plant being monitored for leaf growth, light response, and general condition.",
    context: "Experimental plant · Indoor cultivation"
  }
];

const homePlantSearch = document.getElementById("speciesInput");
const homePlantSearchButton = document.getElementById("speciesSearch");
const archivePlantSearch = document.getElementById("globalSearch");
const archivePlantResults = document.getElementById("searchResults");
const clearArchiveSearch = document.getElementById("clearArchiveSearch");

function showPlantResults() {
  const searchTerm = archivePlantSearch.value.trim().toLowerCase();

  clearArchiveSearch.disabled = searchTerm === "";

  if (searchTerm === "") {
    archivePlantResults.innerHTML =
      "<p>Search the experimental plant archive by common or scientific name.</p>";
    return;
  }

  const matches = experimentalPlants.filter((plant) => {
    const searchableText = [
      plant.scientificName,
      plant.commonName,
      ...plant.keywords
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(searchTerm);
  });

  if (matches.length === 0) {
    archivePlantResults.innerHTML =
      "<p>No documented experimental plant matches that search yet.</p>";
    return;
  }

  archivePlantResults.innerHTML = matches
    .map(
      (plant) => `
        <article class="species-result">
          <p class="meta">${plant.context}</p>
          <h3><em>${plant.scientificName}</em></h3>
          <p class="common-name">${plant.commonName}</p>
          <p>${plant.information}</p>
        </article>
      `
    )
    .join("");
}

function openArchiveSearchFromPlantBox() {
  document.querySelector(".search-open").click();
  archivePlantSearch.value = homePlantSearch.value;
  showPlantResults();

  setTimeout(() => archivePlantSearch.focus(), 0);
}

homePlantSearchButton.addEventListener("click", openArchiveSearchFromPlantBox);

homePlantSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    openArchiveSearchFromPlantBox();
  }
});

archivePlantSearch.addEventListener("input", showPlantResults);

clearArchiveSearch.addEventListener("click", () => {
  archivePlantSearch.value = "";
  showPlantResults();
  archivePlantSearch.focus();
});

showPlantResults();

/* =========================
   CURRENT FOCUS HISTORY
   ========================= */

const focusHistoryButton = document.querySelector('.focus-history-button');
const focusHistoryMenu = document.querySelector('.focus-history-menu');
const focusHistoryResult = document.querySelector('.focus-history-result');

const focusHistory = {
  week: {
    label: 'ONE WEEK AGO TO NOW',
    text: 'Research packets on suicide education.'
  },

  fortnight: {
    label: 'ONE FORTNIGHT AGO',
    text: 'College research and heavy Flora Archive refinement.'
  },

  month: {
    label: 'ONE MONTH AGO',
    text: 'Expanding Inaturalist observations by nearly 100%.'
  },

  'three-months': {
    label: 'THREE MONTHS AGO',
    text: 'Finishing the structure of Flora Archive.'
  }
};

if (focusHistoryButton && focusHistoryMenu && focusHistoryResult) {

  focusHistoryButton.addEventListener('click', function(event){
    event.stopPropagation();

    const isOpen =
      focusHistoryButton.getAttribute('aria-expanded') === 'true';

    focusHistoryButton.setAttribute(
      'aria-expanded',
      String(!isOpen)
    );

    focusHistoryMenu.classList.toggle('open', !isOpen);

    focusHistoryMenu.setAttribute(
      'aria-hidden',
      String(isOpen)
    );
  });


  focusHistoryMenu.addEventListener('click', function(event){

    const selected = event.target.closest('[data-focus-period]');

    if (!selected) return;

    const period = selected.dataset.focusPeriod;
    const focus = focusHistory[period];

    if (!focus) return;

    focusHistoryResult.innerHTML = `
      <span class="meta">${focus.label}</span>
      <p>${focus.text}</p>
    `;

    focusHistoryResult.classList.add('visible');

    focusHistoryButton.setAttribute('aria-expanded', 'false');
    focusHistoryMenu.classList.remove('open');
    focusHistoryMenu.setAttribute('aria-hidden', 'true');

  });


  document.addEventListener('click', function(event){

    if (!event.target.closest('.focus-history')) {

      focusHistoryButton.setAttribute('aria-expanded', 'false');
      focusHistoryMenu.classList.remove('open');
      focusHistoryMenu.setAttribute('aria-hidden', 'true');

    }

  });

}
