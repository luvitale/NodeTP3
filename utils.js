const getGreeting = hour => {
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

const getRandomNumbersObject = (quantity, range) => {
    const min = Math.min(range.min, range.max)
    const max = Math.max(range.min, range.max)
    let randomNumbersObject = {}

    for (let i = 0; i < quantity; ++i) {
        let randomNumber = getRandomNumber(min, max)
        randomNumbersObject[randomNumber] = ~~randomNumbersObject[randomNumber] + 1
    }

    return randomNumbersObject
}

module.exports = {
    getGreeting,
    getRandomNumbersObject
}