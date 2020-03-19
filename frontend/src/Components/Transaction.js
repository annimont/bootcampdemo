import React from 'react';
import './Transaction.css';

export default function Transaction(props) {
    return (
        <div className={`transaction ${props.type}`}>
            {props.onDelete && <button onClick={event => props.onDelete()}>X</button> }
            {props.children}
        </div>
    );

}