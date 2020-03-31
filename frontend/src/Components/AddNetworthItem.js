import React from 'react';

export default class AddNetworthItem extends React.Component {
    state = {
        type: this.props.type,
        name: "",
        value: ""
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
        fetch('/api/networth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(newNetworthItem => this.props.onTransactionAdded(newNetworthItem))
        .then(window.location.reload());
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={(event) => this.onSave(event)}>
                    <div>
                        <label>Lisää {this.props.lisaa}: </label>
                        <input required type="text" name="name" onChange={(event) => this.handleInputChange(event)}/>
                        <label>Arvo: </label>
                        <input className='inputbox' required type="text" name="value" onChange={(event) => this.handleInputChange(event)}/>
                        <button name="type" value={this.props.type} type="submit" onClick={(event) => this.handleInputChange(event)}>Lisää</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}