/**
 * @jest-environment jsdom
 */

import { makeNewElement } from "./helper.js";  // Adjust path as necessary

describe('makeNewElement', () => {
    let parent;
    let element;

    beforeEach(() => {
        parent = document.createElement("div");
    });

    it('should create an element and append it to the parent', () => {
        const tag = 'div';
        const options = { className: 'test-class', textContent: 'Hello' };

        element = makeNewElement(parent, tag, options);
        
        expect(element.tagName).toBe(tag.toUpperCase())

        expect(element.className).toBe(options.className);
        expect(element.textContent).toBe(options.textContent);

        expect(parent.contains(element)).toBe(true);
    });
});