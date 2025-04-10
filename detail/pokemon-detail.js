import { navigatePage, navigationSetup } from "./navigation.js";

openDetailsPage();

function openDetailsPage() {
    const dom = {
        nav: {
            prevText: document.querySelector(".prev-text"),
            nextText: document.querySelector(".next-text"),
            leftArrow: document.querySelector("#leftArrow"),
            rightArrow: document.querySelector("#rightArrow")
        },
        title: {
            titleText: document.querySelector("title"),
            nameText: document.querySelector(".pokemon-name"),
            IdText: document.querySelector(".pokemon-id")
        },
        left: {
            pokemonImg: document.querySelector(".pokemon-img"),
            statsWrapper: document.querySelector(".stats-wrapper")
        },
        right: {
            descriptionText: document.querySelector(".pokemon-description"),
            heightText: document.querySelector(".pokemon-height"),
            weightText: document.querySelector(".pokemon-weight"),
            abilitiesWrapper: document.querySelector(".ability-wrapper"),
            typingWrap: document.querySelector(".typing-wrap"),
            weaknessWrap: document.querySelector(".weakness-wrap"),
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        const pokemonID = new URLSearchParams(window.location.search).get("id");
        let id = parseInt(pokemonID, 10);
    
        navigationSetup(id, dom);
    
        navigatePage(id, dom);
    });
}
