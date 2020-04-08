import React from 'react';

export default class AddTransaction extends React.Component {
    state = {
        type: '',
        name: ''
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const inputName = target.name;
    
        this.setState({[inputName]: value,
        });
    }

    onSave(event) {
        event.preventDefault();
        fetch('/api/money', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(newTransaction => this.props.onTransactionAdded(newTransaction));
        this.setState({
            name: ''
        }); 
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={(event) => this.onSave(event)}>
                    <div>
                        <label>Lisää {this.props.lisaa}: </label>
                        <input required 
                            type='text' maxLength='18' 
                            name='name' value={this.state.name} 
                            onChange={(event) => this.handleInputChange(event)}/>
                        <button name='type' value={this.props.type} type='submit' 
                            onClick={(event) => this.handleInputChange(event)}>Lisää</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}