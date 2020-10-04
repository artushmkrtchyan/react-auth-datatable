import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Col, Form } from 'react-bootstrap';
import { resetPassword } from '../../service';
import { isValidEmail, isValidToken } from '../../helpers/helpers';
import logo from '../../assets/images/test.png';
import styles from './setPassword.module.scss';
import SubmitButton from '../shared/submitButton';

const ResetPassword = (props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [validationMessages, setValidationMessages] = useState({
        email: 'Please provide a valid email.',
        password: 'Please provide a valid password.',
        error: '',
    });
    const [body, setBody] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setBody((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setValidationMessages((prev) => ({
            ...prev,
            email: 'Please provide a valid email.',
            password: 'Please provide a valid password.',
            error: ''
        }));
        const form = event.currentTarget;

        setValidated(true);

        if (!isValidEmail(body.email)) {
            setBody((prev) => ({ ...prev, email: '' }));
            return;
        }

        if (form.checkValidity() === true) {
            if (props.match.params.token) {
                setLoading(true);
                resetPassword({
                    ...body,
                    token: props.match.params.token,
                })
                    .then(() => history.push('/login'))
                    .catch((e) => {
                        setLoading(false);
                        if (e.response.data.type) {
                            setBody((prev) => ({
                                ...prev,
                                [e.response.data.type]: '',
                            }));
                            setValidationMessages((prev) => ({
                                ...prev,
                                [e.response.data.type]: e.response.data.message,
                            }));
                        } else {
                            setValidationMessages((prev) => ({
                                ...prev,
                                error: e.response.data.message,
                            }));
                        }
                    });
            }
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
                <Col md={{ span: 6, offset: 3 }} className={styles.content}>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <div className={styles.title}>Reset Password</div>
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
                                    onChange={handleChange}
                                    value={body.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {validationMessages.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom02"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    name="password"
                                    onChange={handleChange}
                                    value={body.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {validationMessages.password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom03"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    value={body.confirmPassword}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid password.
                                </Form.Control.Feedback>
                            </Form.Group>
                            {validationMessages.error && (
                                <Form.Group as={Col} md="12">
                                    <div className="text-danger">
                                        {validationMessages.error}
                                    </div>
                                </Form.Group>
                            )}
                        </Form.Row>
                        <SubmitButton loading={loading} />
                    </Form>
                </Col>
            </div>
        </div>
    );
};
export default ResetPassword;
