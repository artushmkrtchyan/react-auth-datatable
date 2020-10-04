import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Col } from 'react-bootstrap';
import { useGoogleLogout } from 'react-google-login';
import { GoogleLogin } from '../oauth/google';
import MicrosoftLogin from '../oauth/microsoft';
import { SubmitButton } from '../shared';
import { login, sendPasswordToken } from '../../service';
import { isValidEmail } from '../../helpers/helpers';
import logo from '../../assets/images/test.png';
import styles from './login.module.scss';
import cnf from '../../config/config';

const Login = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [messages, setMessages] = useState({
        email: 'Please provide a valid email.',
        password: 'Please provide a valid password.',
        verified: '',
    });
    const [body, setBody] = useState({
        email: '',
        password: '',
    });

    const { signOut } = useGoogleLogout({
        clientId: cnf.GOOGLE_CLIENT_ID,
        onLogoutSuccess: () => console.log('Logged out Success.'),
    });

    useEffect(() => {
        localStorage.removeItem('token');
        signOut();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setBody((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        setValidated(true);

        if (!isValidEmail(body.email)) {
            setBody((prev) => ({ ...prev, email: '' }));
            setMessages((prev) => ({
                ...prev,
                email: 'Please provide a valid email.',
            }));
            return;
        }

        if (form.checkValidity() === true) {
            setLoading(true);
            login(body)
                .then((res) => {
                    localStorage.setItem('token', res.token);
                    history.push('/');
                })
                .catch((e) => {
                    setLoading(false);
                    if (e.response.data.type === 'verified') {
                        setMessages((prev) => ({
                            ...prev,
                            verified: e.response.data.message,
                        }));
                        return;
                    }
                    if (e.response.data.type) {
                        setBody((prev) => ({
                            ...prev,
                            [e.response.data.type]: '',
                        }));
                        setMessages((prev) => ({
                            ...prev,
                            [e.response.data.type]: e.response.data.message,
                        }));
                        return;
                    }
                });
        }
    };
    return (
        <div className={styles.loginPage}>
            <div className="container">
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <Col md={{ span: 6, offset: 3 }} className={styles.content}>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <div className={styles.title}>Sign In</div>
                        <Form.Row>
                            {messages.verified && (
                                <Form.Group as={Col} md="12">
                                    <div className={styles.sendEmail}>
                                        {messages.verified}{' '}
                                        <span
                                            onClick={() =>
                                                sendPasswordToken({
                                                    email: body.email,
                                                })
                                            }
                                        >
                                            Confirm Your Email.
                                        </span>
                                    </div>
                                </Form.Group>
                            )}
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
                                    onChange={handleChange}
                                    value={body.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {messages.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom02"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    required
                                    name="password"
                                    onChange={handleChange}
                                    value={body.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {messages.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} sm="8">
                                <span>Don't have an account? </span>
                                <Link to="/register">Create an account.</Link>
                            </Form.Group>
                            <Form.Group as={Col} sm="4" className="text-right">
                                <Link to="/forgot-password">
                                    Forgot password?
                                </Link>
                            </Form.Group>
                        </Form.Row>
                        <SubmitButton text="Sign In" loading={loading} />
                        <div className="d-flex justify-content-between mt-3">
                            <GoogleLogin text="Sign in with Google" />
                            <MicrosoftLogin />
                        </div>
                    </Form>
                </Col>
            </div>
        </div>
    );
};

export default Login;
