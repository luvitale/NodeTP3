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

module.exports = {
    getGreeting
}