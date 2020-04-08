import React, { useState, useEffect } from 'react';
import './Money.css';
import './Transaction.css';
import './List.css';
import AddNetworthItem from './AddNetworthItem';
import ListItem from './ListItem';
import Sum from './Sum';
import Difference from './Difference';

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
                    {`${networthItemData.name} ${parseFloat(networthItemData.value).toFixed(2).replace('.', ',')} €`}
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
                    {`${networthItemData.name} ${parseFloat(networthItemData.value).toFixed(2).replace('.', ',')} €`}
                </ListItem>
        }
    );  

    return (
        <React.Fragment>
        <div className='content'>
            <h1>Nettovarallisuuslaskuri</h1>
            <p>Nettovarallisuus lasketaan niin, että omaisuuden arvosta vähennetään velkojen määrä.</p>
            <p>Alle voit listata, mistä omaisuutesi ja velkasi koostuvat. </p>
            <div>
                <h2>Omaisuus</h2>
                <div className='networth'>
                    <div>
                        {assets}
                    </div>
                    <AddNetworthItem type='asset'
                    lisaa='omaisuutta'
                    onNetworthItemAdded={(newNetworthItem) => setNetworth([...networth, newNetworthItem])}/>
                    <p>Yhteensä: <Sum data={networth} type='asset'/> €</p>
                </div>
            </div>
            <div>    
                <h2>Velat</h2>
                <div className='networth'>
                    <div>
                        {debt}
                    </div>
                    <AddNetworthItem type='debt'
                    lisaa='velka'
                    onNetworthItemAdded={(newNetworthItem) => setNetworth([...networth, newNetworthItem])}/>
                    <p>Yhteensä: <Sum data={networth} type='debt'/> €</p>
                </div>
            </div>
            <div className='networth'>
                <p>Tämänhetkinen nettovarallisuutesi: <Difference data={networth} typeA='asset' typeB='debt'/> €</p>
            </div>
        </div>
        </React.Fragment>
    )
}