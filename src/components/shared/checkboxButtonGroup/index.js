import React from 'react';
import { Button } from 'react-bootstrap';
import { arrayInsertNewItem } from '../../../helpers/helpers';

export default function ({ options = [], onChange, className }) {
    const handleClick = ({ name, status }) => () => {
        const idx = options.findIndex((item) => item.name === name);
        onChange(arrayInsertNewItem(options, idx, { name, status: !status }));
    };
    return (
        <div className={className}>
            {options.map((item, idx) => (
                <Button
                    key={idx}
                    variant={item.status ? 'success' : 'secondary'}
                    size="sm"
                    className="mr-2 mb-2"
                    onClick={handleClick(item)}
                >
                    {item.name}
                </Button>
            ))}
            <Button variant="light" size="sm" className="mr-2 mb-2 pr-3 pl-3">
                Add
            </Button>
        </div>
    );
}
