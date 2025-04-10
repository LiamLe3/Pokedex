import { PageData } from './pageData.js';
import { showLoadButton, showNotFoundMessage, updateListUI } from './domUtils.js';
import { MAX_POKEMON } from '../constants.js';

setup();

// Finds the the DOMSelectors, attach event listeners, and setup the page (fetching pokemons and listing them)
export function setup() {
    const pageData = new PageData();

    const domSelectors = {
        loadButton: document.querySelector(".load-button"),
        notFoundMessage: document.querySelector("#not-found-message"),
        searchInput: document.querySelector("#search-input"),
        listWrapper: document.querySelector(".pokemon-list")
    }

    domSelectors.loadButton.addEventListener("click", () => displayNextBatch(domSelectors, pageData));
    domSelectors.searchInput.addEventListener("keyup", () => handleSearch(domSelectors, pageData));

    fetchList().then(pokemonList => {
        pageData.setPokemonList(pokemonList);
        updateListUI(domSelectors.listWrapper, pageData.visiblePokemon, pageData.multiplier);
    });
}

// Called whenever loadbutton is pressed. Displays up to the next 12 pokemons if any
export function displayNextBatch(selectors, pageData){
    pageData.incrementMultiplier();
    updateListUI(selectors.listWrapper, pageData.visiblePokemon, pageData.multiplier);
    showLoadButton(selectors.loadButton, pageData.multiplier, pageData.visiblePokemon.length);
}

// Whenever the search detects a change in input, display the new list of pokemons
export function handleSearch(selectors, pageData) {
    const searchTerm = selectors.searchInput.value.toLowerCase();
    pageData.filterList(searchTerm);

    pageData.resetMultiplier();
    selectors.listWrapper.innerHTML = "";
    updateListUI(selectors.listWrapper, pageData.visiblePokemon, pageData.multiplier);
    showLoadButton(selectors.loadButton, pageData.multiplier, pageData.visiblePokemon.length);
    showNotFoundMessage(selectors.notFoundMessage, pageData.visiblePokemon.length);
}

// Fetches all pokemons up to a given limit
export async function fetchList(limit = MAX_POKEMON) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Failed to fetch Pokemon list:", error);
    }
}