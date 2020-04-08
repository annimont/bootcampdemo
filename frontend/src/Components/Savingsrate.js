export default function Savingsrate(props) {
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

    const rate = dif / moneyComes * 100;
    console.log(typeof rate);
    
    if (isNaN(rate)) {
        return '-';
    }
    else {
        return (
            rate.toFixed(1).replace('.', ',')
        );
    }
}