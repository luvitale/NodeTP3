const express = require('express')
const { getGreeting } = require('./utils')

const app = express()

app.get('/', (req, res) => {
    let actualHour = new Date().getHours()
    res.send(getGreeting(actualHour))
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en Servidor: ${error}`))