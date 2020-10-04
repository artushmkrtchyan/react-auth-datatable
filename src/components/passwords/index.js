import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SetPasswords from './setPasswords';
import { DataTable, ConfirmModal } from '../shared';
import {
    changeFavorite,
    getPasswordsStart,
} from '../../redux/passwords/actions';
import starIcon from '../../assets/images/star.svg';
import starFillIcon from '../../assets/images/star-fill.svg';
import styles from './passwords.module.scss';

const Passwords = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [selected, setSelected] = useState([]);
    const [bulkAction, setBulkAction] = useState('');
    const [show, setShow] = useState(false);
    const {
        loading,
        passwords: { data = [], total = 0 },
    } = useSelector((state) => state.passwords);

    function starHeader(column, colIndex) {
        return <img className={styles.starIcon} src={starIcon} alt="icon" />;
    }

    const columns = [
        {
            dataField: 'personal',
            text: 'Star',
            csvExport: false,
            headerFormatter: starHeader,
            headerClasses: styles.starHeader,
            formatter: (cell, row) => (
                <img
                    className={styles.starIcon}
                    onClick={handleClickStar(row)}
                    src={cell ? starFillIcon : starIcon}
                    alt="icon"
                />
            ),
        },
        {
            dataField: 'name',
            text: 'Resource',
            sort: true,
        },
        {
            dataField: 'username',
            text: 'Username',
            sort: true,
        },
        {
            dataField: 'p00_',
            text: 'Passwords',
            csvExport: false,
            formatter: () => <span className={styles.passwordIcon}></span>,
        },
        {
            dataField: 'description',
            text: 'Description',
            sort: true,
            hidden: true,
        },
        {
            dataField: 'url',
            text: 'Url',
            sort: true,
        },
        {
            dataField: 'modified',
            text: 'Modified',
            sort: true,
            formatter: (cell) => new Date(cell).toGMTString(),
        },
        {
            dataField: 'created',
            text: 'Created',
            sort: true,
            formatter: (cell) => new Date(cell).toGMTString(),
            hidden: true,
        },
    ];

    useEffect(() => {
        dispatch(getPasswordsStart({ offset: 0, limit: sizePerPage }));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (bulkAction === 'delete' && selected.length) {
            setShow(true);
        }
    }, [bulkAction, selected]);

    const handleClickStar = (row) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(changeFavorite(row.id));
    };

    const handleDelete = () => {
        console.log('selected: ', selected);
    };

    const handleBulkAction = (rows, action) => {
        setSelected(rows);
        setBulkAction(action);
    };

    const handleTableChange = (
        type,
        { page, sizePerPage, searchText, sortField, sortOrder },
    ) => {
        const currentIndex = (page - 1) * sizePerPage;

        if (type === 'search' || type === 'sort') {
            setPage(1);
            setSizePerPage(sizePerPage);
        } else {
            setPage(page);
            setSizePerPage(sizePerPage);
        }

        dispatch(
            getPasswordsStart({
                offset: currentIndex,
                limit: sizePerPage + currentIndex,
                searchText,
                sortField,
                sortOrder,
            }),
        );
    };
    return (
        <div className={styles.content}>
            <SetPasswords data={selected} action={bulkAction} />
            <DataTable
                data={data}
                page={page}
                columns={columns}
                loading={loading}
                totalSize={total}
                sizePerPage={sizePerPage}
                csvFileName="passwords.csv"
                refreshData={() => {
                    setPage(1);
                    dispatch(
                        getPasswordsStart({ offset: 0, limit: sizePerPage }),
                    );
                }}
                handleTableChange={handleTableChange}
                handleBulkAction={(rows, action) =>
                    handleBulkAction(rows, action)
                }
            />
            <ConfirmModal
                show={show}
                handleClose={() => {
                    setBulkAction('');
                    setShow(false);
                }}
                handleConfirm={handleDelete}
            />
        </div>
    );
};

export default Passwords;
