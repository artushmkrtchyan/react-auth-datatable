import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../assets/images/test.png';
import { Col, Form } from 'react-bootstrap';
import SubmitButton from '../shared/submitButton';
import { isValidEmail, isValidToken } from '../../helpers/helpers';
import { sendPasswordToken } from '../../service';
import styles from './setPassword.module.scss';

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [success, setSuccess] = useState('');
    const [message, setMessage] = useState('Please provide a valid email.');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        setValidated(true);

        if (!isValidEmail(email)) {
            setMessage('Please provide a valid email.');
            setEmail('');
            return;
        }

        if (form.checkValidity() === true) {
            setLoading(true);
            sendPasswordToken({ email })
                .then((res) => {
                    setSuccess(res.message);
                })
                .catch((e) => {
                    setLoading(false);
                    setMessage(e.response.data.message);
                    setEmail('');
                });
        }
    };
    if (isValidToken()) {
        return <Redirect to="/" />;
    }
    return (
        <div className={styles.forgotPasswordPage}>
            <div className="container">
                <div className={styles.topSection}>
                    <div className={styles.logo}>
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div>
                        <Link to="/login">Sign In</Link>
                    </div>
                </div>
                {success ? (
                    <div className={styles.resendEmail}>
                        {success}{' '}
                        <span onClick={() => sendPasswordToken({ email })}>
                            Resend email.
                        </span>
                    </div>
                ) : (
                    <Col md={{ span: 6, offset: 3 }} className={styles.content}>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <div className={styles.title}>Reset Password</div>
                            <p>
                                To reset your password, please provide your email.
                            </p>
                            <Form.Row>
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    controlId="validationCustom01"
                                >
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        onChange={({ target }) =>
                                            setEmail(target.value)
                                        }
                                        value={email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12">
                                    <span>Don't have an account? </span>
                                    <Link to="/register">
                                        Create an account.
                                    </Link>
                                </Form.Group>
                            </Form.Row>
                            <SubmitButton loading={loading} />
                        </Form>
                    </Col>
                )}
            </div>
        </div>
    );
};
export default ForgotPassword;
