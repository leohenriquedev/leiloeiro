import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const isAuth = () => {
        if (localStorage.getItem('token') !== null) {
            return true;
        }
        return false;
    }

    return (
        <Route {...rest} render={props => (
            isAuth() ?
                <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    );
}

export default PrivateRoute;