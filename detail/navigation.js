import { MAX_POKEMON } from "../constants.js";
import { displayTitle } from "./title.js";
import { displayImg, displayStats } from './leftContent.js';
import { displayFlavorText, displayInfo } from "./rightInfo.js";
import { displayTypes, displayWeakness } from "./types.js";

// Sets up the event listeners for the navigation to the previous and next pokemon
export function navigationSetup(currentId, dom) {
    const { leftArrow, rightArrow } = dom.nav;
    leftArrow.addEventListener("click", () => {
        currentId = getPrevId(currentId);
        navigatePage(currentId, dom);
    });

    rightArrow.addEventListener("click", () => {
        currentId = getNextId(currentId);
        navigatePage(currentId, dom);
    });
}

// Gets the previous pokemon ID, wraps to last pokemon is the current pokemon is the first pokemon
export function getPrevId(currentId) {
    return (currentId - 1) <= 0 ? MAX_POKEMON : currentId - 1;
}

// Gets the next pokemon ID, wraps to first pokemon is the current pokemon is the last pokemon
export function getNextId(currentId) {
    return (currentId + 1) > MAX_POKEMON ? 1 : currentId + 1;
}

// navigates to the prev/next pokemon by updating the navigation bar and page
export async function navigatePage(id, dom) {
    const {pokemon, species} = await fetchPokemonData(id);

    displayNavigation(getPrevId(id), getNextId(id), dom);
    displayPage(pokemon, species, dom);
    updateURL(id);
}

// Same page redirect but with a new url (updated id)
export function updateURL(id) {
    window.history.pushState({}, "", `./detail.html?id=${id}`);
}

// fetches for the pokemon's details
async function fetchPokemonData(id) {
    try {
        const [pokemon, species] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then((res) => res.json()),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                .then((res) => res.json()),
        ]);
        return { pokemon, species };

    } catch(error) {
        console.error("Error while fetching pokemon data.", error);
        return false;
    }
}

// When called updates the prev/next pokemon name in the navigation
export async function displayNavigation(prevID, nextID, dom){
    const { prevText, nextText } = dom.nav;    

    await displayAdjacentPokemonName(prevID, nextID)
            .then(({prevPokemon, nextPokemon}) => {
                prevText.textContent = prevPokemon.name;
                nextText.textContent = nextPokemon.name;
            });
}

// fetches for the prev/next pokemon
async function displayAdjacentPokemonName(prev, next) {
    try {
        const [prevPokemon, nextPokemon] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${prev}`)
                .then((res) => res.json()),
            fetch(`https://pokeapi.co/api/v2/pokemon/${next}`)
                .then((res) => res.json())
        ]);
        
        return {
            prevPokemon,
            nextPokemon
        };
    } catch(error) {
        console.error("Error while fetching next/previous pokemon data.", error);
        return false;
    }
}

// Displays the pokemon's page, which includes the title, image, stats, and details
function displayPage(pokemon, species, dom){
    const {name, id, types, weight, height, abilities, stats} = pokemon;

    displayTitle(name, id, dom);

    displayImg(name, id, dom.left.pokemonImg);
    displayStats(stats, dom.left.statsWrapper);

    displayFlavorText(species, dom.right.descriptionText);
    displayInfo(height, weight, abilities, dom);
    displayTypes(types, dom.right.typingWrap);
    displayWeakness(types, dom.right.weaknessWrap);
}