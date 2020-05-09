import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Link, useHistory } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Logon from './pages/Logon';
import Header from './pages/Dashboard/Header';
import index from './pages/Dashboard/index';
import NewAuction from './pages/Auction/NewAuction';
import RoomAuction from './pages/Auction/RoomAuction';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/Login" component={Logon} />
                <Fragment>
                    <Header Link={Link} useHistory={useHistory} />
                    <PrivateRoute Link={Link} exact path="/" component={index} />
                    <PrivateRoute path="/auction/new" component={NewAuction} />
                    <PrivateRoute path="/auction/room/:act_id" component={RoomAuction} />
                </Fragment>
            </Switch>
        </BrowserRouter>
    );
}
