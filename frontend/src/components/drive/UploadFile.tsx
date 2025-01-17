import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/config/axios";
import { CustomButton } from "../global/FormElements";
import { useUploadContext } from "@/context/UploadContext";
import { v4 as uuid } from 'uuid';
import { useAppDispatch } from "@/store/hooks";
import { setCurrentStorage } from "@/store/user/userSlice";
import { Upload } from "lucide-react";

export default function UploadFile({ parent, fileNames, isLoading, droppedFiles }: { parent: string, fileNames: string[], isLoading: boolean, droppedFiles: FileList | null }) {
    const [sameFiles, setSameFiles] = useState<string[]>([]);
    const [filesFormData, setFilesFormData] =  useState<FormData>(new FormData());
    const [dialogOpen, setDialogOpen] = useState(false);

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
    const handleChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
        e?.preventDefault();
        
        const files = e?.target.files as FileList || droppedFiles;
        
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
            setDialogOpen(true);
            setSameFiles(filesWithConflicts);
            setFilesFormData(formData);
        } else {
            handleUpload(formData);
        } 
    };

    useEffect(() => {
        if (droppedFiles && fileRef.current) {
            fileRef.current.value = "";
            handleChange();
        }
    }, [droppedFiles])

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
                className="bg-bluedefault hover:bg-bluedefault/95 text-white cursor-default rounded-full"
                disabled={isLoading}
                variant="default"
                onClick={() => {
                    if (fileRef.current) {
                        fileRef.current.click();
                        fileRef.current.value = "";
                    }
                }}
            >
                <Upload />
                Upload File
            </CustomButton>

            
            <Dialog open={dialogOpen} onOpenChange={(open) => {
                setDialogOpen(open);
            }}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {sameFiles?.length > 1 ? 
                            "Files already exist" : 
                            "File already exists"}
                        </DialogTitle>
                        <DialogDescription className="flex flex-col gap-y-4">
                            {sameFiles?.length > 1 ? 
                            "The files you are trying to upload already exist in this directory" : 
                            "The file you are trying to upload already exists in this directory"}
                        </DialogDescription>
                        <div className="grid grid-cols-3 gap-4 text-xs max-h-48 overflow-y-auto py-2">
                            {sameFiles?.map((name) => (
                                <div key={name} className="dark:bg-zinc-800 bg-zinc-100 p-2 flex items-center gap-2 rounded-md">
                                    {name}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-red-500 border-t pt-2">
                            {sameFiles?.length > 1 ? 
                            "If you replace the files, the existing ones will be permanently deleted" : 
                            "If you replace the file, the existing one will be permanently deleted"}
                        </p>
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
        </>
    );
}
