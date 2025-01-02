import { Button } from "../ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { useUploadContext } from "@/context/UploadContext";
import { v4 as uuid } from 'uuid';

export default function UploadFile({ parent, fileNames }: { parent: string, fileNames: string[] }) {
    const [sameFiles, setSameFiles] = useState<string[]>([]);
    const [filesFormData, setFilesFormData] =  useState<FormData>(new FormData());

    // context
    const { updateUploadedFiles, updateUploadedFilesProgress } = useUploadContext();

    // toast
    const { toast } = useToast();

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
            
            const res = await customAxios.post("/api/drive/upload", formData, { onUploadProgress(progressEvent) {
                const { loaded, total } = progressEvent;
                if (total) {
                    const progress = ((loaded / total) * 100).toFixed(0);
                    // update uploaded file progress bar
                    updateUploadedFilesProgress(id, parseInt(progress));
                }
            },});
            return res.data;
        },
        onSuccess: (data) => {
            toast({
                title: "Success",
                description: data.message,
                variant: "default",
                duration: 3000,
                style: {
                    color: "#fafafa",
                    backgroundColor: "#5cb85c",
                },
            });
            queryClient.invalidateQueries({ queryKey: ["drive", parent]});
        },
        onError: (data: any) => {
            toast({
                title: "Error",
                description: data.response.data.error,
                variant: "destructive",
            });
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

        // reset states
        setSameFiles([]);
        setFilesFormData(new FormData());
        
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
            <Button
                type="button"
                className="rounded bg-bluedefault hover:bg-bluedefault/95 w-24 h-8 text-xs lg:w-32 lg:h-10 lg:text-sm shadow-md"
                variant="default"
                onClick={() => fileRef.current?.click()}
            >
                Upload File
            </Button>

            {sameFiles.length !== 0 && 
                <Dialog defaultOpen>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>File already exists</DialogTitle>
                            <DialogDescription className="flex flex-col gap-y-4">
                                <p className="text-sm text-muted-foreground">
                                    The file you are trying to upload already exists in this directory
                                </p>
                                <div className="grid grid-cols-3 gap-4 text-xs text-blackdefault max-h-48 overflow-y-auto">
                                    {sameFiles.map((name) => (
                                        <div key={name} className="bg-blackdefault/5 p-2 flex items-center gap-2 rounded">
                                            {name}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-red-500 border-t pt-2"> If you replace the file, the existing file will be permanently deleted</p>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start gap-2">
                            <CustomButton text="Replace" onClick={() => handleUpload(filesFormData)}/>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" ref={cancelBtnRef}>
                                    Cancel
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            }
            
        </>
    );
}
