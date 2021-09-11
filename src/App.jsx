import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GlobalStyles from "./styles/GlobalStyles"

//VIEWS
import HomePage from './views/HomePage';
import ChartPage from './views/ChartPage';

const App = () =>{
    return(
        <>
            <GlobalStyles />
            <Router>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/chart/:coin" component={ChartPage}/>
            </Router>
        </>
    )
}

export default App