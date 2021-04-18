import express from 'express'
import myUtils from './api/my-utils.js'
import {
  getGreeting,
  getRandomNumbersObject,
  readAndWriteInfo,
  doOperation
} from './api/tasks.js'

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  let actualHour = new Date().getHours()

  const color = myUtils.getRandomColor()

  res.send(`
      <link rel="stylesheet" type="text/css" href="css/greeting.css" />
      <div class="greeting-container" id="greeting-container" style="background-color: ${myUtils.getBackgroundColor(color)};">
        <h1 class="greeting-text" id="greeting-text" style="color: ${color};">
          ${getGreeting(actualHour)}
        </h1>
      </div>
    `)
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

app.set('PORT', process.env.PORT || 8080)
const server = app.listen(app.get('PORT'), () => {
  console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en Servidor: ${error}`))