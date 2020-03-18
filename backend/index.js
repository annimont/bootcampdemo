const express = require('express')
const bodyParser = require('body-parser');
const money = require('./money')
const app = express()
app.use(bodyParser.json());
const port = 4000

app.get('/', (req, res) => res.send('Hello World'))

app.get('/money', (req, res) => money.getMoney(req, res))
app.post('/money', (req, res) => money.addTransaction(req, res))
app.delete('/money/:id', (req, res) => money.removeTransaction(req, res))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))