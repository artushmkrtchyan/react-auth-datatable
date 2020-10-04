import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';

export default function ({ data, action }) {
    const [modalShow, setModalShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const initialBody = {
        name: '',
        url: '',
        username: '',
        password: '',
        description: '',
    };

    const [body, setBody] = useState(initialBody);
    useEffect(() => {
        if (data.id && action !== 'delete') {
            console.log('data: ', data);
            setModalShow(true);
        }
    }, [data.id, action]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleClose = () => {
        setBody(initialBody);
        setValidated(false);
        setModalShow(false);
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setBody((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setValidated(true);
        const form = event.currentTarget;

        if (form.checkValidity() === true) {
            console.log('body: ', body);
            handleClose();
        }
    };

    return (
        <div className="text-right mb-2">
            <Button onClick={() => setModalShow(true)}>Create New</Button>
            <Modal
                size="md"
                show={modalShow}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        className="text-center"
                    >
                        Create a password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control
                                        name="name"
                                        placeholder="Name"
                                        required
                                        onChange={handleChange}
                                        value={body.name}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        name="url"
                                        placeholder="Url"
                                        required
                                        onChange={handleChange}
                                        value={body.url}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        required
                                        onChange={handleChange}
                                        value={body.password}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        placeholder="Description"
                                        name="description"
                                        onChange={handleChange}
                                        value={body.description}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Button
                                        variant="success"
                                        type="submit"
                                        className="float-right pl-4 pr-4"
                                    >
                                        Add
                                    </Button>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
