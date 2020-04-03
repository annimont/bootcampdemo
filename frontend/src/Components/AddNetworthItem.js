import React from 'react';

export default class AddNetworthItem extends React.Component {
    state = {
        type: this.props.type,
        name: '',
        value: ''
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
        .then(newNetworthItem => this.props.onNetworthItemAdded(newNetworthItem))
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={(event) => this.onSave(event)}>
                    <div>
                        <label>Lisää {this.props.lisaa}: </label>
                        <input required type='text' maxLength='18' name='name' onChange={(event) => this.handleInputChange(event)}/>
                        <label>Arvo: </label>
                        <input className='inputbox' required type='number' step="0.01" min='0.01' max='10000000' name='value' onChange={(event) => this.handleInputChange(event)}/>
                        <button name='type' value={this.props.type} type='submit'>Lisää</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}