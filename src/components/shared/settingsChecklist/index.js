import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { InputForm } from '../index';
import styles from './settingsChecklist.module.scss';

export default function () {
    const [fields, setFields] = useState([
        { id: 1, label: 'Order equipment', name: 'MA' },
        { id: 2, label: 'Add to acct Google Group', name: '' },
        { id: 3, label: 'Sent welcome email', name: '' },
    ]);

    const handleClick = (id, name) => () => {
        const newFields = fields.map((item) => {
            if (item.id === id) {
                item.name = name;
            }

            return item;
        });
        console.log('newFields: ', newFields);
        setFields(newFields);
    };

    const handleAdd = (label) => {
        setFields((prev) => {
            return [...prev, { id: prev.length + 1, label, name: '' }];
        });
    };

    return (
        <div className={styles.content}>
            <Form.Row>
                <Col className="text-left">
                    <div className="card-title mb-3">Checklist</div>
                </Col>
                <Col className="text-right mr-2">
                    <div className="card-title mb-3">Owner</div>
                </Col>
            </Form.Row>
            {fields.map((item, idx) => {
                return (
                    <Form.Row key={idx}>
                        <Col xs={9} className="pr-0">
                            <label className="btn btn-light w-100 text-left">
                                {item.label}
                            </label>
                        </Col>
                        <Col xs={3}>
                            {item.name ? (
                                <label className="btn btn-light ml-1 w-100">
                                    <span className={styles.name}>
                                        {item.name}
                                    </span>
                                </label>
                            ) : (
                                <label
                                    className="btn btn-light ml-1 w-100"
                                    onClick={handleClick(item.id, 'TE')}
                                >
                                    +
                                </label>
                            )}
                        </Col>
                    </Form.Row>
                );
            })}

            <InputForm
                col={9}
                btnName="+"
                placeholder="Click to add more"
                onSubmit={handleAdd}
                className={styles.inputForm}
            />
        </div>
    );
}
