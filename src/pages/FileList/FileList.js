import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiLink, mdiDelete } from '@mdi/js';

import './FileList.css';
import {getFiles} from "../../api/files";

const FileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const files = await getFiles();
            setFiles(files || []);
        };

        fetchFiles();
    }, []);

    const handleDelete = (fileId) => {
        // Call the server endpoint to delete the file
        // Pass the token and fileId in the request
        // Update the files state by removing the deleted file
    };

    const handleGenerateLink = (fileId) => {
        // Call the server endpoint to generate a link for the file
        // Pass the token and fileId in the request
        // Get the link in response and handle it accordingly (e.g., display it to the user)
    };

    const handleFileUpload = (e) => {
        e.preventDefault();

        console.log(e);
        // Get the uploaded file
        // Call the server endpoint to add the file
        // Pass the token and the file in the request
        // Update the files state with the newly added file
    };

    console.log(files);

    return (
        <div className="centerContent">
            <div className="pageContainer">
                <div className="fileListContainer">
                    <div className="header">
                        <h2 className="title">My files</h2>
                        <button type="submit" className="button">Upload</button>
                    </div>
                    <ul className="list">
                        {files.map((file) => (
                            <li key={file.id}>
                                {file.name}
                                <div onClick={() => handleGenerateLink(file.id)}><Icon path={mdiLink} /></div>
                                <div onClick={() => handleDelete(file.id)}><Icon path={mdiDelete} /></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FileList;
