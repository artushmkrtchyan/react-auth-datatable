import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';

export default function ({ data, reset, action }) {
    const [modalShow, setModalShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const initialBody = {
        name: '',
        asset_tag: '',
        assigned_to: '',
        location: '',
        purchase_date: '',
        warranty_expires: '',
        department: '',
        category: '',
        serial: '',
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
        reset();
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
                size="lg"
                show={modalShow}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        className="text-center"
                    >
                        Asset Information
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
                                        name="asset_tag"
                                        placeholder="Asset Tag"
                                        required
                                        onChange={handleChange}
                                        value={body.asset_tag}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        placeholder="Assignee"
                                        name="assigned_to"
                                        required
                                        onChange={handleChange}
                                        value={body.assigned_to}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        placeholder="Location"
                                        name="location"
                                        onChange={handleChange}
                                        value={body.location}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        placeholder="Purchase Date"
                                        name="purchase_date"
                                        required
                                        onChange={handleChange}
                                        value={body.purchase_date}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control
                                        placeholder="Warranty Expiration"
                                        name="warranty_expires"
                                        onChange={handleChange}
                                        value={body.warranty_expires}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        placeholder="Department"
                                        name="department"
                                        required
                                        onChange={handleChange}
                                        value={body.department}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        placeholder="Category"
                                        name="category"
                                        required
                                        onChange={handleChange}
                                        value={body.category}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        placeholder="Serial Number"
                                        name="serial"
                                        required
                                        onChange={handleChange}
                                        value={body.serial}
                                    />
                                </Form.Group>
                                <Button
                                    variant="success"
                                    type="submit"
                                    className="float-right pl-4 pr-4"
                                >
                                    Add
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
