import customAxios from "@/config/axios";

export const getFilesAndFolders = async (parent: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const res = await customAxios.get(`/api/drive/get/${parent}`);
    return res.data;
}

export const getFileDetails = async (_id: string) => {
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

export const star = async (data: { _id: string, type: string }) => {
    const res = await customAxios.put("/api/drive/star", data);
    return res.data;
}

export const unstar = async (data: { _id: string, type: string }) => {
    const res = await customAxios.put("/api/drive/unstar", data);
    return res.data;
}

export const shareFile = async (data: { _id: string }) => {
    const res = await customAxios.put("/api/drive/share-file", data);
    return res.data;
}

export const makeFilePrivate = async (data: { _id: string }) => {
    const res = await customAxios.put("/api/drive/make-file-private", data);
    return res.data;
}

export const getFilePreviewPublic = async (key: string) => {
    try {
        const res = await customAxios.get(`/api/drive/file-preview-public/${key}`, {
            responseType: "arraybuffer",
        });
        return res;
    } catch (error: any) {
        const buffer = error?.response?.data;
        if (buffer instanceof ArrayBuffer) {
            const decoder = new TextDecoder("utf-8");
            const message = decoder.decode(buffer);
            try {
                return JSON.parse(message);
            } catch (error) {
                return { error: "Something went wrong" };
            }
        } else {
            return { error: "Something went wrong" };
        }
       
    }
}

export const getFileDetailsPublic = async (key: string) => {
    try {
        const res = await customAxios.get(`/api/drive/get-file-public/${key}`);
        return res.data;
    } catch (error: any) {
        return error?.response?.data || { error: "Something went wrong" };
    }
}

