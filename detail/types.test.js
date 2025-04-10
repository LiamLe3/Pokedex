/**
 * @jest-environment jsdom
 */

import { displayTypes, displayWeakness, getWeaknesses } from "./types.js";

describe('displayTypes()', () => {
    let typingWrap;
    beforeEach(() => {
        typingWrap = document.createElement("div");
    });
    
    it('should add one type to the typingWrap', () => {
        const types = [{type:{name: "normal"}}];
        displayTypes(types, typingWrap);

        expect(typingWrap.querySelectorAll('.type').length).toBe(1);
        expect(typingWrap.querySelector('.type.normal')).toBeTruthy();
    });

    it('should add two types to the typingWrap', () => {
        const types = [{ type:{name: "normal"} }, { type:{name: "ghost"} }];
        displayTypes(types, typingWrap);

        expect(typingWrap.querySelectorAll('.type').length).toBe(2);
        expect(typingWrap.querySelector('.type.normal')).toBeTruthy();
        expect(typingWrap.querySelector('.type.ghost')).toBeTruthy();
    });
});

describe('displayWeaknesses', () => {
    let weaknessWrap;
    beforeEach(() => {
        weaknessWrap = document.createElement("div");
    });

    it('should add one weaknesses to the weaknessWrap', () => {
        const types = [{type:{name: "normal"}}];
        displayWeakness(types, weaknessWrap);

        expect(weaknessWrap.querySelectorAll('.weakness').length).toBe(1);
        expect(weaknessWrap.querySelector('.weakness.fighting')).toBeTruthy();
    });

    it('should add one weaknesses to the weaknessWrap', () => {
        const types = [{type:{name: "normal"}}, {type:{name: "ghost"}}];
        displayWeakness(types, weaknessWrap);

        expect(weaknessWrap.querySelectorAll('.weakness').length).toBe(1);
        expect(weaknessWrap.querySelector('.weakness.dark')).toBeTruthy();
    });

    it('should add six weaknesses to the weaknessWrap', () => {
        const types = [{type:{name: "ice"}}, {type:{name: "rock"}}];
        displayWeakness(types, weaknessWrap);

        expect(weaknessWrap.querySelectorAll('.weakness').length).toBe(6);
        expect(weaknessWrap.querySelector('.weakness.fighting')).toBeTruthy();
        expect(weaknessWrap.querySelector('.weakness.rock')).toBeTruthy();
        expect(weaknessWrap.querySelector('.weakness.steel')).toBeTruthy();
        expect(weaknessWrap.querySelector('.weakness.water')).toBeTruthy();
        expect(weaknessWrap.querySelector('.weakness.grass')).toBeTruthy();
        expect(weaknessWrap.querySelector('.weakness.ground')).toBeTruthy();
    });

});

describe('getWeakness()', () => {

    it('should return weaknesses of normal', () => {
        expect(getWeaknesses('normal')).toEqual(['fighting']);
    });

    it('should return weaknesses of normal and ghost', () => {
        expect(getWeaknesses('normal', 'ghost')).toEqual(['dark']);
    });

    it('should return weaknesses of ice and rock', () => {
        expect(getWeaknesses('ice', 'rock')).toEqual([ 'fighting', 'rock', 'steel', 'water', 'grass', 'ground' ]);
    });
});