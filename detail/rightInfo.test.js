/**
 * @jest-environment jsdom
 */

import { displayFlavorText, displayInfo } from "./rightInfo";

describe('displayFlavorText()', () => {
    let description;

    beforeEach(() => {
        description = { textContent: '' };
    });

    it('should display the Pokemons description only in english', () => {
        const species = {
            flavor_text_entries: [
                { language: { name: "fr" }, flavor_text: "Autre texte" },
                { language: { name: "en" }, flavor_text: "Test text" }
            ]
        };

        displayFlavorText(species, description);

        expect(description.textContent).toBe("Test text");
    });

    it('should not modify textContent if no English entry is found', () => {
        const species = {
            flavor_text_entries: [
                { language: { name: "fr" }, flavor_text: "Autre texte" },
                { language: { name: "de" }, flavor_text: "Andere texte" },
            ],
        };

        displayFlavorText(species, description);

        expect(description.textContent).toBe('');
    });
});

describe('displayInfo', () => {
    let dom;

    beforeEach(() => {
        dom = {
            right: {
                heightText: { textContent: '' },
                weightText: { textContent: '' },
                abilityWrapper: document.createElement("div")
            },
        };
    });

    it('should correctly format height and weight textContent', () => {
        const height = 150;
        const weight = 600;

        displayInfo(height, weight, [], dom);

        expect(dom.right.heightText.textContent).toBe("15m");
        expect(dom.right.weightText.textContent).toBe("60kg");
    });

    it('should correctly add abilities to abilitiesWrapper', () => {
        const abilities = [
            { ability: { name: "Overgrow" } },
            { ability: { name: "Chlorophyll" } },
        ];

        displayInfo(0, 0, abilities, dom);
        
        const abilityWrapper = dom.right.abilityWrapper
        expect(abilityWrapper.innerHTML).toContain('<p class="info-titles">Ability</p>');

        const abilityList = abilityWrapper.querySelectorAll('.pokemon-ability');
        expect(abilityList.length).toBe(2);
        expect(abilityList[0].textContent).toBe("Overgrow");
        expect(abilityList[1].textContent).toBe("Chlorophyll");
    });
});
