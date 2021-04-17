import operations from './operations.js'
import fs from 'fs'
import util from 'util'

export const getGreeting = hour => {
    if (hour < 0 || hour >= 24) {
        return 'Hora inválida'
    }

    else if (hour >= 6 && hour <= 12) {
        return 'Buenos dias!'
    }

    else if (hour >= 13 && hour <= 19) {
        return 'Buenas tardes!'
    }

    else {
        return 'Buenas noches!'
    }
}

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomNumbersObject = (quantity, range) => {
    const min = Math.min(range.min, range.max)
    const max = Math.max(range.min, range.max)
    let randomNumbersObject = {}

    for (let i = 0; i < quantity; ++i) {
        let randomNumber = getRandomNumber(min, max)
        randomNumbersObject[randomNumber] = ~~randomNumbersObject[randomNumber] + 1
    }

    return randomNumbersObject
}

export const readAndWriteInfo = async (filePackage, fileInfo) => {
    try {
        let fileBuffer = await fs.promises.readFile(filePackage, 'utf-8')
        
        let fileStat = await fs.promises.stat(filePackage)
        let info = {
            contenidoStr: fileBuffer,
            contenidoObj: JSON.parse(fileBuffer),
            size: fileStat.size
        }

        console.log(util.inspect(info, {depth: null, colors: true}))

        const space = 2
        await fs.promises.writeFile(fileInfo, JSON.stringify(info, null, space), 'utf-8')

        return info
    }
    catch(error) {
        if (error.code == 'ENOENT') {
            return `Error: El archivo ${error.path} no encontrado`
        }
        else {
            return `Error: El archivo ${filePackage} no es un JSON`
        }
    }
}

const parseNumberIfIsPossible = num => num == Number(num) ? Number(num) : num

export const doOperation = (num1, num2, op) => {
    num1 = parseNumberIfIsPossible(num1)
    num2 = parseNumberIfIsPossible(num2)

    let error = {
        num1: { valor: num1, tipo: typeof num1 },
        num2: { valor: num2, tipo: typeof num2 },
        operacion: { valor: op, tipo: typeof op }
    }

    if (!op) return error
    if (typeof num1 != 'number' || typeof num2 != 'number') return error

    let ops = {num1, num2, operacion: op}

    switch(op) {
        case "suma":
            return {...ops, resultado: operations.suma(num1, num2)}
        case "resta":
            return {...ops, resultado: operations.resta(num1, num2)}
        case "multiplicación":
        case "multiplicacion":
            return {...ops, resultado: operations.mult(num1, num2)}
        case "división":
        case "division":
            if (num2 == 0) return error
            return {...ops, resultado: operations.div(num1, num2)}
        default:
            return error
    }
}