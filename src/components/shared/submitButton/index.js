import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

export default function ({ text = 'Submit', loading, variant = 'primary' }) {
    return (
        <>
            {loading ? (
                <Button variant={variant} disabled>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    &nbsp;Loading...
                </Button>
            ) : (
                <Button type="submit" variant={variant}>
                    {text}
                </Button>
            )}
        </>
    );
}
