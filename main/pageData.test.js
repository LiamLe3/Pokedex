import { PageData } from './pageData';

describe('PageData class', () => {
    let pageData;

    beforeEach(() => {
        pageData = new PageData();
    });

    it('should initialise with default values', () => {
        expect(pageData.pokemonList).toEqual([]);
        expect(pageData.visiblePokemon).toEqual([]);
        expect(pageData.multiplier).toEqual(1);
    });

    it('should set pokemonList and visiblePokemon correctly with setPokemonList()', () => {
        const mockList = [
            { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'Ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
        ]

        pageData.setPokemonList(mockList);

        expect(pageData.pokemonList).toEqual(mockList);
        expect(pageData.visiblePokemon).toEqual(mockList);
    });

    it('should filter by ID search term with filterList()', () => {
        const mockList = [
            { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'Metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/' },
            { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
        ];
        pageData.setPokemonList(mockList);

        pageData.filterList('25');
        expect(pageData.visiblePokemon).toEqual([
            { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        ]);

        pageData.filterList('1');
        expect(pageData.visiblePokemon).toEqual([
            { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'Metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/' }
        ]);
    });

    it('should filter by name search term with filterList()', () => {
        const mockList = [
            { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'Pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/' },
            { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
        ];

        pageData.setPokemonList(mockList);

        pageData.filterList('bulb');
        expect(pageData.visiblePokemon).toEqual([
            { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ]);

        pageData.filterList('pi');
        expect(pageData.visiblePokemon).toEqual([
            { name: 'Pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/' },
            { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
        ]);
    });

    it('should have an empty array in visiblePokemon if search input ID/name does not exist in pokemonList with filterList()', () => {
        const mockList = [
            { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'Pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/' },
            { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
        ];

        pageData.setPokemonList(mockList);

        pageData.filterList('missingno');
        expect(pageData.visiblePokemon).toEqual([]);

        pageData.filterList('0');
        expect(pageData.visiblePokemon).toEqual([]);
    });

    it('should be the same as pokemonList if search input is empty with filterList()', () => {
        const mockList = [
            { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'Pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/' },
            { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
        ];

        pageData.setPokemonList(mockList);

        pageData.filterList('');
        expect(pageData.visiblePokemon).toEqual(pageData.pokemonList);
    });

    it('should increment the multiplier with incrementMultiplier()', () => {
        pageData.incrementMultiplier();
        expect(pageData.multiplier).toBe(2);

        pageData.incrementMultiplier();
        expect(pageData.multiplier).toBe(3);
    });

    it('should reset the multiplier to 1 with resetMultiplier()', () => {
        pageData.incrementMultiplier();
        expect(pageData.multiplier).toBe(2);

        pageData.resetMultiplier();
        expect(pageData.multiplier).toBe(1);
    });
});