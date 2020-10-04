import React from 'react';
import { Table } from 'react-bootstrap';

export default function (props) {
    const { name = [], fields = [], data = [] } = props;
    return (
        <Table striped bordered hover size="sm" className="mb-0">
            <thead>
                <tr>
                    {name.map((item, i) => (
                        <th key={item + i}>{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => {
                    return (
                        <tr key={item.id}>
                            {fields.map((field) => {
                                return <td key={field}>{item[field]}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}
