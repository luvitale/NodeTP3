import express from 'express'
import {
  getGreeting,
  getRandomNumbersObject,
  readAndWriteInfo,
  doOperation    
} from './api/tasks.js'

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

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

app.get('/operaciones', (req, res) => {
  let { num1, num2, operacion } = req.query
  
  let result = doOperation(num1, num2, operacion)

  if (result.hasOwnProperty('error')) res.status(404)
  res.send(result)
})

const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en Servidor: ${error}`))