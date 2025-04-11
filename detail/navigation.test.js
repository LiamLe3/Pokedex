/**
 * @jest-environment jsdom
 */

import { MAX_POKEMON } from "../constants.js";
import { updateURL, getPrevId, getNextId, displayNavigation } from "./navigation";


describe('updateURL()', () => {
    it('should update the window location pathname and search', () => {
        updateURL(42);

        expect(window.location.pathname).toBe('/detail.html');
        expect(window.location.search).toBe('?id=42');
    });

    afterEach(() => {
        window.history.pushState({}, "", "/");
    });
});

describe('getPrevId()', () => {
    it('should get the id of the previous pokemon', () => {
        expect(getPrevId(5)).toBe(4);
    })

    it('should get the id for the last pokemon', () => {
        expect(getPrevId(1)).toBe(MAX_POKEMON);
    })
});

describe('getNextId()', () => {
    it('should get the id of the next pokemon', () => {
        expect(getNextId(4)).toBe(5);
    })

    it('should get the id for the first pokemon', () => {
        expect(getNextId(MAX_POKEMON)).toBe(1);
    })
});

describe('displayNavigation()', () => {

    const mockDom = {
        nav: {
            prevText: { textContent: '' },
            nextText: { textContent: '' }
        }
    }

    beforeEach(() => {
        global.fetch = jest.fn()
            .mockResolvedValueOnce({
                json: () => ({ name: 'Bulbasaur' }),
            })
            .mockResolvedValueOnce({
                json: () => ({ name: 'Venusaur' })
            });
    });

    it('should set the correct text for the previous and next pokemon', async () => {
        await displayNavigation(1, 3, mockDom);

        expect(mockDom.nav.prevText.textContent).toBe('Bulbasaur');
        expect(mockDom.nav.nextText.textContent).toBe('Venusaur');
    });

    afterEach(() => {
        jest.clearAllMocks();
    })
});