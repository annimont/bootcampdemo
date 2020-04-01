import React from 'react';
import ListItem from './ListItem';
import PieChart from './PieChart';
import './List.css';

export default function List(props) {
    const {list} = props;

    const listIncome = list.filter(listItem => listItem.type === 'income')
        .map(
            listData => {
                return <ListItem key={listData.id} 
                    type={listData.type}
                    value={listData.value} 
                    onDelete={() => props.onListDelete(listData.id)}
                    >
                    {`${listData.name} ${listData.value.toFixed(2).replace('.', ',')} €`}
                    </ListItem>
            }
        )

    const listExpense = list.filter(listItem => listItem.type === 'expense')
        .map(
            listData => {
                return <ListItem key={listData.id} 
                    type={listData.type}
                    value={listData.value} 
                    onDelete={() => props.onListDelete(listData.id)}
                    >
                    {`${listData.name} ${listData.value.toFixed(2).replace('.', ',')} €`}
                    </ListItem>
            }
        )
    
    let expenseList = list.filter(listItem => listItem.type === 'expense');
    let groupedExpenses = [];
    
    expenseList.forEach(function (a) {
        if (!this[a.name]) {
            this[a.name] = { name: a.name, value: 0 };
            groupedExpenses.push(this[a.name]);
        }
        this[a.name].value += a.value;
    }, Object.create(null));


    const listOfExpenseNames = groupedExpenses.map(
        itemData => {
            return itemData.name
        }
    );

    const listOfExpenseValues = groupedExpenses.map(
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
            <div className='column'>
                <h2>Lista tuloista ja menoista</h2>
                <div className='lists'>
                    <div className='list'>
                        {listIncome}
                        <p className='yht'>Yhteensä: {incomeSum.toFixed(2).replace('.', ',')} €</p>
                    </div>
                    <div className='list'>
                        {listExpense}
                        <p className='yht'>Yhteensä: {expenseSum.toFixed(2).replace('.', ',')} €</p>
                    </div>
                    <div className='savings'>
                        <p>Säästöön jää: {savings.toFixed(2).replace('.', ',')} € </p>
                        <p>Säästöprosentti: {savingsRate.toFixed(1).replace('.', ',')} %</p>
                    </div>
                </div>
            </div>
            <PieChart names={listOfExpenseNames} values={listOfExpenseValues}/>
        </React.Fragment>
    );
}