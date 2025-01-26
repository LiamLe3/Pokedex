let currentPokemonId = null;
const MAX_POKEMONS = 151;

const typeChart = {
    "normal" : {weakTo: ["fighting"], resistantTo: [], immuneTo: ["ghost"]},
    "fire" : {weakTo: ["water", "ground", "rock"], resistantTo: ["fire", "grass", "ice", "bug", "steel", "fairy"], immuneTo: []},
    "water" : {weakTo: ["electric", "grass"], resistantTo: ["fire", "water", "ice", "steel"], immuneTo: []},
    "electric" : {weakTo: ["ground"], resistantTo: ["electric", "flying", "steel"], immuneTo: []},
    "grass" : {weakTo: ["fire", "ice", "poison", "flying", "bug"], resistantTo: ["water", "electric", "grass", "ground"], immuneTo: []},
    "ice" : {weakTo: ["fire", "fighting", "rock", "steel"], resistantTo: ["ice"], immuneTo: []},
    "fighting" : {weakTo: ["flying", "psychic", "fairy"], resistantTo: ["bug", "rock", "dark"], immuneTo: []},
    "poison" : {weakTo: ["ground", "psychic"], resistantTo: ["grass", "fighting", "poison", "bug", "fairy"], immuneTo: []},
    "ground" : {weakTo: ["water", "grass", "ice"], resistantTo: ["poison", "rock"], immuneTo: ["electric"]},
    "flying" : {weakTo: ["electric", "ice", "rock"], resistantTo: ["grass", "fighting", "bug"], immuneTo: ["ground"]},
    "psychic" : {weakTo: ["bug", "ghost", "dark"], resistantTo: ["fighting", "psychic"], immuneTo: []},
    "bug" : {weakTo: ["fire", "flying", "rock"], resistantTo: ["grass", "fighting", "ground"], immuneTo: []},
    "rock" : {weakTo: ["water", "grass", "fighting", "ground", "steel"], resistantTo: ["normal", "fire", "poison", "flying"], immuneTo: []},
    "ghost" : {weakTo: ["ghost", "dark"], resistantTo: ["poison", "bug"], immuneTo: ["normal", "fighting"]},
    "dragon" : {weakTo: ["ice", "dragon", "fairy"], resistantTo: ["fire", "water", "electric", "grass"], immuneTo: []},
    "dark" : {weakTo: ["fighting", "bug", "fairy"], resistantTo: ["ghost", "dark"], immuneTo: ["psychic"]},
    "steel" : {weakTo: ["fire", "fighting", "ground"], resistantTo: ["normal", "grass", "ice", "flying", "psychic", "bug", "rock", "dragon", "steel", "fairy"], immuneTo: ["ground"]},
    "fairy" : {weakTo: ["poison", "steel"], resistantTo: ["fighting", "bug", "dark"], immuneTo: ["dragon"]},
}

document.addEventListener("DOMContentLoaded", () => {

    const pokemonID = new URLSearchParams(window.location.search).get("id");
    const id = parseInt(pokemonID, 10);

    currentPokemonId = id;
    loadPokemon(id);
});

async function loadPokemon(id) {
    try {
        const [pokemon, species] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then((res) => res.json()),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                .then((res) => res.json()),
        ]);

        const abilityWrapper = document.querySelector(".ability-wrapper");
        abilityWrapper.innerHTML = `<p class="info-titles">Ability</p>`;

        if(currentPokemonId === id) {
            displayDetails(pokemon);
            const flavorText = getEnglishFlavorText(species);
            document.querySelector(".pokemon-description").textContent = flavorText;

            const [leftArrow, rightArrow] = ["#leftArrow", "#rightArrow"].map((sel) => document.querySelector(sel));
            leftArrow.removeEventListener("click", navigatePokemon);
            rightArrow.removeEventListener("click", navigatePokemon);

            //Pokemon at the ends wraps around to first/last pokemon
            previousPokemon = (id + MAX_POKEMONS - 2) % MAX_POKEMONS + 1
            nextPokemon = (id % MAX_POKEMONS) + 1

            leftArrow.addEventListener("click", () => {
                navigatePokemon(previousPokemon);
            });
            rightArrow.addEventListener("click", () => {
                navigatePokemon(nextPokemon);
            });

            displayNextPokemonName(previousPokemon, ".previous-text")
            displayNextPokemonName(nextPokemon, ".next-text")

            window.history.pushState({}, "", `./detail.html?id=${id}`);
        }

        return true;
    } catch(error) {
        console.error("Error while fetching pokemon data.", error);
        return false;
    }
}

