const MAX_POKEMON = 151; //If you change this change this  value on pokemon-detail.js
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const notFoundMessage = document.querySelector("#not-found-message");

let pokemonList = [];

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
    .then((response) => response.json())
    .then((data) => {
        pokemonList = data.results;
        displayPokemons(pokemonList);
    });

notFoundMessage.style.display = "none";
searchInput.addEventListener("keyup", handleSearch);

function displayPokemons(pokemon) {
    listWrapper.innerHTML = "";
    pokemon.forEach((pokemon) => {
        const pokemonID = pokemon.url.split("/")[6]; //Get pokemon ID
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
            `
        ;

        displayPokemonTyping(pokemonID, listItem);

        listItem.addEventListener("click", async () => {
            const success = await fetchPokemonData(pokemonID);
            if (success) {
                window.location.href = `./detail.html?id=${pokemonID}`;
            }
        });

        listWrapper.appendChild(listItem);
    });
}

async function displayPokemonTyping(id, parent) {
    try {
        const [pokemon] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => res.json()),
        ]);

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

/* Creates a tag within the given parent element. Will also add any given attributes */
function createAndAppendElement(parent, tag, options = {}) {
    const element = document.createElement(tag);
    Object.keys(options).forEach((key) => {
        element[key] = options[key];
    });
    parent.appendChild(element);
    return element;
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

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    let filterPokemons;

    if (!isNaN(Number(searchTerm))) { //Filter by number
        filterPokemons = pokemonList.filter((pokemon) => {
            const pokemonID = pokemon.url.split("/")[6];
            return pokemonID.startsWith(searchTerm);
        });
    } else if (searchTerm != "") { //Filter by name
        filterPokemons = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(searchTerm)
        );
    } else { //No filter
        filterPokemons = pokemonList;
    }

    displayPokemons(filterPokemons);

    if (filterPokemons.length === 0) {
        notFoundMessage.style.display = "block";
    } else {
        notFoundMessage.style.display = "none";
    }
}