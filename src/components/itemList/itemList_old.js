import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';

export default class ItemList extends Component {
    state = {
        itemList: null
    }

    componentDidMount() {
        const {getData} = this.props;
        getData().then(itemList => {
            this.setState({
                itemList
            });
        });
            
    }

    renderItems(arr) {
        return arr.map(item => {
            const label = this.props.renderItem(item);
            return (
                <li 
                    key={item.id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(item.id)}
                >
                    {label}
                </li>
            )
        });
    }

    render() {
        const {itemList} = this.state;

        if(!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}

ItemList.defaultProps = {
    onItemSelected: () => {}
}