import React from 'react';
import {Route,Switch,BrowserRouter} from 'react-router-dom';

import Welcome from './container/Welcome';
import QuizPage from './container/QuizPage';

class Routes extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Welcome}></Route>
                    <Route path="/quiz" component={QuizPage}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routes;

