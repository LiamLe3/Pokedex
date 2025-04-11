// Displays the name of the pokemon on the page title, heading. Also displays the pokemon's ID with '0' padding.
export function displayTitle(name, id, dom) {
    const { titleText, nameText, IdText } = dom.title;
    
    const capitalisePokemonName = capitaliseName(name);
    
    titleText.textContent = capitalisePokemonName;

    nameText.textContent = capitalisePokemonName;
    IdText.textContent = padNumber(id);
}

// Capitalises the name of a pokemon
export function capitaliseName(name) {
    // Replace '-' with ' '
    let result = name.replace(/-/g, ' ');

    // Capitalise first letter
    result = result.charAt(0).toUpperCase() + result.slice(1);

    for (let i = 1; i < result.length; i++) {
        // Capitalises any letter following after a ' '
        if (result[i - 1] === ' ') {
            result = result.slice(0, i) + result.charAt(i).toUpperCase() + result.slice(i + 1);
        }
    }

    return result;
}

// Pads '0's e.g. #0011
export function padNumber(id) {
    return `#${String(id).padStart(4, "0")}`;
}