import {Pie} from 'react-chartjs-2';
import React from 'react';

export default class PieChart extends React.Component {
        state ={
            labels: this.props.data,
            datasets: [{
                data: [2, 4, 5],
                backgroundColor: ['red', 'blue', 'green']
            }]
        }
    
    
    render() {
        return (
            <div>
                <h2>Menojen jakautuminen</h2>
                <Pie
                    data={{
                        labels: this.state.labels,
                        datasets: this.state.datasets
                    }}
                    height='50%'
                />
                <br/>
            </div>
        )
    }
}