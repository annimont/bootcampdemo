import React from 'react';

export default class AddNetworthItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            name: '',
            value: ''
        }
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.value;
        const inputName = target.name;
    
        this.setState({[inputName]: value,
        });
    }

    onSave(event) {
        event.preventDefault();
        fetch('/api/networth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(newNetworthItem => this.props.onNetworthItemAdded(newNetworthItem));
        
        console.log('TYYPPI ' + this.state.type);
        console.log('NIMI ' + this.state.name);
        console.log('ARVO ' + this.state.value);
        this.setState({
            name: '',
            value: ''
        }); 
    }

    render() {
        return (
            <React.Fragment>
                <form id='myForm' onSubmit={(event) => this.onSave(event)}>
                    <div>
                        <label>Lisää {this.props.lisaa}: </label>
                        <input required type='text' maxLength='18' name='name' value={this.state.name} onChange={(event) => this.handleInputChange(event)}/>
                        <label>Arvo: </label>
                        <input className='inputbox' required type='number' step="0.01" min='0.01' max='10000000' name='value' value={this.state.value} onChange={(event) => this.handleInputChange(event)}/>
                        <button name='type' value={this.props.type} type='submit'>Lisää</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}