import React, { useState } from 'react';
import styles from './table.module.scss';
import {
    Button,
    ButtonGroup,
    DropdownButton,
    Dropdown,
    Form,
} from 'react-bootstrap';
import repeat from '../../../assets/images/arrow-repeat.svg';
import layoutSplit from '../../../assets/images/layout-split.svg';
import downloadIcon from '../../../assets/images/download-icon.svg';

const TableToolbar = ({
    searchProps,
    columnToggleProps,
    csvProps,
    refreshData,
    handleBulkAction,
    disabled,
}) => {
    const [action, setAction] = useState('edit');
    const { onSearch, searchText } = searchProps;
    const { onExport } = csvProps;
    const { columns, onColumnToggle, toggles } = columnToggleProps;

    const handleRefresh = () => {
        if (searchText) {
            onSearch('');
        } else {
            refreshData();
        }
    };
    return (
        <div className={styles.tableToolbar}>
            <div className={styles.bulkActions}>
                <Form
                    inline
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleBulkAction(action);
                    }}
                >
                    <Form.Control
                        as="select"
                        defaultValue={action}
                        onChange={(e) => setAction(e.target.value)}
                    >
                        <option value="edit">Edit</option>
                        <option value="delete">Delete</option>
                    </Form.Control>
                    <Button className="ml-2" type="submit" disabled={disabled}>
                        Go
                    </Button>
                </Form>
            </div>
            <div className="d-sm-flex">
                <div className={styles.search}>
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <input
                        name="search"
                        aria-label="search"
                        className="form-control"
                        type="text"
                        value={searchText}
                        placeholder="Search"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
                <ButtonGroup className={styles.btnGroups}>
                    <Button variant="light" onClick={handleRefresh}>
                        <img src={repeat} alt="icon" />
                    </Button>
                    <DropdownButton
                        alignRight
                        variant="light"
                        as={ButtonGroup}
                        title={<img src={layoutSplit} alt="icon" />}
                    >
                        {columns.map((column, idx) => (
                            <Dropdown.Item
                                key={column.dataField + idx}
                                eventKey={column.dataField + idx}
                                onClick={() => onColumnToggle(column.dataField)}
                            >
                                <input
                                    type="checkbox"
                                    id={`dropdownCheck${column.dataField}`}
                                    checked={toggles[column.dataField]}
                                    onChange={() => {}}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={`dropdownCheck${column.dataField}`}
                                >
                                    {column.text}
                                </label>
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                    <Button variant="light" onClick={() => onExport()}>
                        {<img src={downloadIcon} alt="icon" />}
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default TableToolbar;
