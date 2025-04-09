export class PageData {
    constructor() {
        this.pokemonList = [];
        this.visiblePokemon = [];
        this.multiplier = 1;
    }

    setPokemonList(list) {
        this.pokemonList = list;
        this.visiblePokemon = list;
    }

    filterList(searchTerm) {
        if (!isNaN(Number(searchTerm))) {
            this.visiblePokemon = this.pokemonList.filter((pokemon) => {
                const pokemonID = pokemon.url.split("/")[6];
                return pokemonID.startsWith(searchTerm);
            });
        } else if (searchTerm !== "") {
            this.visiblePokemon = this.pokemonList.filter((pokemon) =>
                pokemon.name.toLowerCase().startsWith(searchTerm)
            );
        } else {
            this.visiblePokemon = this.pokemonList;
        }
    }

    incrementMultiplier() {
        this.multiplier += 1;
    }

    resetMultiplier() {
        this.multiplier = 1;
    }
}