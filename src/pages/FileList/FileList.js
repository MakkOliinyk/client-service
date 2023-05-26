import React, { useEffect, useState } from 'react';

import { mdiLink, mdiDelete } from '@mdi/js';

import emptyStateImage from '../../assets/NoDocuments.svg';

import {getFiles, uploadFile} from "../../api/files";

import Spinner from "../../components/Spinner";
import FileUpload from "../../components/FileUpload";
import CenterContent from '../../components/CenterContent';
import { IconButton } from "../../components/Button";

import css from './FileList.css';
import Title from "../../components/Title";

const FileList = () => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchFiles = async () => {
        setIsLoading(true);
        const files = await getFiles();
        setFiles(files || []);
        setIsLoading(false);
    };

    useEffect(() => {
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

    const handleFileUpload = async (file) => {
        setIsLoading(true);
        await uploadFile(file);
        await fetchFiles();
    };

    const renderContent = () => {
        if (files.length > 0) return (
            <ul className={css.list}>
                {files.map((file) => (
                    <li key={file.id} className={css.file}>
                        <div>{file.fileName}</div>
                        <div className={css.fileActions}>
                            <IconButton iconPath={mdiLink} onClick={() => handleGenerateLink(file.id)} />
                            <IconButton iconPath={mdiDelete} onClick={() => handleDelete(file.id)} />
                        </div>
                    </li>))}
            </ul>
        );

        return (
            <CenterContent className={css.noFIles}>
                {isLoading
                    ? <Spinner />
                    : (
                        <>
                            <img src={emptyStateImage} alt="No files" />
                            You haven't uploaded any files yet
                        </>
                    )}
            </CenterContent>
        );
    }

    return (
        <CenterContent fullScreen>
            <div className={css.pageContainer}>
                <div className={css.fileListContainer}>
                    <div className={css.header}>
                        <Title className={css.title} text="My files" />
                        <FileUpload onChange={handleFileUpload} />
                    </div>
                    {renderContent()}
                </div>
            </div>
        </CenterContent>
    );
};

export default FileList;
