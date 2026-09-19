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

$('.modal-close', modal).addEventListener('click', () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); });
const archive = [
  ['Desert lavender', 'Species Archive · Native Plants'], ['Pollinator activity in Salvia officinalis', 'Field Journal · Pollination'], ['Life at the edge of water', 'Projects · Ecology'], ['Seed dispersal along the dry wadi', 'Field Journal · Desert']
];
$('#globalSearch').addEventListener('input', e => { const q=e.target.value.toLowerCase().trim(); $('#searchResults').innerHTML = q ? archive.filter(x=>x.join(' ').toLowerCase().includes(q)).map(x=>`<a href="#journal"><strong>${x[0]}</strong><span>${x[1]}</span></a>`).join('') || '<p>No records found yet. Try a broader search.</p>' : '<p>Search across observations, species, research notes, projects, and resources.</p>'; });
$('#speciesSearch').addEventListener('click', () => { const q=$('#speciesInput').value.trim(); if(q){openSearch(); $('#globalSearch').value=q; $('#globalSearch').dispatchEvent(new Event('input'));} });
$('#speciesInput').addEventListener('keydown', e => {if(e.key==='Enter') $('#speciesSearch').click();});

const lightbox=$('#lightbox'); $$('.gallery-grid img').forEach(img=>img.addEventListener('click',()=>{ $('img',lightbox).src=img.src; $('img',lightbox).alt=img.alt; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false');})); $('.modal-close',lightbox).addEventListener('click',()=>lightbox.classList.remove('open'));
$('#year').textContent=new Date().getFullYear();
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

