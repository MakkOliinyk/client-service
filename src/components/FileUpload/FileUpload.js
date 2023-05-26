import React, { useRef } from 'react';

import Button from "../Button";

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
            <Button label="Upload" onClick={handleClick} />
        </div>
    );
};

export default FileUpload;
