import React from 'react';

export default function Sum(props) {
    return (
        props.data.filter(listItem => listItem.type === props.type)
        .map(
            itemData => {
                return parseFloat(itemData.value)
            }
        )
        .reduce((a, b) => a + b, 0)
        .toFixed(2).replace('.', ',')
    );
}