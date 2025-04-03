import { MAX_POKEMON, TYPE_CHART, STATS_NAME } from "./constants.js";

let currentPokemonId = null;
let isNavigating = false;

const prevText = document.querySelector(".prev-text");
const nextText = document.querySelector(".next-text");
const [leftArrow, rightArrow] = ["#leftArrow", "#rightArrow"].map((sel) => document.querySelector(sel));

const titleText = document.querySelector("title");
const nameText = document.querySelector(".pokemon-name");
const IdText = document.querySelector(".pokemon-id");

const pokemonImg = document.querySelector(".pokemon-img");
const statsWrapper = document.querySelector(".stats-wrapper");

const heightText = document.querySelector(".pokemon-height");
const weightText = document.querySelector(".pokemon-weight");
const abilitiesWrapper = document.querySelector(".ability-wrapper");
const typeWrapper = document.querySelector(".typing-wrap");
const weaknessWrapper = document.querySelector(".weakness-wrap");

document.addEventListener("DOMContentLoaded", () => {

    const pokemonID = new URLSearchParams(window.location.search).get("id");
    const id = parseInt(pokemonID, 10);

    navigatePage(id);
});

function navigatePage(id) {
    if (isNavigating) return; // Prevent additional clicks
    isNavigating = true;

    currentPokemonId = id;
    loadPokemon(id).finally(() => {
        isNavigating = false; // Allow new navigation after data has been loaded
    });
}

async function loadPokemon(id) {
    try {
        const [pokemon, species] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then((res) => res.json()),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                .then((res) => res.json()),
        ]);

        if(currentPokemonId === id) {
            displayNavigation(id);
            displayPage(pokemon, species);
            window.history.pushState({}, "", `./detail.html?id=${id}`);
        }
        return true;

    } catch(error) {
        console.error("Error while fetching pokemon data.", error);
        return false;
    }
}

function displayNavigation(id){
    leftArrow.removeEventListener("click", navigatePokemon);
    rightArrow.removeEventListener("click", navigatePokemon);
    
    //Pokemon at the ends wraps around to first/last pokemon
    let prevID = (id - 1) <= 0 ? MAX_POKEMON : id - 1;
    let nextID = (id + 1) > MAX_POKEMON ? 1 : id + 1;

    leftArrow.addEventListener("click", () => {
        navigatePokemon(prevID);
    });
    rightArrow.addEventListener("click", () => {
        navigatePokemon(nextID);
    });

    displayAdjacentPokemonName(prevID, nextID);
}

async function navigatePokemon(id) {
    currentPokemonId = id;
    await loadPokemon(id);
}

/* Displays the next or previous pokemon's name */
async function displayAdjacentPokemonName(prev, next) {
    try {
        const [prevPokemon, nextPokemon] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${prev}`)
                .then((res) => res.json()),
            fetch(`https://pokeapi.co/api/v2/pokemon/${next}`)
                .then((res) => res.json())
        ]);
        
        prevText.textContent = prevPokemon.name;
        nextText.textContent = nextPokemon.name;
        return true;
    } catch(error) {
        console.error("Error while fetching next/previous pokemon data.", error);
        return false;
    }
}

function displayPage(pokemon, species){
    const {name, id, types, weight, height, abilities, stats} = pokemon;

    displayTitle(name, id);

    displayImg(name, id);
    displayStats(stats);

    displayFlavorText(species);
    displayInfo(height, weight, abilities);
    displayTypes(types);
    displayWeakness(types);
}

function displayTitle(name, id) {
    const capitalisePokemonName = capitaliseName(name);
    
    titleText.textContent = capitalisePokemonName;

    nameText.textContent = capitalisePokemonName;
    IdText.textContent = `#${String(id).padStart(4, "0")}`;
}

function capitaliseName(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


/* LEFT CONTENT */
function displayImg(name, id) {
    pokemonImg.alt = name;
    pokemonImg.src = `./assets/pokeimg/${id}.png`;
}

/* Stats */
function displayStats(stats) {
    statsWrapper.innerHTML = "";

    stats.forEach(({ stat, base_stat }) => {
        const statDiv = document.createElement("div");
        statDiv.className = "stats-wrap";
        statsWrapper.appendChild(statDiv);

        makeNewElement(statDiv, "p", {
            className: "stat-name",
            textContent: STATS_NAME[stat.name],
        });
        
        makeNewElement(statDiv, "p", {
            className: "stat-value",
            textContent: String(base_stat).padStart(3, "0"),
        });

        let category = getStatCategory(base_stat);
        makeNewElement(statDiv, "progress", {
            className: `stat-bar ${category}`,
            value: base_stat,
            max: 225,
        });
    })
}

/* Depending on stat value, the color of progress bar changes */
function getStatCategory(statValue){
    if(statValue < 30) {
        return "cat1"
    } else if (statValue < 60) {
        return "cat2"
    } else if (statValue < 90) {
        return "cat3"
    } else if(statValue < 120) {
        return "cat4"
    } else if(statValue < 150) {
        return "cat5"
    }
    return "cat6"
}


/* RIGHT CONTENT */
function displayFlavorText(species) {
    for(let entry of species.flavor_text_entries) {
        if(entry.language.name === "en") {
            let flavor = entry.flavor_text.replace(/\f/g, " ");
            document.querySelector(".pokemon-description").textContent = flavor;
        }
    }
    return "";
}

function displayInfo(height, weight, abilities) {
    heightText.textContent = `${height / 10}m`;
    weightText.textContent = `${weight / 10}kg`;

    abilitiesWrapper.innerHTML = `<p class="info-titles">Ability</p>`;
    abilities.forEach(({ability}) => {
        makeNewElement(abilitiesWrapper, "p", {
            className: "pokemon-ability",
            textContent: ability.name,
        });
    });
}

/* Types & Weakness */
function displayTypes(types) {
    typeWrapper.innerHTML = "";
    types.forEach(({type}) => {
        makeNewElement(typeWrapper, "p", {
            className: `type ${type.name}`,
            textContent: type.name,
        })
    });
}

function displayWeakness(types) {
    weaknessWrapper.innerHTML = "";
    let weaknesses = [];

    //getWeakness parameters changes depending of number of types
    if(types.length == 1) {
        weaknesses = getWeaknesses(types[0].type.name);
    } else {
        weaknesses = getWeaknesses(types[0].type.name, types[1].type.name);
    }
    
    weaknesses.forEach((weakness) => {
        makeNewElement(weaknessWrapper, "p", {
            className: `weakness ${weakness}`,
            textContent: weakness,
        })
    })
}

function getWeaknesses(type1, type2 = null) {
    if(!type2) return TYPE_CHART[type1].weakTo;

    let weakness = new Set([
        ...TYPE_CHART[type1].weakTo,
        ...TYPE_CHART[type2].weakTo
    ]);

    let resist = new Set([
        ...TYPE_CHART[type1].resistantTo,
        ...TYPE_CHART[type2].resistantTo,
    ])

    resist.forEach(resistance => {
        weakness.delete(resistance);
    })

    return Array.from(weakness);
}

/* Helper functions */
/* Creates a tag within the given parent element. Will also add any given attributes */
function makeNewElement(parent, tag, options = {}) {
    const element = document.createElement(tag);
    Object.keys(options).forEach((key) => {
        element[key] = options[key];
    });
    parent.appendChild(element);
    return element;
}