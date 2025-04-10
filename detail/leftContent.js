import { STATS_NAME } from "../constants.js";
import { makeNewElement } from "./helper.js";

export function displayImg(name, id, pokemonImg) {
    pokemonImg.alt = name;
    pokemonImg.src = `./assets/pokeimg/${id}.png`;
}

/* Stats */
export function displayStats(stats, statsWrapper) {
    statsWrapper.innerHTML = "";

    stats.forEach(({ stat, base_stat }) => {
        const statDiv = document.createElement("div");
        statDiv.className = "stats-wrap";
        statsWrapper.appendChild(statDiv);

        makeNewElement(statDiv, "p", {
            className: "stat-name",
            textContent: STATS_NAME[stat.name],
        });
        
        makeNewElement(statDiv, "p", {
            className: "stat-value",
            textContent: String(base_stat).padStart(3, "0"),
        });

        let category = getStatCategory(base_stat);
        makeNewElement(statDiv, "progress", {
            className: `stat-bar ${category}`,
            value: base_stat,
            max: 225,
        });
    })
}

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