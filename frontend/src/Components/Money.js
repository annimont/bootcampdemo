import React, { useState, useEffect } from 'react';

//import fakeData from '../../fakedata/money.json';
import AddTransaction from './AddTransaction.js';
import Transaction from './Transaction.js';

export default function Money(props) {
    const [money, setMoney] = useState([]);

    useEffect(() => {
    async function fetchData() {
        const res = await fetch('/api/money');//pitääkö backendissä olla sama route
        res
            .json()
            .then(data => setMoney(data))
            .catch(err => console.log(err));
    }
    
    fetchData();
    }, []);
   
    const transactionElements = money.map(
    transactionData => {
        return <Transaction key={transactionData.id} type={transactionData.type}>{transactionData.name}</Transaction>
        }
    )
    
    return (
        <React.Fragment>
            <AddTransaction onTransactionAdded={(newTransaction) => setMoney([...money, newTransaction])}/>
            <div className="money">
                {transactionElements}
            </div>  
        </React.Fragment>
    );
}
    
    /*return (
        <form>
            <h1>Tulot ja menot</h1>
            <div>
                <h2>Tulot (€): </h2>
                <div>
                    <label>Palkka: </label>
                    <input type="text"/>
                    <button>Lisää</button>
                </div>
                <div>
                    <label>Tuet: </label>
                    <input type="text"/>
                    <button>Lisää</button>
                </div>
                <div>
                    <label>Lisää tulonlähde: </label>
                    <input type="text"/>
                    <label>Määrä: </label>
                    <input type="text"/>
                    <button>Lisää</button>
                </div>
                <div>Yhteensä: 
                    <input type="text"/>
                </div>
            </div>
            <div>    
                <h2>Menot (€): </h2>
                <div>
                    <label>Vuokra: </label>
                    <input type="text"/>
                    <button>Lisää</button>
                </div>
                <div>
                    <label>Ruokaostokset ja päivittäistavarat: </label>
                    <input type="text"/>
                    <button>Lisää</button>
                </div>
                <div>
                    <label>Ravintolat: </label>
                    <input type="text"/>
                    <button>Lisää</button>
                </div>
                <div>
                    <label>Viihde: </label>
                    <input type="text"/>
                    <button>Lisää</button>
                </div>
                <div>
                    <label>Sähkö: </label>
                    <input type="text"/>
                    <button>Lisää</button>
                </div>
                <div>
                    <label>Liikenne: </label>
                    <input type="text"/>
                    <button>Lisää</button>
                </div>
                <div>
                    <label>Lisää meno: </label>
                    <input type="text"/>
                    <label>Määrä: </label>
                    <input type="text"/>
                    <button>Lisää</button>
                </div>
                <div>Yhteensä: 
                    <input type="text"/>
                </div>
            </div>
            <textarea rows="20" cols="100">Tänne joku palkkisysteemi ja kirjallinen lista, 
                josta voi poistella asioita, jos tekee virheen. 
                Palkeilla havainnollistetaan mistä tulot ja menot muodostuvat. 
                Tulojen ja menojen erotus, säästöprosentti. Kuukausittainen seuranta?
            </textarea>
        </form>
        
    );
}*/