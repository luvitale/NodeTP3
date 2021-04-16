import express from 'express'
import { getGreeting, getRandomNumbersObject, readAndWriteInfo } from './utils.js'

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

app.get('/info', async (req, res) => {
    const filePackage = './package.json'
    const fileInfo = './info.txt'

    const textToSend = await readAndWriteInfo(filePackage, fileInfo)
    if (typeof textToSend != 'object') res.status(404)
    res.send(textToSend)
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en Servidor: ${error}`))