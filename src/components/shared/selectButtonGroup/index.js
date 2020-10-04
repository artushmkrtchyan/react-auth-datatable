import React from 'react';
import { Button } from 'react-bootstrap';
import xIcon from '../../../assets/images/x-icon.svg';

export default function ({ options = [], onChange, className }) {
    const handleChange = (el) => () => {
        const data = options.filter((item) => item !== el);
        onChange(data);
    };
    return (
        <div className={className}>
            {options.map((item, idx) => (
                <Button
                    key={idx}
                    variant="primary"
                    size="sm"
                    className="mr-2 mb-2"
                >
                    {item}
                    <span
                        className="d-inline-block ml-1"
                        onClick={handleChange(item)}
                    >
                        <img width="20px" src={xIcon} alt="x-icon" />
                    </span>
                </Button>
            ))}
            <Button variant="light" size="sm" className="mr-2 mb-2 pr-3 pl-3">
                Add
            </Button>
        </div>
    );
}
