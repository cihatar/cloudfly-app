import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CustomButton, InputField } from "../global/FormElements";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFolder } from "@/api/api";
import { useRef } from "react";
import useCustomToast from "@/hooks/useCustomToast";
import { FileProps, FolderProps } from "@/pages/Drive";

export default function CreateFolder({ parent, isLoading }: { parent: string, isLoading: boolean }) {
    // toast
    const showToast = useCustomToast();

    // ref
    const cancelBtnRef = useRef<null | HTMLButtonElement>(null);

    // query
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ name, parent }: { name: string; parent: string }) => createFolder({ name, parent }),
        onSuccess: (data) => {
            showToast(data.message);
            queryClient.setQueryData(['drive', parent], (oldData: { files: FileProps[], folders: FolderProps[] }) => {
                const foldersArr = oldData.folders === null ? [data.folder] : [...oldData.folders, data.folder];
                return { ...oldData, folders: foldersArr };
            });
            cancelBtnRef.current?.click();
        },
        onError: (data: any) => {
            showToast(data.response.data.error, false);
        }
    });

    // handle create folder
    const handleCreateFolder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as { name: string };
        mutate({ name: data.name, parent })
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CustomButton
                    type="button" 
                    className="border w-24 h-8 text-xs
                    lg:w-32 lg:h-10 lg:text-sm shadow-md"
                    disabled={isLoading}
                    variant="outline"
                >
                    Create Folder
                </CustomButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleCreateFolder}>
                    <DialogHeader>
                        <DialogTitle>Create Folder</DialogTitle>
                        <DialogDescription>
                            <InputField
                                className="mt-2 mb-4"
                                placeholder="Enter folder name"
                                id="name"
                                name="name"
                            />
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start gap-2">
                        <CustomButton loading={isPending}>Create</CustomButton>
                        <DialogClose asChild>
                            <CustomButton type="button" variant="secondary" ref={cancelBtnRef}>
                                Cancel
                            </CustomButton>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
