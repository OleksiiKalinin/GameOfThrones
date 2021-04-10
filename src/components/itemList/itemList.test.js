import React from 'react';
import ItemList from './itemList';
import {mount} from 'enzyme';
import gotService from '../../services/gotService';

describe('Testing <ItemList/>', () => {
    const service = new gotService();
    const list = mount(<ItemList
        getData={service.getAllHouses}
        renderItem={({name}) => name}/>);
    
    it('Click on item list must rerender all list in 1 instance', () => {
        list.setState({ItemList: [{name: 'vf', id: 1}, {name: 'vvf', id: 2}]});
        list.find('.list-group-item:first-child').simulate('click');
        expect(list.find('ul')).toHaveLength(1);
    });
});