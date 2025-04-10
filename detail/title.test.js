/**
 * @jest-environment jsdom
 */

import { displayTitle, capitaliseName, padNumber } from "./title";

describe('displayTitle()', () => {
    let dom;

    beforeEach(() => {
        dom = {
            title: {
                titleText: { textContent: '' },
                nameText: { textContent: '' },
                IdText: { textContent: '' },
            },
        };
    });

    it('should display the capitalized name title and ID correctly', () => {
        const name = 'pikachu';
        const id = 25;

        displayTitle(name, id, dom);

        expect(dom.title.titleText.textContent).toBe('Pikachu');
        expect(dom.title.nameText.textContent).toBe('Pikachu');

        expect(dom.title.IdText.textContent).toBe('#0025');
    });
});

describe('capitaliseName()', () => {
    it('should capitalise names correctly', () => {
        expect(capitaliseName('foo')).toBe('Foo');
    });

    it('should capitalise names with spaces correctly', () => {
        expect(capitaliseName('flutter-mane')).toBe('Flutter Mane');
    });
});

describe('padNumber', () => {
    it('should pad the number with three 0s', () => {
        expect(padNumber(1)).toBe('#0001');
    })

    it('should pad the number with two 0s', () => {
        expect(padNumber(11)).toBe('#0011');
    })

    it('should pad the number with one 0s', () => {
        expect(padNumber(111)).toBe('#0111');
    })

    it('should pad the number with no 0s', () => {
        expect(padNumber(1111)).toBe('#1111');
    })

})
