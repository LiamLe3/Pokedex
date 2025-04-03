import { MAX_POKEMON, BATCH } from "./constants.js";

const searchInput = document.querySelector("#search-input");
const listWrapper = document.querySelector(".pokemon-list");
const notFoundMessage = document.querySelector("#not-found-message");
const loadButton = document.querySelector(".load-button");
notFoundMessage.style.display = "none";

searchInput.addEventListener("keyup", handleSearch);
loadButton.addEventListener("click", displayNextBatch);

let pokemonList = [];
let filteredList = [];
let factor = 1;

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
    .then((response) => response.json())
    .then((data) => {
        pokemonList = data.results;
        filteredList = pokemonList;
        displayPokemons();
        displayLoadButton();
    });

function displayPokemons() {
    for (let index=(factor - 1)*BATCH; index < factor*BATCH; index++){
        if(index >= filteredList.length) return;

        const { pokemonID, listItem } = createPokemonElement(index);
        displayTyping(pokemonID, listItem);

        listItem.addEventListener("click", async () => {
            const success = await fetchPokemonData(pokemonID);
            if (success) {
                window.location.href = `./detail.html?id=${pokemonID}`;
            }
        });

        listWrapper.appendChild(listItem);
    }
}

function createPokemonElement(index){
    const pokemon = filteredList[index];
    const pokemonID = pokemon.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
        <div class=pokemon-wrap>
        <div class="img-wrap">
            <img src="./assets/pokeimg/${pokemonID}.png" alt="${pokemon.name}" />
        </div>
        <div class="name-id-wrapper">
            <p class="pokemon-name-font">${pokemon.name}</p>
            <p class="pokemonID-font">#${String(pokemonID).padStart(4, "0")}</p>
        </div>
    `;

    return {
        pokemonID,
        listItem
    };

}

async function displayTyping(id, parent) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await response.json();

        const typeItem = document.createElement("div");
        typeItem.className = "type-wrap";

        pokemon.types.forEach(({type}) => {
            createAndAppendElement(typeItem, "p", {
                className: `list-type ${type.name}`,
                textContent: type.name,
            })
        });

        parent.appendChild(typeItem);
        return true;
    } catch (error) {
        console.error("Failed to fetch Pokemon data before redirect");
    }
}

/* Used to ensure pokemon exists before redirecting to its details page */
async function fetchPokemonData(id) {
    try {
        const [pokemon, species] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => res.json()),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            .then((res) => res.json()),
        ]);
        return true;
    } catch (error) {
        console.error("Failed to fetch Pokemon data before redirect");
    }
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


/* SEARCH */

function handleSearch() {
    filterList();
    factor = 1;
    listWrapper.innerHTML = "";
    displayPokemons();

    displayLoadButton();
    displayNotFoundMessage();
}

function filterList() {
    const searchTerm = searchInput.value.toLowerCase();

    if (!isNaN(Number(searchTerm))) { //Filter by number
        filteredList = pokemonList.filter((pokemon) => {
            const pokemonID = pokemon.url.split("/")[6];
            return pokemonID.startsWith(searchTerm);
        });
    } else if (searchTerm != "") { //Filter by name
        filteredList = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(searchTerm)
        );
    } else { //No filter
        filteredList = pokemonList;
    }
}

function displayNotFoundMessage() {
    if (filteredList.length === 0) {
        notFoundMessage.style.display = "block";
    } else {
        notFoundMessage.style.display = "none";
    }
}

/* LOAD */

function displayLoadButton() {
    if(factor*BATCH < filteredList.length){
        loadButton.style.display = "block";
    }
    else {
        loadButton.style.display = "none";
    }
}

function displayNextBatch(){
    factor += 1;
    displayPokemons();
    displayLoadButton();
}