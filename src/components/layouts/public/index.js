import React from 'react';
import styles from './public.module.scss';
import {strReplaceAll} from "../../../helpers/helpers";
import Sidebar from "../private/sidebar/sidebar";

const PublicLayout = ({ children }) => {
    const { title, path = '' } = children.props;
    return (
        <div
            className={`${styles.publicLayout} ${
                path.length > 1 ? strReplaceAll(path, '/', '_') : '_dashboard'
                }`}
        >
            <Sidebar />
            <div className={`${styles['content-wrapper']} d-flex flex-column`}>
                <div className="d-inline-flex justify-content-between">
                    <div className={styles.breadcrumb}>{title}</div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default PublicLayout;
