import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';

export default function Money(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/money');
            res
                .json()
                .then(data => setList(data))
                .catch(err => console.log(err));
        }
        
    fetchData();
    }, []);

    const onDelete = (id) => {
        fetch(`/api/money/${id}`, {
        method: 'DELETE'
        })
        .then(() =>
        setList(list.filter(transaction => transaction.id !== id))
        );
    }

    const listElements = list.map(
        listData => {
            return <ListItem key={listData.id} 
                type={listData.type} 
                onDelete={() => onDelete(listData.id)}>{listData.name}</ListItem>
            }
        )

    return(
        <div>
            <textarea>{listElements}</textarea>
        </div>
    );
}