import React from 'react';
import { Form } from 'react-bootstrap';

export default function ({
    options = [],
    name = '',
    onChange,
    defaultValue = '',
    required = false,
}) {
    return (
        <Form.Control
            onChange={onChange}
            as="select"
            defaultValue={defaultValue}
            name={name}
        >
            {options.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </Form.Control>
    );
}
