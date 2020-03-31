import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import PieChart from './PieChart';
import './List.css';

export default function List(props) {
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

    const onDelete = (id) => {
        fetch(`/api/moneylist/${id}`, {
        method: 'DELETE'
        })
        .then(() =>
        setList(list.filter(transaction => transaction.id !== id))
        );
    }

    /*
    const listElements = list.map(
        listData => {
            return <ListItem key={listData.id} 
                type={listData.type}
                value={listData.value} 
                onDelete={() => onDelete(listData.id)}
                >
                {`${listData.name} ${listData.value} €`}
                </ListItem>
        }
    )*/

    const listIncome = list.filter(listItem => listItem.type === 'income')
        .map(
            listData => {
                return <ListItem key={listData.id} 
                    type={listData.type}
                    value={listData.value} 
                    onDelete={() => onDelete(listData.id)}
                    >
                    {`${listData.name} ${listData.value.toFixed(2)} €`}
                    </ListItem>
            }
        )

    const listExpense = list.filter(listItem => listItem.type === 'expense')
        .map(
            listData => {
                return <ListItem key={listData.id} 
                    type={listData.type}
                    value={listData.value} 
                    onDelete={() => onDelete(listData.id)}
                    >
                    {`${listData.name} ${listData.value.toFixed(2)} €`}
                    </ListItem>
            }
        )
    
    //sähläys alkaa
    
    const filteredExpenseList = list.filter(listItem => listItem.type === 'expense');

    function groupBy(objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
          let key = obj[property]
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(obj)
          return acc
        }, {})
      }
      
    let groupedExpenses = groupBy(filteredExpenseList, 'name')
    
    console.log(groupedExpenses);

    // sähläys päättyy

    const listOfExpenseNames = list.filter(listItem => listItem.type === 'expense')
    .map(
        itemData => {
            return itemData.name
        }
    );

    const listOfExpenseValues = list.filter(listItem => listItem.type === 'expense')
    .map(
        itemData => {
            return itemData.value
        }
    );

    const incomeSum = list.filter(listItem => listItem.type === 'income')
        .map(
            itemData => {
                return itemData.value
            }
        )
        .reduce((a, b) => a + b, 0);

    const expenseSum = list.filter(listItem => listItem.type === 'expense')
        .map(
            itemData => {
                return itemData.value
            }
        )
        .reduce((a, b) => a + b, 0);
    
    const savings = incomeSum - expenseSum;

    const savingsRate = savings / incomeSum * 100;

    return(
        <React.Fragment>
            <div className="column">
                <h2>Lista tuloista ja menoista</h2>
                <div className="lists">
                    <div className="list">
                        {listIncome}
                        <p className="yht">Yhteensä: {incomeSum.toFixed(2)} €</p>
                    </div>
                    <div className="list">
                        {listExpense}
                        <p className="yht">Yhteensä: {expenseSum.toFixed(2)} €</p>
                    </div>
                    <div className="savings">
                        <p>Säästöön jää: {savings.toFixed(2)} € </p>
                        <p>Säästöprosentti: {savingsRate.toFixed(1)} %</p>
                    </div>
                </div>
            </div>
            <PieChart names={listOfExpenseNames} values={listOfExpenseValues}/>
        </React.Fragment>
    );
}