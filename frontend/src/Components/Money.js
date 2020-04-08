import React, { useState, useEffect } from 'react';

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

    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/moneylist');
            res
                .json()
                .then(data => setList(data))
                .catch(err => console.log(err));
        }
        
    fetchData();
    }, []);

    const onListDelete = (id) => {
        fetch(`/api/moneylist/${id}`, {
        method: 'DELETE'
        })
        .then(() => 
        setList(list.filter(transaction => transaction.id !== id))
        );
    }
   
    const incomeElements = money.filter(transaction => transaction.type === 'income')
        .map(transactionData => {
            return <Transaction onListItemAdded={(newListItem) => {console.log(newListItem); setList([...list, newListItem])}}
                key={transactionData.id} 
                type={transactionData.type}
                name={transactionData.name}
                onDelete={() => onDelete(transactionData.id)}
                >
                    {transactionData.name}
                </Transaction>
        }
    );

    const expenseElements = money.filter(transaction => transaction.type === 'expense')
        .map(transactionData => {
            return <Transaction onListItemAdded={(newListItem) => {console.log(newListItem); setList([...list, newListItem])}}
                key={transactionData.id} 
                type={transactionData.type}
                name={transactionData.name} 
                onDelete={() => onDelete(transactionData.id)}
                >
                    {transactionData.name}
                </Transaction>
    }
);
    
    return (
        <React.Fragment>
            <div className='content'>
                <h1>Tulojen ja menojen seuranta</h1>
                <p>Lisää tulonlähteitä ja menoeriä. Kirjoita tulonlähteisiin esimerkiksi "palkka" ja paina "Lisää".</p>
                <p>Kun olet lisännyt kohteen, ilmoita tulon tai menon suuruus euroina.</p>
                <div className='column'>
                    <div className='incomeSources'>
                        <h2>Tulot</h2>
                        <div className='money'>
                            {incomeElements}
                            <AddTransaction type={'income'} 
                                lisaa='tulonlähde' 
                                onTransactionAdded={(newTransaction) => setMoney([...money, newTransaction])}/>
                        </div>
                    </div>
                    <div className='expenseTargets'>
                        <h2>Menot</h2>
                        <div className='money'>
                            {expenseElements}
                            <AddTransaction 
                                type={'expense'} 
                                lisaa='meno' 
                                onTransactionAdded={(newTransaction) => setMoney([...money, newTransaction])}/>
                        </div>
                    </div>
                </div>
                <List list={list} onListDelete={onListDelete}/>
            </div>
        </React.Fragment>
    );
}