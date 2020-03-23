import React from 'react';

export default class AddListItem extends React.Component {
    state = {
        type: this.props.type,
        name: this.props.name,
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
        fetch('/api/moneylist', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(newListItem => this.props.onListItemAdded(newListItem)); //miten lisätyn itemin saa lisättyä listaan
        console.log(this.state);
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={(event) => this.onSave(event)}>
                    <div>
                        <input required className="inputbox" type="text" name="value" onChange={(event) => this.handleInputChange(event)}/>
                        <button className="addbutton" type="submit">Lisää</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}