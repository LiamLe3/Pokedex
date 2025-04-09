import { BATCH } from "../constants.js";
import { fetchPokemonData } from "./api.js";

export function showLoadButton(loadButton, multiplier, listLength) {
    loadButton.style.display = multiplier * BATCH < listLength ? "block" : "none";
}

export function showNotFoundMessage(notFoundMessage, listLength) {
    notFoundMessage.style.display = listLength === 0 ? "block" : "none";
}

export function updateListUI(listWrapper, visiblePokemon, multiplier) {
    for (let index = (multiplier - 1)*BATCH; index < multiplier*BATCH; index++){
        if(index >= visiblePokemon.length) return;

        const pokemon = visiblePokemon[index];
        const { pokemonID, listItem } = createPokemonElement(pokemon);
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

export function createPokemonElement(pokemon){
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

export async function displayTyping(id, parent) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await response.json();

        const typeItem = document.createElement("div");
        typeItem.className = "type-wrap";

        pokemon.types.forEach(({type}) => {
            const typing = document.createElement("p");
            typing.className = `list-type ${type.name}`;
            typing.textContent = type.name;
    
            typeItem.append(typing);
        });

        parent.appendChild(typeItem);
        return true;
    } catch (error) {
        console.error("Failed to fetch Pokemon data before redirect");
    }
}