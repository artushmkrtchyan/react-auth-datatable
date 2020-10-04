import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MicrosoftLogin from 'react-microsoft-login';
import cnf from '../../../config/config';
import { oauth } from '../../../service';

export default () => {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const authHandler = (err, data) => {
        setShow(false);
        console.log('data: ', data);
        console.log('err::: ', err);
        if (!err) {
            const { userPrincipalName, account = {} } = data;
            const { accountIdentifier, name = '', userName } = account;
            const idx = name.indexOf(' ');
            const firstName = idx ? name.slice(0, idx) : name || userName;
            const lastName = idx ? name.slice(idx) : '';

            if (!userName) return;

            const body = {
                email: userPrincipalName || userName,
                firstName,
                lastName,
                oauthId: accountIdentifier,
                oauth: 'microsoftId',
            };

            oauth(body)
                .then((res) => {
                    localStorage.setItem('token', res.token);
                    history.push('/');
                })
                .catch(() => setShow(true));
        }
    };

    return (
        <div>
            <MicrosoftLogin
                clientId={cnf.MICROSOFT_CLIENT_ID}
                prompt="select_account"
                withUserData={true}
                authCallback={authHandler}
            />
            {show && (
                <div className="text-danger text-center mt-2">
                    Login failed.
                </div>
            )}
        </div>
    );
};
