import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';

function ItemList({getData, onItemSelected, renderItem}) {
    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData().then(data => {
            updateList(data)
        });
    }, []);

    function renderItems(arr) {
        return arr.map(item => {
            const label = renderItem(item);
            return (
                <li 
                    key={item.id}
                    className="list-group-item"
                    onClick={() => onItemSelected(item.id)}
                >
                    {label}
                </li>
            )
        });
    }

    if(!itemList) {
        return <Spinner/>
    }

    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

export default ItemList;