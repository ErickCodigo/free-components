import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import AppByProps from './AppByProps';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={AppByProps} />
            </Switch>
        </BrowserRouter>
    )
};

export default Router;
