import React, {useState, useEffect} from 'react';
import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field] ? item[field] : '-'}</span>
        </li>
    );
}

export {Field};

function ItemDetails({itemId, getData, children}) {
    const [item, updateItem] = useState(null);

    useEffect(() => {
        renderItem();
    }, [itemId]);

    function renderItem() {
        if (!itemId) {
            return;
        }

        getData(itemId).then((item) => {
            updateItem(item);
        });
    }

    if(!item) {
        return <span className="select-err">Please select an item</span>
    }
    
    return (
        <div className="char-details rounded">
            <h4>{item.name ? item.name : '-'}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </div>
    );
    
}

export default ItemDetails;