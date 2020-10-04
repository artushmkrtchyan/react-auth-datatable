import React from 'react';
import { Route } from 'react-router-dom';
import PublicLayout from '../components/layouts/public';

export const PublicRoute = ({ component: Component, ...rest }) => (
    <PublicLayout>
        <Route {...rest} render={(props) => <Component {...props} />} />
    </PublicLayout>
);
