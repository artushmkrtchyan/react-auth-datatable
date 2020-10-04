import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    PaginationTotalStandalone,
    SizePerPageDropdownStandalone,
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { Spinner } from 'react-bootstrap';
import TableToolbar from './tableToolbar';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import styles from './table.module.scss';

export default function ({
    data,
    columns,
    loading,
    totalSize,
    handleTableChange,
    page = 1,
    sizePerPage = 1,
    refreshData = () => {},
    handleBulkAction = () => {},
    csvFileName = 'file.csv',
}) {
    const [selected, setSelected] = useState([]);

    const handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            setSelected((prev) => [...prev, row]);
        } else {
            setSelected((prev) => prev.filter((i) => i.id !== row.id));
        }
    };

    const handleOnSelectAll = (isSelect, rows) => {
        if (isSelect) {
            setSelected(rows);
        } else {
            setSelected([]);
        }
    };

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        bgColor: '#fff8af',
        onSelect: handleOnSelect,
        onSelectAll: handleOnSelectAll,
    };

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total text-dark ml-2">
            Showing {from} to {to} of {size} Rows
        </span>
    );

    const options = {
        page,
        totalSize,
        sizePerPage,
        custom: true,
        paginationSize: 4,
        pageStartIndex: 1,
        alwaysShowAllBtns: true,
        withFirstAndLast: true,
        hidePageListOnlyOnePage: true,
        prePageText: 'Prev',
        nextPageText: 'Next',
        firstPageText: 'First',
        lastPageText: 'Last',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        sizePerPageList: [
            {
                text: '10',
                value: 10,
            },
            {
                text: '20',
                value: 20,
            },
            {
                text: '40',
                value: 40,
            },
            {
                text: 'All',
                value: totalSize,
            },
        ],
    };

    return (
        <PaginationProvider pagination={paginationFactory(options)}>
            {({ paginationProps, paginationTableProps }) => (
                <ToolkitProvider
                    keyField="id"
                    data={data}
                    columns={columns}
                    search
                    columnToggle
                    exportCSV={{ fileName: csvFileName }}
                    bootstrap4
                >
                    {(props) => (
                        <div className={styles.content}>
                            <TableToolbar
                                {...props}
                                refreshData={refreshData}
                                disabled={!selected.length}
                                handleBulkAction={(action) =>
                                    handleBulkAction(selected, action)
                                }
                            />
                            <div className={styles.paginationContent}>
                                <div>
                                    <SizePerPageDropdownStandalone
                                        {...paginationProps}
                                    />
                                    <PaginationTotalStandalone
                                        {...paginationProps}
                                    />
                                </div>
                                <PaginationListStandalone
                                    {...paginationProps}
                                />
                            </div>
                            <BootstrapTable
                                remote
                                classes="table-striped snipe-table table-no-bordered"
                                selectRow={selectRow}
                                bordered={false}
                                loading={loading}
                                onTableChange={handleTableChange}
                                {...paginationTableProps}
                                noDataIndication={
                                    loading ? (
                                        <Spinner
                                            animation="border"
                                            variant="primary"
                                        />
                                    ) : (
                                        'There is no data to show'
                                    )
                                }
                                {...props.baseProps}
                            />
                            <div className={styles.paginationContent}>
                                <div>
                                    <SizePerPageDropdownStandalone
                                        {...paginationProps}
                                    />
                                    <PaginationTotalStandalone
                                        {...paginationProps}
                                    />
                                </div>
                                <PaginationListStandalone
                                    {...paginationProps}
                                />
                            </div>
                        </div>
                    )}
                </ToolkitProvider>
            )}
        </PaginationProvider>
    );
}
