import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import BurgerMenu from '../burgerMenu/burger';
import {Memory} from '../pages/pages';
import './app.scss';

const App: React.FC = () => {

    return(
        <Router>
            <BurgerMenu />


            {/* <Route path='/' exact render={() => <h1>Coming soon</h1>} /> */}
            <Route path='/' exact component={Memory} />
            <Route path='/memory' component={Memory} />
            <Route path='/letterhummer' render={() => <h1>Coming soon</h1>} />
            
        </Router>
        
    )
}

export default App;