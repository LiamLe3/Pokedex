// Appends an element to the given parent with any tags and keys given to the new element.
export function makeNewElement(parent, tag, options = {}) {
    const element = document.createElement(tag);

    // Add class keys to the element
    Object.keys(options).forEach((key) => {
        element[key] = options[key];
    });
    
    parent.appendChild(element);
    return element;
}