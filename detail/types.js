import { makeNewElement } from "./helper.js";
import { TYPE_CHART } from "../constants.js";

// Displays all pokemon types
export function displayTypes(types, typingWrap) {
    typingWrap.innerHTML = "";

    // appends type element into typingWrap
    types.forEach(({type}) => {
        makeNewElement(typingWrap, "p", {
            className: `type ${type.name}`,
            textContent: type.name,
        })
    });
}

// Displays all weaknesses
export function displayWeakness(types, weaknessWrap) {
    weaknessWrap.innerHTML = "";
    let weaknesses = [];

    // Sorts whether the list of weaknesses is coming from 1 type or 2 types
    if(types.length == 1) {
        weaknesses = getWeaknesses(types[0].type.name);
    } else {
        weaknesses = getWeaknesses(types[0].type.name, types[1].type.name);
    }
    
    // append weakness element to weaknessWrap
    weaknesses.forEach((weakness) => {
        makeNewElement(weaknessWrap, "p", {
            className: `weakness ${weakness}`,
            textContent: weakness,
        })
    })
}

// Returns a list of weaknesses
export function getWeaknesses(type1, type2 = null) {
    // Return the weaknesses of single-typed pokemon
    if(!type2) return TYPE_CHART[type1].weakTo;

    // Otherwise compare weaknesses of both types and return resulting weaknesses
    let weakness = new Set([
        ...TYPE_CHART[type1].weakTo,
        ...TYPE_CHART[type2].weakTo
    ]);

    let resist = new Set([
        ...TYPE_CHART[type1].resistantTo,
        ...TYPE_CHART[type2].resistantTo,
    ])

    resist.forEach(resistance => {
        weakness.delete(resistance);
    })

    return Array.from(weakness);
}