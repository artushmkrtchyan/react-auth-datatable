import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar/sidebar';
import styles from './private.module.scss';
import { strReplaceAll } from '../../../helpers/helpers';

const PrivateLayout = ({ children }) => {
    const { title, path = '' } = children.props;
    return (
        <div
            className={`${styles.wrapper} ${
                path.length > 1 ? strReplaceAll(path, '/', '_') : '_dashboard'
            }`}
        >
            <Sidebar />
            <div className={`${styles['content-wrapper']} d-flex flex-column`}>
                <div className="d-inline-flex justify-content-between">
                    <div className={styles.breadcrumb}>{title}</div>
                    <div>
                        <Link className={styles.breadcrumb} to="/login">
                            Sign Out
                        </Link>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default PrivateLayout;
