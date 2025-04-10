export function displayTitle(name, id, dom) {
    const { titleText, nameText, IdText } = dom.title;
    
    const capitalisePokemonName = capitaliseName(name);
    
    titleText.textContent = capitalisePokemonName;

    nameText.textContent = capitalisePokemonName;
    IdText.textContent = padNumber(id);
}

export function capitaliseName(name) {
    let result = name.replace(/-/g, ' ');

    result = result.charAt(0).toUpperCase() + result.slice(1);

    for (let i = 1; i < result.length; i++) {
        if (result[i - 1] === ' ') {
            result = result.slice(0, i) + result.charAt(i).toUpperCase() + result.slice(i + 1);
        }
    }

    return result;
}

export function padNumber(id) {
    return `#${String(id).padStart(4, "0")}`;
}