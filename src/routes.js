import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import User from './components/User/Index';
import UserDetails from './components/User/User';
import UserCreate from './components/User/Create';
import AddressCreate from './components/Address/Create';
import City from './components/City/Index';
import CityCreate from './components/City/Create';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={User} />
            <Route exact path="/user/:id" component={UserDetails} />
            <Route exact path="/create" component={UserCreate} />
            <Route exact path="/user-edit/:id" component={UserCreate} />
            <Route exact path="/address-edit/:id" component={AddressCreate} />
            <Route exact path="/address-create" component={AddressCreate} />
            <Route exact path="/city" component={City} />
            <Route exact path="/city-create" component={CityCreate} />
            <Route exact path="/city-edit/:id" component={CityCreate} />
        </Switch>
    </BrowserRouter>
)

export default Routes;