import React from 'react';
import './Transaction.css';

export default function Transaction(props) {
    return (
        <div className={`transaction ${props.type}`}>
            {props.children}
            {props.onDelete && <button onClick={event => props.onDelete()}>X</button> }
        </div>
    );

}