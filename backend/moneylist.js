const db = require('./db');

const getMoneyList = (req, res) =>
    db.any('select * from list')
    .then(listFromDb => res.send(listFromDb))
    .catch(error => res.status(500).send(error))

const addListItem = (req, res) => {
    const listItem = req.body;
    db.one(
        'INSERT INTO list(type, name, value) VALUES($1, $2, $3) RETURNING id', 
        [listItem.type, listItem.name, listItem.value]
    ).then(result => {
        res.send({
            id: result.id,
            type: listItem.type,
            name: listItem.name,
            value: listItem.value,
        });
    }).catch(error => res.status(500).send(error))

}

const removeListItem = (req, res) => {
    const id = req.params.id;
    db.result('DELETE FROM list WHERE id = $1', [id])
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
getMoneyList,
addListItem,
removeListItem
};