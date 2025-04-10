import { MAX_POKEMON } from "../constants.js";
import { displayTitle } from "./title.js";
import { displayImg, displayStats } from './leftContent.js';
import { displayFlavorText, displayInfo } from "./rightInfo.js";
import { displayTypes, displayWeakness } from "./types.js";

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

export function getPrevId(currentId) {
    return (currentId - 1) <= 0 ? MAX_POKEMON : currentId - 1;
}

export function getNextId(currentId) {
    return (currentId + 1) > MAX_POKEMON ? 1 : currentId + 1;
}

export async function navigatePage(id, dom) {
    const {pokemon, species} = await fetchPokemonData(id);

    displayNavigation(getPrevId(id), getNextId(id), dom);
    displayPage(pokemon, species, dom);
    window.history.pushState({}, "", `./detail.html?id=${id}`);
}

export async function fetchPokemonData(id) {
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

export function displayNavigation(prevID, nextID, dom){
    const { prevText, nextText } = dom.nav;    

    displayAdjacentPokemonName(prevID, nextID)
        .then(({prevPokemon, nextPokemon}) => {
            prevText.textContent = prevPokemon.name;
            nextText.textContent = nextPokemon.name;
    })
}

export async function displayAdjacentPokemonName(prev, next) {
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

function displayPage(pokemon, species, dom){
    const {name, id, types, weight, height, abilities, stats} = pokemon;

    displayTitle(name, id, dom);

    displayImg(name, id, dom.left.pokemonImg);
    displayStats(stats, dom.left.statsWrapper);

    displayFlavorText(species, dom.right.descriptionText);
    displayInfo(height, weight, abilities, dom);
    displayTypes(types, dom.right.typeWrapper);
    displayWeakness(types, dom.right.weaknessWrapper);
}