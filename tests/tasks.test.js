import { getGreeting, getRandomNumbersObject, readAndWriteInfo } from "../api/tasks.js";
import fs from 'fs';

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
            expect(randomNumbersObject.hasOwnProperty(1)).toBeTruthy();
            expect(randomNumbersObject.hasOwnProperty(0)).toBeFalsy();
            expect(randomNumbersObject.hasOwnProperty(2)).toBeFalsy();
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
            expect(Object.keys(randomNumbersObject).length >= 1).toBeTruthy();
            expect(Object.keys(randomNumbersObject).length <= 2).toBeTruthy();
            if (Object.keys(randomNumbersObject).length == 1) {
                expect(randomNumbersObject.hasOwnProperty(1) ^ randomNumbersObject.hasOwnProperty(2)).toBeTruthy();
            }
            else {
                expect(randomNumbersObject.hasOwnProperty(1)).toBeTruthy();
                expect(randomNumbersObject.hasOwnProperty(2)).toBeTruthy();
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
            expect(Object.keys(randomNumbersObject).length).toBeGreaterThanOrEqual(1);
            expect(Object.keys(randomNumbersObject).length).toBeLessThanOrEqual(10000);
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
            expect(Object.keys(randomNumbersObject).length >= 1).toBeTruthy();
            expect(Object.keys(randomNumbersObject).length <= 2).toBeTruthy();
            if (Object.keys(randomNumbersObject).length == 1) {
                expect(randomNumbersObject.hasOwnProperty(1) ^ randomNumbersObject.hasOwnProperty(2)).toBeTruthy();
            }
            else {
                expect(randomNumbersObject.hasOwnProperty(1)).toBeTruthy();
                expect(randomNumbersObject.hasOwnProperty(2)).toBeTruthy();
            }
        }
    });
});

describe("Test readAndWriteInfo", () => {
    it("debería retornar el error de Archivo no encontrado si no existe", async () => {
        const filePackage = './not-exists.file';
        const fileInfo = './info-test.txt';

        const textToSend = await readAndWriteInfo(filePackage, fileInfo);
        expect(typeof textToSend).toEqual('string');
        expect(textToSend).toEqual(`Error: El archivo ${filePackage} no encontrado`);
    });

    it("debería retornar el error de Archivo no es un JSON si no es válido para parsear", async () => {
        const filePackage = './README.md';
        const fileInfo = './info-test.txt';

        const textToSend = await readAndWriteInfo(filePackage, fileInfo);
        expect(typeof textToSend).toEqual('string');
        expect(textToSend).toEqual(`Error: El archivo ${filePackage} no es un JSON`);
    });

    it("debería retornar un objeto si el archivo es el package.json", async () => {
        const filePackage = './package.json';
        const fileInfo = './info-test.txt';

        const textToSend = await readAndWriteInfo(filePackage, fileInfo);
        expect(typeof textToSend).toEqual('object');
        await fs.promises.unlink(fileInfo);
    });

    it("debería retornar un objeto con el contenidoStr si es el package.json", async () => {
        const filePackage = './package.json';
        const fileInfo = './info-test.txt';

        const textToSend = await readAndWriteInfo(filePackage, fileInfo);
        expect(textToSend.hasOwnProperty("contenidoStr")).toBeTruthy();
        expect(typeof textToSend["contenidoStr"]).toEqual("string");
        await fs.promises.unlink(fileInfo);
    });
    
    it("debería retornar un objeto con el contenidoObj si es el package.json", async () => {
        const filePackage = './package.json';
        const fileInfo = './info-test.txt';

        const textToSend = await readAndWriteInfo(filePackage, fileInfo);
        expect(textToSend.hasOwnProperty("contenidoObj")).toBeTruthy();
        expect(typeof textToSend["contenidoObj"]).toEqual("object");
        await fs.promises.unlink(fileInfo);
    });

    it("debería retornar un objeto con el size si es el package.json", async () => {
        const filePackage = './package.json';
        const fileInfo = './info-test.txt';

        const textToSend = await readAndWriteInfo(filePackage, fileInfo);
        expect(textToSend.hasOwnProperty("size")).toBeTruthy();
        expect(typeof textToSend["size"]).toEqual("number");
        await fs.promises.unlink(fileInfo);
    });
});