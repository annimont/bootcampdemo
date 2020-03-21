const db = require('./db');

const getMoney = (req, res) =>
    db.any('select * from tulotjamenot')
    .then(transactionListFromDb => res.send(transactionListFromDb))
    .catch(error => res.status(500).send(error))

const addTransaction = (req, res) => {
    const transaction = req.body;
    db.one(
        'INSERT INTO tulotjamenot(type, name) VALUES($1, $2) RETURNING id', 
        [transaction.type, transaction.name]
    ).then(result => {
        res.send({
            id: result.id,
            type: transaction.type,
            name: transaction.name,
        });
    }).catch(error => res.status(500).send(error))

}

const removeTransaction = (req, res) => {
    const id = req.params.id;
    db.result('DELETE FROM tulotjamenot WHERE id = $1', [id])
    .then(result => {
        if(result.rowCount > 0) {
            res.send("OK");
        } else {
            res.status(404).send("Not found!")
        }
    })
    .catch(error => res.status(500).send(error))
}

module.exports = {
getMoney,
addTransaction,
removeTransaction
};