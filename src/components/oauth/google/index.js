import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { Button } from 'react-bootstrap';
import { oauth } from '../../../service/index';
import cnf from '../../../config/config';
import icon from '../../../assets/images/google.png';
import styles from './google.module.scss';

export const GoogleLogin = ({ text }) => {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const onSuccess = (res) => {
        const { email, familyName, givenName, googleId } = res.profileObj;
        const body = {
            email,
            firstName: familyName,
            lastName: givenName,
            oauthId: googleId,
            oauth: 'googleId',
        };
        oauth(body)
            .then((res) => {
                localStorage.setItem('token', res.token);
                history.push('/');
            })
            .catch(() => setShow(true));
    };

    const onFailure = (e) => {
        setShow(true);
        console.log('Login failed:', e);
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId: cnf.GOOGLE_CLIENT_ID,
        isSignedIn: false,
        accessType: 'offline',
    });

    const handleClick = () => {
        setShow(false);
        signIn();
    };

    return (
        <div>
            <Button
                onClick={handleClick}
                className={`${styles.signInBtn} d-flex justify-content-between btn btn-primary p-0 border-0`}
            >
                <div className="bg-light">
                    <img src={icon} alt="icon" />
                </div>
                <div className="p-2">{text}</div>
            </Button>
            {show && (
                <div className="text-danger text-center mt-2">Login failed</div>
            )}
        </div>
    );
};

export const GoogleLogout = () => {
    const onLogoutSuccess = () => {
        console.log('Logged out Success');
    };

    const onFailure = () => {
        console.log('Handle failure cases');
    };

    const { signOut } = useGoogleLogout({
        clientId: cnf.GOOGLE_CLIENT_ID,
        onLogoutSuccess,
        onFailure,
    });

    return <Button onClick={signOut}>Sign out</Button>;
};
