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
      "One of the most dramatic and fussy plants behaves in an oddly resiliant form in my possession.",
    context:
      "Used-and-Abused plant · Get a 4 in 1 deal . Data wipe plant"
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
      "Popular outdoor plants in my area. Most variegated varieties of Vitex lose variegation due tu heat.",
    context:
      "Variegated varieties are variegation-less · Resilient yet pathetic somehow . I like it but when wanting to be fair, it gets mogged by Vitex agnus-castus"
  },

  {
    scientificName: "Heptapleurum arboricola",
    commonName: "Dwarf umbrella tree",
    keywords: [
      "heptapleurum",
      "heptapleurum arboricola",
      "schefflera",
      "schefflera arboricola",
      "umbrella tree",
      "dwarf umbrella",
      "indoor",
      "houseplant"
    ],
    information:
      "My biggest indoor plant. Currently trying to fix it from its leaning structure.",
    context:
      "Indoor plant · Leaning Tower of Pisa . In need of pruning"
  }
];




const speciesInput = document.getElementById("speciesInput");
const speciesSearchButton = document.getElementById("speciesSearch");
const speciesResults = document.getElementById("searchResults");




function showPlantResults() {

  if (!speciesInput || !speciesResults) return;

  const searchTerm = speciesInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    speciesResults.innerHTML =
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

    speciesResults.innerHTML =
      "<p>No documented experimental plant matches that search yet.</p>";

    return;
  }


  speciesResults.innerHTML = matches
    .map(
      (plant) => `
        <article class="species-result">

          <p class="meta">${plant.context}</p>

          <h3>
            <em>${plant.scientificName}</em>
          </h3>

          <p class="common-name">
            ${plant.commonName}
          </p>

          <p>
            ${plant.information}
          </p>

        </article>
      `
    )
    .join("");
}




if (speciesSearchButton && speciesInput) {

  speciesSearchButton.addEventListener("click", showPlantResults);

  speciesInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
      showPlantResults();
    }

  });

}




const lightbox = document.getElementById("lightbox");

if (lightbox) {

  $$(".gallery-grid img").forEach((img) => {

    img.addEventListener("click", () => {

      const lightboxImage = $("img", lightbox);

      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;

      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");

    });

  });


  const lightboxClose = $(".modal-close", lightbox);

  if (lightboxClose) {

    lightboxClose.addEventListener("click", () => {

      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");

    });

  }


  lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");

    }

  });

}




const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
