import React from 'react';

export default function Networth(props) {
    return ( 
        <form>
            <div>Täällä lasketaan nettovarallisuus (omaisuus miinus velat)</div>
            <div>
                <label>Omaisuus: </label>
                <input type="text"></input>
            </div>
            <div>    
                <label>Velat: </label>
                <input type="text"></input>
            </div>
            <div>Tänne joku palkki tai käppyrä, josta voi seurata nettovarallisuuden kehittymistä.</div>
        </form>
    )
}