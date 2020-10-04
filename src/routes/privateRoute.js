import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PrivateLayout from '../components/layouts/private';
import { isValidToken } from '../helpers/helpers';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <PrivateLayout>
        <Route
            {...rest}
            render={(props) =>
                isValidToken() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    </PrivateLayout>
);
