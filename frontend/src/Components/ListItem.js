import React from 'react';

export default function ListItem(props) {
    return (
        <div className={`transaction ${props.type}`}>
            {props.onDelete && <button className="delbutton" onClick={event => props.onDelete()}>X</button> }
            {props.children} 
        </div>
    );
}