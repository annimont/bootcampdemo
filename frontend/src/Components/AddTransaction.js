import React from 'react';

export default class AddTransaction extends React.Component {
    state = {
        type: "",
        name: "",
        value: "",
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const inputName = target.name;
    
        this.setState({[inputName]: value});
      }

    onSave(event) {
        console.log("testi")
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
                        <label>Vuokra: </label>
                        <input
                            type="text" 
                            onChange={(event) => this.handleInputChange(event)}
                            />
                    </div>
                    <button type="submit">Lisää</button>
                </form>
            </React.Fragment>
        )
    }
}