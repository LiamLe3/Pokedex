import { makeNewElement } from "./helper.js";
import { TYPE_CHART } from "../constants.js";

export function displayTypes(types, typingWrap) {
    typingWrap.innerHTML = "";
    types.forEach(({type}) => {
        makeNewElement(typingWrap, "p", {
            className: `type ${type.name}`,
            textContent: type.name,
        })
    });
}

export function displayWeakness(types, weaknessWrap) {
    weaknessWrap.innerHTML = "";
    let weaknesses = [];

    if(types.length == 1) {
        weaknesses = getWeaknesses(types[0].type.name);
    } else {
        weaknesses = getWeaknesses(types[0].type.name, types[1].type.name);
    }
    
    weaknesses.forEach((weakness) => {
        makeNewElement(weaknessWrap, "p", {
            className: `weakness ${weakness}`,
            textContent: weakness,
        })
    })
}

export function getWeaknesses(type1, type2 = null) {
    if(!type2) return TYPE_CHART[type1].weakTo;

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