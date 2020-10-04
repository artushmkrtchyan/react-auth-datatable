import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import styles from './radio.module.scss';

export default function ({
    label = '',
    name = '',
    onChange = () => {},
    radios = [],
    value = '',
}) {
    return (
        <>
            <div
                className={`${styles.radioBtn} ${styles.title} btn-group btn-group-toggle`}
            >
                <label className="btn btn-light disabled">{label}</label>
            </div>
            <ButtonGroup toggle className={styles.radioBtn}>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        type="radio"
                        variant="light"
                        name={name}
                        value={radio.value}
                        checked={value === radio.value}
                        onChange={onChange}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </>
    );
}
