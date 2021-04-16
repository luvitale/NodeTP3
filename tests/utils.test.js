const { getGreeting, getRandomNumbersObject } = require("../utils");

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

describe("Test getRandomNumbersObject", () => {
    it("debería retornar un objeto", () => {
        const numbersQuantity = 10000
        const numbersRange = {
            min: 1,
            max: 20
        };

        const randomNumbersObject = getRandomNumbersObject(numbersQuantity, numbersRange);
        expect(typeof randomNumbersObject).toEqual('object');
    });

    it("debería retornar un objeto con la única clave 1 con un rango entre 1 y 1", () => {
        const numbersQuantity = 10000;
        const numbersRange = {
            min: 1,
            max: 1
        };
        const iQuantity = 100;

        for (let i = 0; i < iQuantity; ++i) {
            const randomNumbersObject = getRandomNumbersObject(numbersQuantity, numbersRange);
            expect(Object.keys(randomNumbersObject).length).toEqual(1);
            expect(Object.keys(randomNumbersObject)[0] == 1);
        }
    });

    it("debería retornar un objeto con hasta 2 claves con un rango entre 1 y 2", () => {
        const numbersQuantity = 5;
        const numbersRange = {
            min: 1,
            max: 2
        };

        for (let i = 0; i < numbersQuantity; ++i) {
            const randomNumbersObject = getRandomNumbersObject(numbersQuantity, numbersRange);
            expect(Object.keys(randomNumbersObject).length >= 1);
            expect(Object.keys(randomNumbersObject).length <= 2);
            expect(Object.keys(randomNumbersObject)[0] == 1);
            if (Object.keys(randomNumbersObject).length == 2) {
                expect(Object.keys(randomNumbersObject)[1] == 2);
            }
        }
    })

    it("debería retornar un objeto con hasta 10000 claves con un rango entre -4999 y 5000", () => {
        const numbersQuantity = 100000;
        const numbersRange = {
            min: -4999,
            max: 5000
        };
        const iQuantity = 10;

        for (let i = 0; i < iQuantity; ++i) {
            const randomNumbersObject = getRandomNumbersObject(numbersQuantity, numbersRange);
            expect(Object.keys(randomNumbersObject).length >= 1);
            expect(Object.keys(randomNumbersObject).length <= 10000);
        }
    })

    it("debería retornar un objeto con hasta 2 claves con un rango entre 2 y 1", () => {
        const numbersQuantity = 5;
        const numbersRange = {
            min: 2,
            max: 1
        };

        for (let i = 0; i < numbersQuantity; ++i) {
            const randomNumbersObject = getRandomNumbersObject(numbersQuantity, numbersRange);
            expect(Object.keys(randomNumbersObject).length >= 1);
            expect(Object.keys(randomNumbersObject).length <= 2);
            expect(Object.keys(randomNumbersObject)[0] == 1);
            if (Object.keys(randomNumbersObject).length == 2) {
                expect(Object.keys(randomNumbersObject)[1] == 2);
            }
        }
    });
});