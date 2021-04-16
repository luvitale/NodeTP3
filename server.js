const express = require('express')
const { getGreeting, getRandomNumbersObject } = require('./utils')

const app = express()

app.get('/', (req, res) => {
    let actualHour = new Date().getHours()
    res.send(getGreeting(actualHour))
})

app.get('/random', (req, res) => {
    const numbersQuantity = 10000
    const numbersRange = {
        min: 1,
        max: 20
    }
    
    res.send(getRandomNumbersObject(numbersQuantity, numbersRange))
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en Servidor: ${error}`))