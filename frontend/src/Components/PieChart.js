import {Pie} from 'react-chartjs-2';
import React from 'react';

export default class PieChart extends React.Component {
     
    render() {
        return (
            <div className="column">
                <h2>Menojen jakautuminen</h2>
                <Pie
                    data={{
                        labels: this.props.names,
                        datasets: [{
                            data: this.props.values,
                            backgroundColor: ['#5CCFB9', '#D1F452', '#FF6F58', '#CF5048', '#344994', '#E7AB73', '#6DF9C0', '#C3EB5D', '#B2F4D5', '#F284CD', '#FA5D74', '#CC5704', '#1CB05B', '#4FDA76', '#0EF9E2', '#5CE602', '#019367', '#FF9A2B', '#9A16EA', '#FAEC1E', '#FFACB1', '#BBAAF2', '#B3B20B']
                        }]
                    }}
                    height='200%'
                />
                <br/>
            </div>
        )
    }
}