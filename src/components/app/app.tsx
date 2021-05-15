import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BurgerMenu from '../burgerMenu/burger';
import { Memory, LetterHummer } from '../pages/pages';
// import { Helmet } from 'react-helmet';
// import icon from '../../img/icon.png'
import './app.scss';

const App = () => {
    return(
        <Router>
            <BurgerMenu />

            {/* <Route path='/' exact render={() => (
                <div>
                    <Helmet>
                        <title>Games</title>
                        <link rel="icon" href={icon} />
                    </Helmet>
                    <h1>Coming soon</h1>
                </div>
                )} /> */}
            <Route path='/' exact component={Memory} />
            <Route path='/memory' component={Memory} />
            <Route path='/letterhummer' component={LetterHummer} />
            
        </Router>
        
    )
}

export default App;