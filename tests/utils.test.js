const { getGreeting } = require("../utils");

describe("Test getGreeting", () => {
    it("debería retornar buenos días a las 6", () => {
        const hour = 6;
        expect(getGreeting(hour)).toEqual('Buenos dias!');
    });

    it("debería retornar buenos días a las 12", () => {
        const hour = 12;
        expect(getGreeting(hour)).toEqual('Buenos dias!');
    });

    it("debería retornar buenas tardes a las 13", () => {
        const hour = 13;
        expect(getGreeting(hour)).toEqual('Buenas tardes!');
    });

    it("debería retornar buenas tardes a las 19", () => {
        const hour = 19;
        expect(getGreeting(hour)).toEqual('Buenas tardes!')
    });

    it("debería retornar buenas noches a las 20", () => {
        const hour = 20;
        expect(getGreeting(hour)).toEqual('Buenas noches!');
    });

    it("debería retornar buenas noches a las 23", () => {
        const hour = 23;
        expect(getGreeting(hour)).toEqual('Buenas noches!');
    });

    it("debería retornar buenas noches a las 0", () => {
        const hour = 0;
        expect(getGreeting(hour)).toEqual('Buenas noches!');
    });

    it("debería retornar buenas noches a las 5", () => {
        const hour = 5;
        expect(getGreeting(hour)).toEqual('Buenas noches!');
    });

    it("debería retornar hora inválida a las 24", () => {
        const hour = 24;
        expect(getGreeting(hour)).toEqual('Hora inválida');
    });

    it("debería retornar hora inválida a las -1", () => {
        const hour = -1;
        expect(getGreeting(hour)).toEqual('Hora inválida');
    });
});