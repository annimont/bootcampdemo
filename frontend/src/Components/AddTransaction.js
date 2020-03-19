import React from 'react';

export default class AddIncome extends React.Component {
    state = {
        type: "",
        name: ""
    }

    handleInputChangeTulo(event) {
        const target = event.target;
        const value = target.value;
        const inputName = target.name;
    
        this.setState({[inputName]: value,
            type: "income"
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
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={(event) => this.onSave(event)}>
                    <div>
                        <label>Lisää tulonlähde: </label>
                        <input required type="text" name="name" onChange={(event) => this.handleInputChangeTulo(event)}/>
                    </div>
                    <button type="submit">Lisää</button>
                </form>
            </React.Fragment>
        );
    }
}