import React, {useState, useEffect} from 'react';
import gotService from '../../services/gotService.js';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import './randomChar.css';

function RandomChar({interval = 15000}){
    const service = new gotService();

    const [char, updateChar] = useState({});
    const [loading, updateLoading] = useState(true);
    const [error, updateError] = useState(false);

    const onCharLoaded = (newChar) => {
        updateChar(newChar);
        updateLoading(false);
    }

    const onError = () => {
        updateError(true);
        updateLoading(false);
    }

    const renderChar = () => {
        const id = Math.floor(Math.random() * 140 + 25);
        service.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }

    useEffect(() => {
        renderChar();
        let timerId = setInterval(renderChar, interval);
        return () => {
            clearInterval(timerId);
        };
    }, []);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;
    
    return (
        <div className="random-block rounded">
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
    
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>Random Character: {name ? name : '-'}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender ? gender : '-'}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born ? born : '-'}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died ? died : '-'}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture ? culture : '-'}</span>
                </li>
            </ul>
        </>
    )
}

export default RandomChar;