import React, { useEffect, useState } from 'react';
import { verifiedEmail } from '../../service';
import { Link } from 'react-router-dom';

export default function (props) {
    const [message, setMessage] = useState('');
    useEffect(() => {
        verifiedEmail({ token: props.match.params.token })
            .then(() => setMessage('success'))
            .catch((e) => setMessage(e.response.data.message));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="page-wrap d-flex flex-row align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <div className="mb-4 lead"></div>
                        {message === 'success' && (
                            <Link to="/login" className="btn btn-link">
                                ← Go to Login
                            </Link>
                        )}
                        {message && message !== 'success' ? (
                            <div className="text-danger">{message}</div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
