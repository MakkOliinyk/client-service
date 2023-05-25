import api from './index';

// Function to upload a file
export async function uploadFile(file, authorization) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: authorization
            }
        });

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

// Function to delete a file by fileId
export async function deleteFile(fileId, authorization) {
    try {
        const response = await api.delete(`/files/${fileId}`, {
            headers: { Authorization: authorization }
        });

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

// Function to download a file by fileId
export async function downloadFile(fileId) {
    try {
        const response = await api.get(`/files/${fileId}`, {
            responseType: 'arraybuffer'
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

// Function to retrieve all files for the authenticated user
export async function getFiles() {
    try {
        const response = await api.get('/files');

        return response.data.files;
    } catch (error) {
        throw new Error(error);
    }
}
