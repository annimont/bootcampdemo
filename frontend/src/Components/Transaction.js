import React from 'react';
import './Transaction.css';
import AddListItem from './AddListItem'

export default function Transaction(props) {
    return (
        <div className={`transaction ${props.type}`}>
            {props.onDelete && <button className="delbutton" onClick={event => props.onDelete()}>X</button> }
            {props.children} 
            <AddListItem onListItemAdded={(newListItem) => setList([...list, newListItem])}/>
        </div>
    );

}