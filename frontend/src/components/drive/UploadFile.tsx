import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/config/axios";
import { CustomButton } from "../global/FormElements";
import { useUploadContext } from "@/context/UploadContext";
import { v4 as uuid } from 'uuid';
import { useAppDispatch } from "@/store/hooks";
import { setCurrentStorage } from "@/store/user/userSlice";

export default function UploadFile({ parent, fileNames }: { parent: string, fileNames: string[] }) {
    const [sameFiles, setSameFiles] = useState<string[]>([]);
    const [filesFormData, setFilesFormData] =  useState<FormData>(new FormData());

    // context
    const { updateUploadedFiles, updateUploadedFilesProgress, updateUploadStatus } = useUploadContext();

    // redux
    const dispatch = useAppDispatch();

    // ref
    const fileRef = useRef<null | HTMLInputElement>(null);
    const cancelBtnRef = useRef<null | HTMLButtonElement>(null);

    // query
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async (formData: FormData) =>  {
            const id = uuid();
            const files = formData.getAll("files") as File[];
            
            // add files to uploaded files array to show upload progress component
            updateUploadedFiles({ id, files, progress: 0 });
            
            try {
                const res = await customAxios.post("/api/drive/upload", formData, { onUploadProgress(progressEvent) {
                    const { loaded, total } = progressEvent;
                    if (total) {
                        const progress = ((loaded / total) * 100).toFixed(0);
                        // update uploaded file progress bar
                        updateUploadedFilesProgress(id, parseInt(progress));
                    }
                },});
                updateUploadStatus(id, true, res.data.message);       
                return res.data;
            } catch (error: any) {
                updateUploadStatus(id, false, error.response.data.error);
            }
                 
        },
        onSuccess: (data) => {
            dispatch(setCurrentStorage(data.currentStorage))
            queryClient.invalidateQueries({ queryKey: ["drive", parent]});
        }
    });

    // handle upload
    const handleUpload = (formData: FormData) => {
        mutate(formData);
        cancelBtnRef.current?.click();
    };
    
    // handle file input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const files = e.target.files as FileList;
        const formData = new FormData();
    
        let filesWithConflicts: string[] = [];

        for (const file of files) {
            if (fileNames.includes(file.name)) {
                filesWithConflicts.push(file.name);
            }
            formData.append("files", file);
        }
        formData.append("parent", parent);

        // if there is a conflict show dialog otherwise upload files immediately
        if (filesWithConflicts.length > 0) {
            setSameFiles(filesWithConflicts);
            setFilesFormData(formData);
        } else {
            handleUpload(formData);
        }        
    };

    return (
        <>
            <input
                type="file"
                name="files"
                id="files"
                accept="*"
                multiple
                hidden
                ref={fileRef}
                onChange={handleChange}
            />
            <CustomButton
                type="button"
                className="bg-bluedefault hover:bg-bluedefault/95 w-24 h-8 text-xs lg:w-32 lg:h-10 lg:text-sm shadow-md text-white"
                variant="default"
                onClick={() => {
                    // reset states
                    setSameFiles([]);
                    setFilesFormData(new FormData());
                    
                    if (fileRef.current) {
                        fileRef.current.click();
                        fileRef.current.value = "";
                    }
                }}
            >
                Upload File
            </CustomButton>

            {sameFiles.length !== 0 && 
                <Dialog defaultOpen>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>File already exists</DialogTitle>
                            <DialogDescription className="flex flex-col gap-y-4">
                                The file you are trying to upload already exists in this directory
                            </DialogDescription>
                            <div className="grid grid-cols-3 gap-4 text-xs max-h-48 overflow-y-auto py-2">
                                {sameFiles.map((name) => (
                                    <div key={name} className="dark:bg-zinc-800 bg-zinc-100 p-2 flex items-center gap-2 rounded-md">
                                        {name}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-red-500 border-t pt-2"> If you replace the file, the existing file will be permanently deleted</p>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start gap-2">
                            <CustomButton onClick={() => handleUpload(filesFormData)} type="button" >Replace</CustomButton>
                            <DialogClose asChild>
                                <CustomButton type="button" variant="secondary" ref={cancelBtnRef}>
                                    Cancel
                                </CustomButton>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            }
            
        </>
    );
}
