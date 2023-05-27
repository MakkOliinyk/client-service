import React, { useRef } from 'react';

import { mdiUpload } from '@mdi/js';
import Icon from '@mdi/react';

import Button from "../Button";

import css from './FileUpload.css';

const FileUpload = ({ onChange }) => {
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        onChange(file);
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <Button
                className={css.button}
                label={<><Icon size="16px" path={mdiUpload} /><span>Завантажити файл</span></>}
                onClick={handleClick}
            />
        </div>
    );
};

export default FileUpload;
