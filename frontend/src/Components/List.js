import React from 'react';
import ListItem from './ListItem';
import PieChart from './PieChart';
import './List.css';
import Sum from './Sum';
import Difference from './Difference';
import Savingsrate from './Savingsrate';

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
    //information for the piechart
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

    return(
        <React.Fragment>
            <div className='column'>
                <h2>Lista tuloista ja menoista</h2>
                <div className='lists'>
                    <div className='list'>
                        {listIncome}
                        <p className='yht'>Yhteensä: <Sum data={list} type='income'/> €</p>
                    </div>
                    <div className='list'>
                        {listExpense}
                        <p className='yht'>Yhteensä: <Sum data={list} type='expense'/> €</p>
                    </div>
                    <div className='savings'>
                        <p>Säästöön jää: <Difference data={list} typeA='income' typeB='expense'/> € </p>
                        <p>Säästöprosentti: <Savingsrate data={list} typeA='income' typeB='expense'/> %</p>
                    </div>
                </div>
            </div>
            <PieChart names={listOfExpenseNames} values={listOfExpenseValues}/>
        </React.Fragment>
    );
}