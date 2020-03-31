import React, { useState, useEffect } from 'react';
import './Money.css';
import './Transaction.css';
import './List.css';
import AddNetworthItem from './AddNetworthItem';
import ListItem from './ListItem';

export default function Networth(props) {
    const [networth, setNetworth] = useState([]);

    useEffect(() => {
    async function fetchData() {
        const res = await fetch('/api/networth');
        res
            .json()
            .then(data => setNetworth(data))
            .catch(err => console.log(err));
    }
    
    fetchData();
    }, []);

    const onDelete = (id) => {
        fetch(`/api/networth/${id}`, {
        method: 'DELETE'
        })
        .then(() =>
        setNetworth(networth.filter(networthItem => networthItem.id !== id))
        );
    }

    const assets = networth.filter(networthItem => networthItem.type === 'asset')
        .map(networthItemData => {
            return <ListItem 
                key={networthItemData.id} 
                type={networthItemData.type}
                name={networthItemData.name}
                value={networthItemData.value}
                onDelete={() => onDelete(networthItemData.id)}
                >
                    {`${networthItemData.name} ${networthItemData.value.toFixed(2)} €`}
                </ListItem>
        }
    );

    const debt = networth.filter(networthItem => networthItem.type === 'debt')
        .map(networthItemData => {
            return <ListItem 
                key={networthItemData.id} 
                type={networthItemData.type}
                name={networthItemData.name}
                value={networthItemData.value}
                onDelete={() => onDelete(networthItemData.id)}
                >
                    {`${networthItemData.name} ${networthItemData.value.toFixed(2)} €`}
                </ListItem>
        }
    );
    
    const allAssets = networth.filter(listItem => listItem.type === 'asset')
    .map(
        itemData => {
            return itemData.value
        }
    )
    .reduce((a, b) => a + b, 0);

    const allDebt = networth.filter(listItem => listItem.type === 'debt')
    .map(
        itemData => {
            return itemData.value
        }
    )
    .reduce((a, b) => a + b, 0);

    const currentNetworth = allAssets - allDebt;
        

    return (
        <React.Fragment>
        <div className='content'>
            <h1>Nettovarallisuuslaskuri</h1>
            <div>
                <h2>Omaisuus</h2>
                <div className='networth'>
                    <div>
                        {assets}
                    </div>
                    <p>Yhteensä: {allAssets.toFixed(2)} €</p>
                </div>
                <AddNetworthItem type='asset'
                    lisaa='omaisuutta'
                    onNetworthItemAdded={(newNetworthItem) => setNetworth([...networth, newNetworthItem])}/>
            </div>
            <div>    
                <h2>Velat</h2>
                <div className='networth'>
                    <div>
                        {debt}
                    </div>
                    <p>Yhteensä: {allDebt.toFixed(2)} €</p>
                </div>
                <AddNetworthItem type='debt'
                    lisaa='velka'
                    onNetworthItemAdded={(newNetworthItem) => setNetworth([...networth, newNetworthItem])}/>
            </div>
            <div className='networth'>
                <p>Tämänhetkinen nettovarallisuutesi: {`${currentNetworth.toFixed(2)} €`}</p>
            </div>
        </div>
        </React.Fragment>
    )
}