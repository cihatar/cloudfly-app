import customAxios from "@/config/axios";

export interface FilesAndFoldersReqBody {
    files: { _id: string }[] | null;
    folders: { _id: string }[] | null;
}

export const getFilesAndFolders = async (parent: string) => {
    const res = await customAxios.get(`/api/drive/get/${parent}`);
    return res.data;
}

export const getStarredFilesAndFolders = async (parent: string) => {
    const res = await customAxios.get(`/api/drive/get-starred/${parent}`);
    return res.data;
}

export const getTrashedFilesAndFolders = async () => {
    const res = await customAxios.get("/api/drive/get-trashed");
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

export const rename = async (data: { _id: string, parent: string, name: string, type: string }) => {
    const res = await customAxios.put("/api/drive/rename", data);
    return res.data;
}

export const star = async (data: FilesAndFoldersReqBody) => {
    const res = await customAxios.put("/api/drive/star", data);
    return res.data;
}

export const unstar = async (data: FilesAndFoldersReqBody) => {
    const res = await customAxios.put("/api/drive/unstar", data);
    return res.data;
}

export const getFolders = async (_id: string, parent: string) => {
    const query = _id ? `?folderId=${_id}` : "";
    const res = await customAxios.get(`/api/drive/get-folders/${parent}${query}`);
    return res.data;
}

export const move = async (data: { data: FilesAndFoldersReqBody, parent: string }) => {
    const res = await customAxios.put("/api/drive/move", data);
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

export const moveToTrash = async (data: FilesAndFoldersReqBody) => {
    const res = await customAxios.put("/api/drive/move-to-trash", data);
    return res.data;
}

export const restore = async (data: FilesAndFoldersReqBody) => {
    const res = await customAxios.put("/api/drive/restore", data);
    return res.data;
}

export const deletePermanently = async (data: FilesAndFoldersReqBody) => {
    const res = await customAxios.delete(`/api/drive/delete/`, { data });
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

