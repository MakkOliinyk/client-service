import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import {deleteFile, downloadFile, getFileInfo, getFileLink, getFiles, uploadFile} from "../../api/files";

import FileList from "../../containers/FileList";
import {getToken} from "../../storage/token";

const Files = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [processingFiles, setProcessingFiles] = useState([]);

    const fetchFiles = async (linkId) => {
        setIsLoading(true);
        const files = await (linkId ? getFileInfo(linkId) : getFiles() );
        setFiles(files)
        setIsLoading(false);
    };

    useEffect(() => {
        if (!params.linkId && !getToken()) navigate('/');
        fetchFiles(params.linkId);
    }, []);

    const handleDelete = async (fileId) => {
        await deleteFile(fileId);
        await fetchFiles();
    };

    const handleDownloadFile = async (fileId) => {
        setProcessingFiles([...processingFiles, fileId]);
        await downloadFile(fileId);
        setProcessingFiles(processingFiles.filter(id => id !== fileId));
    };

    const handleGenerateLink = async (fileId) => {
        setProcessingFiles([...processingFiles, fileId]);
        const link = await getFileLink(fileId);
        navigator.clipboard.writeText(window.location.href + '/' + link);
        setProcessingFiles(processingFiles.filter(id => id !== fileId));
    };

    const handleFileUpload = async (file) => {
        setIsLoading(true);
        await uploadFile(file);
        await fetchFiles();
    };

    return (
        <FileList
            isModifiable={!params.linkId}
            isLoading={isLoading}
            files={files || []}
            processingFiles={processingFiles}
            onFileDownload={handleDownloadFile}
            onFileUpload={handleFileUpload}
            onFileDelete={handleDelete}
            onFileLinkGenerate={handleGenerateLink}
        />
    );
};

export default Files;
