/**
 * @jest-environment jsdom
*/

import { showLoadButton, showNotFoundMessage, updateListUI, createPokemonElement, displayTyping } from "./domUtils";

describe('showLoadButton', () => {
    let loadButton;

    beforeEach(() => {
        loadButton = document.createElement('button');
    });

    it('should show the load button when there are more Pokemons to load', () => {
        loadButton.style.display = 'none';
        showLoadButton(loadButton, 1, 50);
        expect(loadButton.style.display).toBe('block');

        showLoadButton(loadButton, 3, 50);
        expect(loadButton.style.display).toBe('block');
    });

    it('should hide teh load button when there are no more Pokemons to load', () => {
        loadButton.style.display = 'block';
        showLoadButton(loadButton, 1, 10);
        expect(loadButton.style.display).toBe('none');

        showLoadButton(loadButton, 3, 35);
        expect(loadButton.style.display).toBe('none');
    });
});

describe('showNotFoundMessage', () => {
    let notFoundMessage;

    beforeEach(() => {
        notFoundMessage = document.createElement('div');
    });

    it('should show the message when there are no pokemons to show', () => {
        notFoundMessage.style.display = 'none';
        showNotFoundMessage(notFoundMessage, 0);
        expect(notFoundMessage.style.display).toBe('block');
    });

    it('should show the message when there are no pokemons to show', () => {
        notFoundMessage.style.display = 'block';
        showNotFoundMessage(notFoundMessage, 1);
        expect(notFoundMessage.style.display).toBe('none');
    });
});

describe('updateListUI', () => {
    let listWrapper;
    const pidgeyObj = { name: 'Pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/' };

    beforeEach(() => {
        listWrapper = document.createElement('div');

        global.fetch = jest.fn().mockResolvedValue({
            json: () => ({
                types: [{ type: {name: 'normal' } }, { type: { name: 'flying' } }]
            })
        });
    });

    it('should add pokemon items to the UI', () => {
        let visiblePokemon = new Array(13).fill(pidgeyObj);

        updateListUI(listWrapper, visiblePokemon, 1);
        expect(listWrapper.children.length).toBe(12);

        updateListUI(listWrapper, visiblePokemon, 2);
        expect(listWrapper.children.length).toBe(13);
    });

    it('should not add anything if there are no visiblePokemon is empty', () => {
        updateListUI(listWrapper, [], 1);
        expect(listWrapper.children.length).toBe(0);
    });
    
    
    it('should set the correct URL when a Pokemon item is clicked', async () => {
        const originalLocation = window.location;
        delete window.location;
        window.location = { href: '' };
    
        let visiblePokemon = [pidgeyObj];
    
        updateListUI(listWrapper, visiblePokemon, 1);
        const listItem = listWrapper.querySelector('.list-item');
        listItem.click();
    
        expect(window.location.href).toBe('./detail.html?id=16');
    
        window.location = originalLocation;
    });

    afterEach(() => {
        jest.clearAllMocks();
    })
});

describe('createPokemonElement', () => {
    it('should return an ID and list-item with the correct structure', () => {
        const pokemon = { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' };

        const { pokemonID, listItem } = createPokemonElement(pokemon);

        expect(pokemonID).toBe('1');
        expect(listItem.className).toBe('list-item');
        expect(listItem.querySelector('.pokemon-name-font').textContent).toBe('Bulbasaur');
        expect(listItem.querySelector('.pokemonID-font').textContent).toBe('#0001');
    })
})

describe('displayTyping', () => {
    let listItem;

    beforeEach(() => {
        listItem = document.createElement('div');
    });

    it('should display the correct one Pokemon types', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () => ({
                types: [{ type: {name: 'bug' } }]
            })
        });

        await displayTyping(10, listItem);
        const typeWrap = listItem.querySelector('.type-wrap');
        expect(typeWrap.querySelectorAll('.list-type').length).toBe(1);
        expect(typeWrap.querySelector('.list-type.bug')).toBeTruthy();
    })

    it('should display the correct two Pokemon types', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () => ({
                types: [{ type: {name: 'normal' } }, { type: { name: 'flying' } }]
            })
        });
        
        await displayTyping(14, listItem);
        const typeWrap = listItem.querySelector('.type-wrap');
        expect(typeWrap.querySelectorAll('.list-type').length).toBe(2);
        expect(typeWrap.querySelector('.list-type.normal')).toBeTruthy();
        expect(typeWrap.querySelector('.list-type.flying')).toBeTruthy();
    })

    afterEach(() => {
        jest.clearAllMocks();
    })
});
