import React from 'react';
import './Transaction.css';
import AddListItem from './AddListItem'

export default function Transaction(props) {
    return (
        <div className={`transaction ${props.type}`}>
            {props.onDelete && <button className="delbutton" onClick={event => props.onDelete()}>X</button> }
            {props.children} 
            <AddListItem type={props.type} name={props.name}/> 
        </div>
    );

}