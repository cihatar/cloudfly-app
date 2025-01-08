import customAxios from "@/config/axios";

export const getFilesAndFolders = async (parent: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const res = await customAxios.get(`/api/drive/get/${parent}`);
    return res.data;
}

export const getFileInformation = async (_id: string) => {
    const res = await customAxios.get(`/api/drive/get-file/${_id}`);
    return res.data;
}

export const createFolder = async (data: { name: string, parent: string }) => {
    const res = await customAxios.post("/api/drive/create-folder", data);
    return res.data;
}

export const renameFile = async (data: { _id: string, parent: string, name: string }) => {
    const res = await customAxios.put("/api/drive/rename-file", data);
    return res.data;
}

export const renameFolder = async (data: { _id: string, parent: string, name: string }) => {
    const res = await customAxios.put("/api/drive/rename-folder", data);
    return res.data;
}

export const shareFile = async (data: { _id: string }) => {
    const res = await customAxios.post("/api/drive/share-file", data);
    return res.data;
}

export const makeFilePrivate = async (data: { _id: string }) => {
    const res = await customAxios.post("/api/drive/make-file-private", data);
    return res.data;
}

export const getFilePreviewPublic = async (key: string) => {
    const res = await customAxios.get(`/api/drive/file-preview-public/${key}`, {
        responseType: "arraybuffer",
    });
    return res;
}

