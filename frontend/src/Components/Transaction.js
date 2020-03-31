import React, { useState, useEffect } from 'react';
import './Transaction.css';
import AddListItem from './AddListItem'

export default function Transaction(props) {
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
    
    return (
        <div className={`transaction ${props.type}`}>
            <AddListItem type={props.type} name={props.name} onListItemAdded={(newListItem) => setList([...list, newListItem])}/> 
            {props.onDelete && <button className='delbutton' onClick={event => props.onDelete()}>X</button> }
            {props.children} 
        </div>
    );

}