const express = require('express');
const bodyParser = require('body-parser');
const money = require('./money');
const moneylist = require('./moneylist');
const networth = require('./networth');
const app = express()
app.use(bodyParser.json());
const port = 4000

app.get('/', (req, res) => res.send('Hello World'))

app.get('/money', (req, res) => money.getMoney(req, res))
app.post('/money', (req, res) => money.addTransaction(req, res))
app.delete('/money/:id', (req, res) => money.removeTransaction(req, res))

app.get('/moneylist', (req, res) => moneylist.getMoneyList(req, res))
app.post('/moneylist', (req, res) => moneylist.addListItem(req, res))
app.delete('/moneylist/:id', (req, res) => moneylist.removeListItem(req, res))

app.get('/networth', (req, res) => networth.getNetworth(req, res))
app.post('/networth', (req, res) => networth.addListItem(req, res))
app.delete('/networth/:id', (req, res) => networth.removeListItem(req, res))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))