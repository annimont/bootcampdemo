export default function Difference(props) {
    const moneyComes = props.data.filter(listItem => listItem.type === props.typeA)
    .map(
        itemData => {
            return parseFloat(itemData.value)
        }
    )
    .reduce((a, b) => a + b, 0);

    const moneyGoes = props.data.filter(listItem => listItem.type === props.typeB)
    .map(
        itemData => {
            return parseFloat(itemData.value)
        }
    )
    .reduce((a, b) => a + b, 0);

    const dif = moneyComes - moneyGoes;

    return (
        dif.toFixed(2).replace('.', ',')
    );
}