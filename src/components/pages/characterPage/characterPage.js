import React, { Component } from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class CharacterPage extends Component {
    constructor() {
        super();
        this.page = Math.floor(Math.random() * 214 + 0);
    }

    gotService = new gotService();
    
    state = {
        selectedChar: 140,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        
        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={() => this.gotService.getAllCharacters(this.page)}
                renderItem={({name, gender}) => `${name} (${gender})`}/>
        );

        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedChar}
                getData={this.gotService.getCharacter}
            >
                <Field field={'gender'} label={'Gender'}/>
                <Field field={'born'} label={'Born'}/>
                <Field field={'died'} label={'Died'}/>
                <Field field={'culture'} label={'Culture'}/>
            </ItemDetails>
        );

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        );
    }
}