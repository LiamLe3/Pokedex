export function displayTitle(name, id, dom) {
    const { titleText, nameText, IdText } = dom.title;
    
    const capitalisePokemonName = capitaliseName(name);
    
    titleText.textContent = capitalisePokemonName;

    nameText.textContent = capitalisePokemonName;
    IdText.textContent = `#${String(id).padStart(4, "0")}`;
}

export function capitaliseName(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}