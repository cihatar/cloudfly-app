import { Button } from "../ui/button";
import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/config/axios";

export default function UploadFile({ parent }: { parent: string }) {
    // ref
    const fileRef = useRef<null | HTMLInputElement>(null);

    // query
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async (formData: FormData) =>  {
            const res = await customAxios.post("/api/drive/upload", formData, { onUploadProgress(progressEvent) {
                const { loaded, total } = progressEvent;
                console.log(((loaded / total!) * 100).toFixed(0));
            },});
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["drive", parent]});
        }
    });
    
    // handle file input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        
        const files = e.target.files as FileList;
        const formData = new FormData();
        
        for (const file of files) {
            formData.append("files", file);
        }
        formData.append("parent", parent);

        mutate(formData);
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
        </>
    );
}
