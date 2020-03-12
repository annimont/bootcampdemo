import React from 'react';

import fakeData from '../../fakedata/spices.json';

export default function SpiceList(props) {
    return (
        <div>{props.data.map(spice => <Spice name={spice.name}/>)}</div>
    )
}