const express = require('express')

const app = express()

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

app.get('/', (req, res) => {
    let actualHour = new Date().getHours()
    res.send(getGreeting(actualHour))
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en Servidor: ${error}`))

module.exports = {
    getGreeting
};