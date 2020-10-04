import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { PrivateRoute } from './privateRoute';
import { PublicRoute } from './publicRoute';

import Dashboard from '../components/dashboard';
import Assets from '../components/assets';
import Login from '../components/login';
import Register from '../components/register';
import NotFound from '../components/404';
import Passwords from '../components/passwords';
import VerifiedEmail from '../components/verified-email';
import ForgotPassword from '../components/set-password/forgot';
import ResetPassword from '../components/set-password/reset';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <PublicRoute
                    exact
                    path="/"
                    component={Dashboard}
                    title="Dashboard"
                />
                <PrivateRoute
                    path="/assets"
                    component={Assets}
                    title="Assets"
                />
                <PrivateRoute
                    path="/passwords"
                    component={Passwords}
                    title="Passwords"
                />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route
                    path="/verified-email/:token"
                    component={VerifiedEmail}
                />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route
                    path="/reset-password/:token"
                    component={ResetPassword}
                />
                <Route
                    path="/404"
                    render={(props) => <NotFound {...props} />}
                />
                <Redirect from="*" to="/404" />
            </Switch>
        </Router>
    );
};

export default Routes;
