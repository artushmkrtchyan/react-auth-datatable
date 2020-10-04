import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './dashboard.module.scss';

const Dashboard = () => {
    return (
        <Container className={styles.dashboard}>
            <Row className="mb-5">
                <Col md={12}>
                    <div className={styles.title}>Example</div>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
