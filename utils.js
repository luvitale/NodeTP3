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

        let fileToWrite = await fs.promises.writeFile(fileInfo, JSON.stringify(info, null, 2), 'utf-8')

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