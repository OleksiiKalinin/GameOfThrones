import React from 'react';
// import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <>
            <img src={process.env.PUBLIC_URL + ''} alt='error'></img><br/>
            <span>Something goes wrong</span>
        </>
    )
}

export default ErrorMessage;