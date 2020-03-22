import React, { useState, useEffect } from 'react';

//import fakeData from '../../fakedata/money.json';
import AddTransaction from './AddTransaction';
import Transaction from './Transaction';
import List from './List';
import './Money.css';

export default function Money(props) {
    const [money, setMoney] = useState([]);

    useEffect(() => {
    async function fetchData() {
        const res = await fetch('/api/money');
        res
            .json()
            .then(data => setMoney(data))
            .catch(err => console.log(err));
    }
    
    fetchData();
    }, []);

    const onDelete = (id) => {
        fetch(`/api/money/${id}`, {
        method: 'DELETE'
        })
        .then(() =>
        setMoney(money.filter(transaction => transaction.id !== id))
        );
    }
   
    /*
    const transactionElements = money.map(
    transactionData => {
        return <Transaction 
            key={transactionData.id} 
            type={transactionData.type} 
            onDelete={() => onDelete(transactionData.id)}
            >
                {transactionData.name}
            </Transaction>
        }
    )
    */
    
    const incomeElements = money.filter(transaction => transaction.type === 'income')
        .map(transactionData => {
            return <Transaction 
                key={transactionData.id} 
                type={transactionData.type} 
                onDelete={() => onDelete(transactionData.id)}
                >
                    {transactionData.name}
                </Transaction>
        }
    );

    const expenseElements = money.filter(transaction => transaction.type === 'expense')
    .map(transactionData => {
        return <Transaction 
            key={transactionData.id} 
            type={transactionData.type} 
            onDelete={() => onDelete(transactionData.id)}
            >
                {transactionData.name}
            </Transaction>
    }
);
    
    return (
        <React.Fragment>
            <div>
                <h2>Tulot</h2>
                <div className="money">
                    {incomeElements}
                </div>
                <AddTransaction type={"income"} 
                    lisaa="tulonlähde" 
                    onTransactionAdded={(newTransaction) => setMoney([...money, newTransaction])}/>
                <h2>Menot</h2>
                <div className="money">
                    {expenseElements}
                </div>
                <AddTransaction 
                    type={"expense"} 
                    lisaa="meno" 
                    onTransactionAdded={(newTransaction) => setMoney([...money, newTransaction])}/>
                <List/>
            </div>
        </React.Fragment>
    );
}
    
/*
    <textarea rows="20" cols="100">Tänne joku palkkisysteemi ja kirjallinen lista, 
        josta voi poistella asioita, jos tekee virheen. 
        Palkeilla havainnollistetaan mistä tulot ja menot muodostuvat. 
        Tulojen ja menojen erotus, säästöprosentti. Kuukausittainen seuranta?
    </textarea>
*/