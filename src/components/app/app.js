import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage';
import BookPage, { BooksItem } from '../pages/bookPage';
import HousePage from '../pages/housePage';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';


export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            charHidden: false,
            error: false
        }
        this.toggleChar = this.toggleChar.bind(this);
    }
    
    gotService = new gotService();

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    toggleChar() {
        this.setState(({charHidden}) => {
            return {
                charHidden: !charHidden
            }
        });
    }

    render() {
        const {charHidden} = this.state;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const randomCharBlock = !charHidden ? 
        <Row>
            <Col lg={{size: 5, offset: 0}}>
                <RandomChar interval={15000}/>
            </Col>
        </Row>
        :
        null;

        const event = !charHidden ? 'Hide' : 'Show';

        return (
            <Router> 
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        {randomCharBlock}
                        <Row>
                            <div className="toggle-char">
                                <button 
                                    className="button"
                                    onClick={this.toggleChar}
                                >
                                    {event} random character
                                </button>
                            </div>
                        </Row>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id}/>
                            }
                        }/>
                    </Container>
                </div>
            </Router>
        );
    }
};