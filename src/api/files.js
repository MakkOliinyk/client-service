import api from './index';

export async function uploadFile(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/files', formData);

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteFile(fileId) {
    try {
        const response = await api.delete(`/files/${fileId}`);

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export async function downloadFile(fileId) {
    try {
        const response = await api.get(`/files/${fileId}`, {
            responseType: 'arraybuffer', // Set the response type to 'arraybuffer'
        });

        const blob = new Blob([response.data], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        const fileName = response.headers['content-disposition'].split('filename=')[1];

        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();

        URL.revokeObjectURL(url);
    } catch (error) {
        throw new Error(error);
    }
}

export async function getFiles() {
    try {
        const response = await api.get('/files');

        return response.data.files;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getFileLink(fileId) {
    try {
        const response = await api.post(`/links`, { fileId });

        return response.data.fileLink.link;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getFileInfo(linkId) {
    try {
        const response = await api.get(`/links/${linkId}`);

        return [response.data];
    } catch (error) {
        throw new Error(error);
    }
}
