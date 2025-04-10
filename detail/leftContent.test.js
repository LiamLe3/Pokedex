/**
 * @jest-environment jsdom
 */

import { displayImg, displayStats, getStatCategory } from "./leftContent";

describe('displayImg()', () => {
    let pokemonImg;

    beforeEach(() => {
        pokemonImg = document.createElement('img');
    });

    it('should set the alt and src attributes of the image', () => {
        const name = 'pikachu';
        const id = 25;

        displayImg(name, id, pokemonImg);

        expect(pokemonImg.alt).toBe(name);

        expect(pokemonImg.src).toContain(`/assets/pokeimg/${id}.png`);
    });
});

describe('displayStats()', () => {
    let statsWrapper;

    beforeEach(() => {
        statsWrapper = document.createElement('div');
    });

    it('should clear the statsWrapper and append stat elements', () => {
        const stats = [
            { base_stat: 45, stat: { name: 'hp' } },
            { base_stat: 50, stat: { name: 'attakc' } },
        ];

        displayStats(stats, statsWrapper);
        
        expect(statsWrapper.children.length).toBe(2);

        const hpStat = statsWrapper.children[0];
        expect(hpStat.children.length).toBe(3);
        expect(hpStat.children[0].textContent).toBe('HP');
        expect(hpStat.children[1].textContent).toBe('045');
        expect(hpStat.children[2].value).toBe(45);
    });
});

describe('getStatCategory()', () => {
    it('should return the correct category for various stat values', () => {
        expect(getStatCategory(10)).toBe('cat1');
        expect(getStatCategory(40)).toBe('cat2');
        expect(getStatCategory(70)).toBe('cat3');
        expect(getStatCategory(100)).toBe('cat4');
        expect(getStatCategory(130)).toBe('cat5');
        expect(getStatCategory(180)).toBe('cat6');
    });
});