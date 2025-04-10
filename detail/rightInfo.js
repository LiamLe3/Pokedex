import { makeNewElement } from "./helper.js";

export function displayFlavorText(species, description) {
    for(let entry of species.flavor_text_entries) {
        if(entry.language.name === "en") {
            let flavor = entry.flavor_text.replace(/\f/g, " ");
            description.textContent = flavor;
        }
    }
    return "";
}

export function displayInfo(height, weight, abilities, dom) {
    const { heightText, weightText, abilitiesWrapper } = dom.right;

    heightText.textContent = `${height / 10}m`;
    weightText.textContent = `${weight / 10}kg`;

    abilitiesWrapper.innerHTML = `<p class="info-titles">Ability</p>`;
    abilities.forEach(({ability}) => {
        makeNewElement(abilitiesWrapper, "p", {
            className: "pokemon-ability",
            textContent: ability.name,
        });
    });
}