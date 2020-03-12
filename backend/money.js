const moneyList =[
    {"id": 1, "type": "tulo", "name": "Vuokra"}
  ]


const getMoney = (req, res) =>
res.send(moneyList);

const addTransaction = (req, res) => {
const transaction = req.body;
transaction.id = (moneyList.slice(-1)[0] || {id:0}).id + 1;
moneyList.push(transaction);
res.send(transaction);
}

const removeTransaction = (req, res) => {
const id = req.params.id;
console.log("ID", typeof id, typeof moneyList[0].id);
const index = moneyList.findIndex(transaction => transaction.id === parseInt(id));
if(index > -1) {
    const removedTransaction = moneyList.splice(index, 1);
    res.send(removedTransaction);
}
else {
    res.status(404).send("Not found");
}
}

module.exports = {
getMoney,
addTransaction,
removeTransaction
};