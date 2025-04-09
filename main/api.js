import { MAX_POKEMON } from "../constants.js";

export async function fetchList(limit = MAX_POKEMON) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Failed to fetch Pokemon list:", error);
    }
}

export async function fetchPokemonData(id) {
    try {
        const [pokemon, species] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(res => res.json()),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                .then(res => res.json()),
        ]);
        return { pokemon, species };
    } catch (error) {
        console.error("Failed to fetch Pokemon data:", error);
    }
}