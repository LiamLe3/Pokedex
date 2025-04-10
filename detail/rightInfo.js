import { makeNewElement } from "./helper.js";

export function displayFlavorText(species, description) {
    for(let entry of species.flavor_text_entries) {
        if(entry.language.name === "en") {
            let flavor = entry.flavor_text.replace(/\f/g, " ");
            description.textContent = flavor;
        }
    }
}

export function displayInfo(height, weight, abilities, dom) {
    const { heightText, weightText, abilityWrapper } = dom.right;

    heightText.textContent = `${height / 10}m`;
    weightText.textContent = `${weight / 10}kg`;

    abilityWrapper.innerHTML = `<p class="info-titles">Ability</p>`;
    abilities.forEach(({ability}) => {
        makeNewElement(abilityWrapper, "p", {
            className: "pokemon-ability",
            textContent: ability.name,
        });
    });
}