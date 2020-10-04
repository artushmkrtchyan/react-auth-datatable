import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import SetAssets from './setAssets';
import { DataTable, ConfirmModal } from '../shared';
import { getAssetsStart } from '../../redux/assets/actions';
import styles from './assets.module.scss';
import copyIcon from '../../assets/images/copy.svg';
import pencilIcon from '../../assets/images/pencil.svg';
import trashIcon from '../../assets/images/trash.svg';

const Assets = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [asset, setAsset] = useState({});
    const [action, setAction] = useState('');
    const [show, setShow] = useState(false);
    const {
        loading,
        assets: { data = [], total = 0 },
    } = useSelector((state) => state.assets);

    const columns = [
        {
            dataField: 'image',
            text: 'Device Image',
            formatter: (cellContent) => (
                <div className={styles.deviceImg}>
                    <img src={cellContent} alt="Device" />
                </div>
            ),
            sort: true,
        },
        {
            dataField: 'asset_tag',
            text: 'Asset Tag',
            sort: true,
        },
        {
            dataField: 'serial',
            text: 'Serial',
            sort: true,
        },
        {
            dataField: 'eol.formatted',
            text: 'EOL',
            sort: true,
            hidden: true,
        },
        {
            dataField: 'model.name',
            text: 'Model',
            sort: true,
        },
        {
            dataField: 'category.name',
            text: 'Category',
            sort: true,
        },
        {
            dataField: 'status_label',
            text: 'Status',
            sort: true,
            formatter: (cell) => (
                <div>
                    <span
                        className={`${styles.statusCircle} ${
                            cell.status_meta === 'deployed'
                                ? ' bg-primary'
                                : 'bg-success'
                        }`}
                    ></span>
                    {cell.name}
                </div>
            ),
        },
        {
            dataField: 'assigned_to.name',
            text: 'Checked Out To',
            sort: true,
        },
        {
            dataField: 'updated_at.formatted',
            text: 'Updated',
            sort: true,
            hidden: true,
        },
        {
            dataField: 'created_at.formatted',
            text: 'Created',
            sort: true,
            hidden: true,
        },
        {
            dataField: 'user_can_checkout',
            text: 'Checkout/Checkin',
            formatter: (cellContent) => (
                <div>
                    {cellContent ? (
                        <button
                            variant="light"
                            className="btn btn-sm bg-maroon"
                            title="Check this item out"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('onclick: action');
                            }}
                        >
                            Checkout
                        </button>
                    ) : (
                        <button
                            className="btn btn-sm bg-purple"
                            title="Check this item out"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('onclick: action');
                            }}
                        >
                            Checkin
                        </button>
                    )}
                </div>
            ),
        },
        {
            dataField: 'available_actions',
            text: 'Actions',
            csvExport: false,
            formatter: (cellContent, row) => (
                <div className={styles.actions}>
                    {cellContent.clone && (
                        <Button
                            variant="info"
                            title="Clone Item"
                            onClick={handleClick(row, 'clone')}
                        >
                            <img src={copyIcon} alt="icon" />
                        </Button>
                    )}
                    {cellContent.update && (
                        <Button
                            variant="warning"
                            title="Update Item"
                            onClick={handleClick(row, 'update')}
                        >
                            <img src={pencilIcon} alt="icon" />
                        </Button>
                    )}
                    {cellContent.delete && (
                        <Button
                            variant="danger"
                            title="Delete Item"
                            onClick={handleClick(row, 'delete')}
                        >
                            <img src={trashIcon} alt="icon" />
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    useEffect(() => {
        dispatch(getAssetsStart({ offset: 0, limit: sizePerPage }));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleClick = (row, action) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (action === 'delete') {
            setShow(true);
        }
        setAsset(row);
        setAction(action);
    };

    const handleDelete = () => {
        console.log('id: ', asset.id);
        setAsset({});
        setAction('');
    };

    const handleBulkAction = (rows, action) => {
        console.log(action, rows);
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
            getAssetsStart({
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
            <SetAssets
                data={asset}
                action={action}
                reset={() => setAsset({})}
            />
            <DataTable
                data={data}
                page={page}
                columns={columns}
                loading={loading}
                totalSize={total}
                sizePerPage={sizePerPage}
                csvFileName="assets.csv"
                refreshData={() => {
                    setPage(1);
                    dispatch(getAssetsStart({ offset: 0, limit: sizePerPage }));
                }}
                handleTableChange={handleTableChange}
                handleBulkAction={(rows, action) =>
                    handleBulkAction(rows, action)
                }
            />
            <ConfirmModal
                show={show}
                handleClose={() => setShow(false)}
                handleConfirm={handleDelete}
            />
        </div>
    );
};

export default Assets;
