import React from 'react';

export default class AddListItem extends React.Component {
    state = {
        type: this.props.type,
        name: this.props.name,
        value: null
    }

    handleInputChange(event) {
        const target = event.target;
        const value = parseFloat(target.value);
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
        .then(newListItem => this.props.onListItemAdded(newListItem));

        console.log('TYYPPI ' + this.state.type);
        console.log('NIMI ' + this.state.name);
        console.log('ARVO ' + this.state.value);
        this.setState({
            value: ''
        }); 
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={(event) => this.onSave(event)}>
                    <div className='addArea'>
                        <input required 
                            className='inputbox' 
                            type='number' step="0.01" min='0.01' max='10000000' 
                            name='value' value={this.state.value} 
                            onChange={(event) => this.handleInputChange(event)}/>
                        <button className='addbutton' type='submit'>Lisää</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}