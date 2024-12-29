import customAxios from "@/config/axios";

export const getFilesAndFolders = async (parent: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const res = await customAxios.get(`/api/drive/get/${parent}`);
    return res.data;
}

export const createFolder = async (data: { name: string, parent: string }) => {
    const res = await customAxios.post("/api/drive/create-folder", data);
    return res.data;
}


