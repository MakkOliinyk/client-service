import React from 'react';

import { mdiDownload, mdiLink, mdiDelete } from '@mdi/js';

import emptyStateImage from '../../assets/NoDocuments.svg';

import Spinner from "../../components/Spinner";
import FileUpload from "../../components/FileUpload";
import CenterContent from '../../components/CenterContent';
import { IconButton } from "../../components/Button";

import css from './FileList.css';
import Title from "../../components/Title";

const FileList = ({
    isModifiable,
    isLoading,
    files,
    processingFiles,
    onFileUpload,
    onFileDownload,
    onFileDelete,
    onFileLinkGenerate,
}) => {
    const renderContent = () => {
        if (files.length > 0) return (
            <ul className={css.list}>
                {files.map((file) => (
                    <div key={file.id} className={css.file}>
                        <div>{file.fileName}</div>
                        <div className={css.fileActions}>
                            {processingFiles?.includes(file.id) ? <Spinner small /> : (
                                <>
                                    <IconButton iconPath={mdiDownload} onClick={() => onFileDownload(file.id)} />
                                    {isModifiable ? <IconButton iconPath={mdiLink} onClick={() => onFileLinkGenerate(file.id)} /> : null}
                                    {isModifiable ? <IconButton iconPath={mdiDelete} onClick={() => onFileDelete(file.id)} /> : null}
                                </>
                            )}
                        </div>
                    </div>))}
            </ul>
        );

        return (
            <CenterContent className={css.noFIles}>
                {isLoading
                    ? <Spinner />
                    : <img src={emptyStateImage} alt="No files" />}
            </CenterContent>
        );
    }

    return (
        <CenterContent fullScreen>
            <div className={css.pageContainer}>
                <div className={css.fileListContainer}>
                    <div className={css.header}>
                        <Title className={css.title} text="Мої файли" />
                        {isModifiable ? <FileUpload onChange={onFileUpload} /> : null}
                    </div>
                    {renderContent()}
                </div>
            </div>
        </CenterContent>
    );
};

export default FileList;
