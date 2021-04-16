const express = require('express')
const fs = require('fs')
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

app.get('/info', async (req, res) => {
    const filePackage = './package.json'
    const fileInfo = './info.txt'

    try {
        let fileBuffer = await fs.promises.readFile(filePackage, 'utf-8')
        
        let fileStat = await fs.promises.stat(filePackage)
        let info = {
            contenidoStr: fileBuffer,
            contenidoObj: JSON.parse(fileBuffer),
            size: fileStat.size
        }

        console.log(info)
        res.send(info)

        let fileToWrite = await fs.promises.writeFile(fileInfo, JSON.stringify(info, null, 2), 'utf-8')
    }
    catch(error) {
        res.send(`<h2 style="color: red;">ERROR 404: recurso no encontrado</h2>`)
    }
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en Servidor: ${error}`))