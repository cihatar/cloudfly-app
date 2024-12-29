import customAxios from "@/config/axios";

export const getFilesAndFolders = async (parent: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const res = await customAxios.get(`/api/drive/get/${parent}`);
    return res.data;
}


