import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

export default function ({
    onSubmit,
    className = '',
    value: inputVal = '',
    btnName = 'Save',
    placeholder = '',
    col=10
}) {
    const [validated, setValidated] = useState(false);
    const [value, setValue] = useState(inputVal);

    const handleSubmit = (e) => {
        e.preventDefault();
        const val = value.trim();
        if (!val) {
            setValue('');
            setValidated(true);
            return;
        }
        onSubmit(value);
        setValue('');
        setValidated(false);
    };

    return (
        <Form.Row>
            <Col className={className} xs={col}>
                <Form.Control
                    type="text"
                    name="input"
                    value={value}
                    placeholder={placeholder}
                    isInvalid={validated}
                    onChange={(e) => setValue(e.target.value)}
                />
            </Col>
            <Col className={className} xs={12 - col}>
                <Button
                    className="ml-2"
                    type="button"
                    onClick={handleSubmit}
                >
                    {btnName}
                </Button>
            </Col>
        </Form.Row>
    );
}
