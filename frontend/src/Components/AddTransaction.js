import React from 'react';

export default class AddTransaction extends React.Component {
    state = {
        type: "",
        name: ""
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const inputName = target.name;
    
        this.setState({[inputName]: value});
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
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={(event) => this.onSave(event)}>
                <div>
                    <label>Tyyppi: </label>
                    <select
                        required
                        name="type" 
                        onChange={(event) => this.handleInputChange(event)}
                        >
                        <option value="" selected disabled hidden>Please select one</option>
                        <option value="income">Tulo</option>
                        <option value="expense">Meno</option>
                    </select>
                    </div>
                    <div>
                        <label>Nimi: </label>
                        <input required type="text" name="name" onChange={(event) => this.handleInputChange(event)}/>
                    </div>
                    <button type="submit">Lisää</button>
                </form>
            </React.Fragment>
        );
    }
}