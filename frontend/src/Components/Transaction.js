import React from 'react';
import './Transaction.css';
import AddListItem from './AddListItem'

export default function Transaction(props) {
    
    return (
        <div className={`transaction ${props.type}`}>
            <AddListItem type={props.type} name={props.name} onListItemAdded={props.onListItemAdded}/> 
            {props.onDelete && <button className='delbutton' onClick={event => props.onDelete()}>X</button> }
            {props.children} 
        </div>
    );

}