import React from 'react';

import { mdiArrowLeftBoldCircleOutline, mdiDownload, mdiLink, mdiDelete, mdiLogoutVariant } from '@mdi/js';
import Icon from '@mdi/react';

import emptyStateImage from '../../assets/NoDocuments.svg';

import Spinner from "../../components/Spinner";
import FileUpload from "../../components/FileUpload";
import CenterContent from '../../components/CenterContent';
import { IconButton } from "../../components/Button";

import css from './FileList.css';
import Title from "../../components/Title";

const FileList = ({
    viewOnly,
    isLoading,
    files,
    processingFiles,
    onFileUpload,
    onFileDownload,
    onFileDelete,
    onFileLinkGenerate,
    onGoHome,
    onLogout
}) => {
    const renderHeader = () => {
        if (viewOnly) {
            return (
                <div className={`${css.header} ${css.viewOnly}`}>
                    <IconButton iconPath={mdiArrowLeftBoldCircleOutline} onClick={onGoHome} />
                    <Title className={css.title} text="Поширені файли" />
                </div>
            );
        }

        return (
            <div className={css.header}>
                <Title className={css.title} text="Мої файли" />
                <FileUpload onChange={onFileUpload} />
            </div>
        );
    };
    const renderContent = () => {
        if (files.length > 0 && !isLoading) return (
            <ul className={css.list}>
                {files.map((file) => (
                    <div key={file.id} className={css.file}>
                        <div>{file.fileName}</div>
                        <div className={css.fileActions}>
                            {processingFiles?.includes(file.id) ? <Spinner small /> : (
                                <>
                                    <IconButton iconPath={mdiDownload} onClick={() => onFileDownload(file.id)} />
                                    {viewOnly ? null : <IconButton iconPath={mdiLink} onClick={() => onFileLinkGenerate(file.id)} />}
                                    {viewOnly ? null : <IconButton iconPath={mdiDelete} onClick={() => onFileDelete(file.id)} />}
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
                    {renderHeader()}
                    {renderContent()}
                </div>
            </div>
            <div className={css.logout} onClick={onLogout}>
                <Icon path={mdiLogoutVariant} size={"20px"} />
            </div>
        </CenterContent>
    );
};

export default FileList;
