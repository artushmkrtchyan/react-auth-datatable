import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ({
    show = false,
    title = 'Delete',
    text = 'Are you sure you wish to delete ?',
    handleConfirm,
    handleClose,
}) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{text}</Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Button variant="light" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        handleConfirm();
                        handleClose();
                    }}
                >
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
