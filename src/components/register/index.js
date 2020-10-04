import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Col } from 'react-bootstrap';
import SubmitButton from '../shared/submitButton';
import MicrosoftLogin from '../oauth/microsoft';
import { GoogleLogin } from '../oauth/google';
import { register, sendPasswordToken } from '../../service';
import { isValidEmail } from '../../helpers/helpers';
import logo from '../../assets/images/test.png';
import styles from './register.module.scss';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [success, setSuccess] = useState('');
    const [validationMessages, setValidationMessages] = useState({
        firstName: 'First Name is required.',
        lastName: 'Last Name is required.',
        email: 'Please provide a valid email.',
        password: 'Please provide a valid password.',
    });
    const [body, setBody] = useState({
        firstName: '',
        lastName: '',
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
        }));
        const { password, confirmPassword } = body;
        const form = event.currentTarget;

        setValidated(true);

        if (!password.length || password !== confirmPassword) {
            setBody((prev) => ({ ...prev, password: '', confirmPassword: '' }));
            return;
        }

        if (!isValidEmail(body.email)) {
            setBody((prev) => ({ ...prev, email: '' }));

            return;
        }

        if (form.checkValidity() === true) {
            setLoading(true);
            register(body)
                .then((res) => {
                    setSuccess(res.message);
                })
                .catch((e) => {
                    setLoading(false);
                    if (e.response.data.message && e.response.data.type) {
                        setBody((prev) => ({
                            ...prev,
                            [e.response.data.type]: '',
                        }));
                        setValidationMessages((prev) => ({
                            ...prev,
                            [e.response.data.type]: e.response.data.message,
                        }));
                    }
                });
        }
    };
    return (
        <div className={styles.registerPage}>
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
                        <span
                            onClick={() =>
                                sendPasswordToken({ email: body.email })
                            }
                        >
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
                            <div className={styles.title}>Sign Up</div>
                            <div className={styles.subTitle}>
                                Please fill in this form to create an account
                            </div>
                            <Form.Row>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    controlId="validationCustom01"
                                >
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="First name"
                                        name="firstName"
                                        onChange={handleChange}
                                        value={body.firstName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {validationMessages.firstName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    controlId="validationCustom02"
                                >
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Last name"
                                        name="lastName"
                                        onChange={handleChange}
                                        value={body.lastName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {validationMessages.lastName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    controlId="validationCustom03"
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
                            </Form.Row>

                            <Form.Row>
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    controlId="validationCustom04"
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
                                        {validationMessages.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    controlId="validationCustom05"
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
                            </Form.Row>

                            <Form.Group>
                                <Form.Check
                                    required
                                    label={
                                        <span>
                                            I accept the{' '}
                                            <Link to="/">Terms of Use</Link> &{' '}
                                            <Link to="/">Privacy Policy</Link>
                                        </span>
                                    }
                                    feedback="You must agree before submitting."
                                    name="accept"
                                />
                            </Form.Group>
                            <SubmitButton text="Sign Up" loading={loading} />
                            <div className="d-flex justify-content-between mt-3">
                                <GoogleLogin text="Sign in with Google" />
                                <MicrosoftLogin />
                            </div>
                        </Form>
                    </Col>
                )}
            </div>
        </div>
    );
};

export default Register;
