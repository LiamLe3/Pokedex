export class PageData {
    constructor() {
        this.pokemonList = [];
        this.visiblePokemon = [];
        this.multiplier = 1;
    }

    // Used upon loading the page and first fetchList call, pokemonList === visiblePokemon
    setPokemonList(list) {
        this.pokemonList = list;
        this.visiblePokemon = list;
    }

    // Changes the visiblePokemon list depending on ID or name, otherwise this function will display all pokemons
    filterList(searchTerm) {
        if (!isNaN(Number(searchTerm))) { // filter by ID (starting number)
            this.visiblePokemon = this.pokemonList.filter((pokemon) => {
                const pokemonID = pokemon.url.split("/")[6];
                return pokemonID.startsWith(searchTerm);
            });
        } else if (searchTerm !== "") { // filter by name
            this.visiblePokemon = this.pokemonList.filter((pokemon) =>
                pokemon.name.toLowerCase().startsWith(searchTerm)
            );
        } else { // don't filter, show entire pokemon list
            this.visiblePokemon = this.pokemonList;
        }
    }

    // increments multiplier
    incrementMultiplier() {
        this.multiplier += 1;
    }

    // resets multiplier
    resetMultiplier() {
        this.multiplier = 1;
    }
}