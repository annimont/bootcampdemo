import React from 'react';
import {Link} from 'react-router-dom';
import './Money.css';

export default function(props) {
    return (
        <div className='content'>
            <h1>Talousseuranta</h1>
            <p>Sivuston avulla voit tarkkailla, missä tilanteessa taloutesi on.</p>
            <p>Tuloja ja menoja seuraamalla pysyt paremmin perillä, mihin rahasi menevät ja kuinka moni vaivalla ansaitsemistasi pennosista jää säästöön.</p>
                <div className='link'>
                    <Link to='/money'>Tulojen ja menojen seuranta</Link>
                </div>
            <p>Nettovarallisuuslaskurin avulla saat kokonaiskuvan taloudestasi. Nettovarallisuutesi voi olla jopa negatiivinen, jos velkaa on enemmän kuin omaisuutta.</p>
                <div className='link'>
                    <Link to='/networth'>Nettovarallisuuslaskuri</Link>    
                </div>        
        </div>
    );
}