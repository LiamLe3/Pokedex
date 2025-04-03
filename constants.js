export const MAX_POKEMON = 151; //Change this to increase/decrease number of total pokemons

export const BATCH = 12;

export const STATS_NAME = {
    hp: "HP",
    attack: "Atk",
    defense: "Def",
    "special-attack": "Sp.Atk",
    "special-defense": "Sp.Def",
    speed: "Spd",
};

export const TYPE_CHART = {
    "normal" : {
        weakTo: ["fighting"], 
        resistantTo: ["ghost"]
    },
    "fire" : {
        weakTo: ["water", "ground", "rock"], 
        resistantTo: ["fire", "grass", "ice", "bug", "steel", "fairy"]
    },
    "water" : {
        weakTo: ["electric", "grass"], 
        resistantTo: ["fire", "water", "ice", "steel"]
    },
    "electric" : {
        weakTo: ["ground"], 
        resistantTo: ["electric", "flying", "steel"]
    },
    "grass" : {
        weakTo: ["fire", "ice", "poison", "flying", "bug"], 
        resistantTo: ["water", "electric", "grass", "ground"]
    },
    "ice" : {
        weakTo: ["fire", "fighting", "rock", "steel"], 
        resistantTo: ["ice"]
    },
    "fighting" : {
        weakTo: ["flying", "psychic", "fairy"], 
        resistantTo: ["bug", "rock", "dark"]
    },
    "poison" : {
        weakTo: ["ground", "psychic"], 
        resistantTo: ["grass", "fighting", "poison", "bug", "fairy"]
    },
    "ground" : {
        weakTo: ["water", "grass", "ice"],
        resistantTo: ["poison", "rock", "electric"]
    },
    "flying" : {
        weakTo: ["electric", "ice", "rock"], 
        resistantTo: ["grass", "fighting", "bug", "ground"]
    },
    "psychic" : {
        weakTo: ["bug", "ghost", "dark"], 
        resistantTo: ["fighting", "psychic"]
    },
    "bug" : {
        weakTo: ["fire", "flying", "rock"], 
        resistantTo: ["grass", "fighting", "ground"]
    },
    "rock" : {
        weakTo: ["water", "grass", "fighting", "ground", "steel"], 
        resistantTo: ["normal", "fire", "poison", "flying"]
    },
    "ghost" : {
        weakTo: ["ghost", "dark"], 
        resistantTo: ["poison", "bug", "normal", "fighting"]
    },
    "dragon" : {
        weakTo: ["ice", "dragon", "fairy"], 
        resistantTo: ["fire", "water", "electric", "grass"]
    },
    "dark" : {
        weakTo: ["fighting", "bug", "fairy"], 
        resistantTo: ["ghost", "dark", "psychic"]
    },
    "steel" : {
        weakTo: ["fire", "fighting", "ground"], 
        resistantTo: ["normal", "grass", "ice", "flying", "psychic", "bug", "rock", "dragon", "steel", "fairy", "poison"]
    },
    "fairy" : {
        weakTo: ["poison", "steel"], 
        resistantTo: ["fighting", "bug", "dark", "dragon"]
    },
}