function displayDetails(pokemon){
    const {name, id, types, weight, height, abilities, stats} = pokemon;

    const capitalisePokemonName = capitaliseName(name);
    
    document.querySelector("title").textContent = capitalisePokemonName;

    document.querySelector(".pokemon-name").textContent = capitalisePokemonName;
    document.querySelector(".pokemon-id").textContent = `#${String(id).padStart(4, "0")}`;

    const imageElement = document.querySelector(".pokemon-img-wrapper img");
    imageElement.src = `./assets/pokeimg/${id}.png`;
    imageElement.alt = name;
    
    document.querySelector(".pokemon-height").textContent = `${height / 10}m`;
    document.querySelector(".pokemon-weight").textContent = `${weight / 10}kg`;

    const typeWrapper = document.querySelector(".typing-wrap");
    typeWrapper.innerHTML = "";
    types.forEach(({type}) => {
        createAndAppendElement(typeWrapper, "p", {
            className: `type ${type.name}`,
            textContent: type.name,
        })
    });

    const weaknessWrapper = document.querySelector(".weakness-wrap");
    weaknessWrapper.innerHTML = "";
    weaknesses = [];

    //getWeakness parameters changes depending of number of types
    if(types.length == 1) {
        weaknesses = getWeaknesses(types[0].type.name);
    } else {
        weaknesses = getWeaknesses(types[0].type.name, types[1].type.name);
    }
    
    weaknesses.forEach((weakness) => {
        createAndAppendElement(weaknessWrapper, "p", {
            className: `weakness ${weakness}`,
            textContent: weakness,
        })
    })

    const abilitiesWrapper = document.querySelector(".ability-wrapper");
    abilities.forEach(({ability}) => {
        createAndAppendElement(abilitiesWrapper, "p", {
            className: "pokemon-ability",
            textContent: ability.name,
        });
    });

    const statsWrapper = document.querySelector(".stats-wrapper");
    statsWrapper.innerHTML = "";

    const statNameMapping = {
        hp: "HP",
        attack: "Atk",
        defense: "Def",
        "special-attack": "Sp.Atk",
        "special-defense": "Sp.Def",
        speed: "Spd",
    };

    stats.forEach(({ stat, base_stat }) => {
        const statDiv = document.createElement("div");
        statDiv.className = "stats-wrap";
        statsWrapper.appendChild(statDiv);

        createAndAppendElement(statDiv, "p", {
            className: "stat-name",
            textContent: statNameMapping[stat.name],
        });
        
        createAndAppendElement(statDiv, "p", {
            className: "stat-value",
            textContent: String(base_stat).padStart(3, "0"),
        });

        category = getStatCategory(base_stat);
        createAndAppendElement(statDiv, "progress", {
            className: `stat-bar ${category}`,
            value: base_stat,
            max: 225,
        });
    })
}

function capitaliseName(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/* Creates a tag within the given parent element. Will also add any given attributes */
function createAndAppendElement(parent, tag, options = {}) {
    const element = document.createElement(tag);
    Object.keys(options).forEach((key) => {
        element[key] = options[key];
    });
    parent.appendChild(element);
    return element;
}

function getWeaknesses(type1, type2 = null) {
    const weaknesses = new Set();
    const resistances = new Set();
    const immunities = new Set();

    if (typeChart[type1]) {
        typeChart[type1].weakTo.forEach((type) => weaknesses.add(type));
        typeChart[type1].resistantTo.forEach((type) => resistances.add(type));
        typeChart[type1].immuneTo.forEach((type) => immunities.add(type));
    }
    
    if (type2 && typeChart[type2]) {
        typeChart[type2].weakTo.forEach((type) => weaknesses.add(type));
        typeChart[type2].resistantTo.forEach((type) => resistances.add(type));
        typeChart[type2].immuneTo.forEach((type) => immunities.add(type));
    }
    
    const effectiveTypes = Array.from(weaknesses).filter( //Filters out non-effective types
        (type) => !resistances.has(type) && !immunities.has(type)
    );
    
    return effectiveTypes;
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

function getEnglishFlavorText(species) {
    for(let entry of species.flavor_text_entries) {
        if(entry.language.name === "en") {
            let flavor = entry.flavor_text.replace(/\f/g, " ");
            return flavor;
        }
    }
    return "";
}

async function navigatePokemon(id) {
    currentPokemonId = id;
    await loadPokemon(id);
}

/* Displays the next or previous pokemon's name */
async function displayNextPokemonName(id, tag) {
    try {
        const [pokemon] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then((res) => res.json()),
        ]);
        
        document.querySelector(tag).textContent = pokemon.name;
        return true;
    } catch(error) {
        console.error("Error while fetching next/previous pokemon data.", error);
        return false;
    }
}