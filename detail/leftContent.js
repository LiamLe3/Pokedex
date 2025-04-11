import { STATS_NAME } from "../constants.js";
import { makeNewElement } from "./helper.js";

// Finds and displays the pokemon's image
export function displayImg(name, id, pokemonImg) {
    pokemonImg.alt = name;
    pokemonImg.src = `./assets/pokeimg/${id}.png`;
}

// Displays the stats of the pokemon
export function displayStats(stats, statsWrapper) {
    statsWrapper.innerHTML = "";

    stats.forEach(({ stat, base_stat }) => {
        const statDiv = document.createElement("div");
        statDiv.className = "stats-wrap";
        statsWrapper.appendChild(statDiv);

        // Appends the element that displaysthe name of the stat
        makeNewElement(statDiv, "p", {
            className: "stat-name",
            textContent: STATS_NAME[stat.name],
        });
        
        // Appends the element that displays the value of the stat
        makeNewElement(statDiv, "p", {
            className: "stat-value",
            textContent: String(base_stat).padStart(3, "0"),
        });

        // Appends the element that displays a progress bar representation of the stat
        let category = getStatCategory(base_stat);
        makeNewElement(statDiv, "progress", {
            className: `stat-bar ${category}`,
            value: base_stat,
            max: 225,
        });
    })
}

/* Depending on the stat value it will get a category class, different categories 
have different colored progress bars*/
export function getStatCategory(statValue){
    if(statValue < 30) {
        return "cat1"
    } else if (statValue < 60) {
        return "cat2"
    } else if (statValue < 90) {
        return "cat3"
    } else if(statValue < 120) {
        return "cat4"
    } else if(statValue < 150) {
        return "cat5"
    }
    return "cat6"
}