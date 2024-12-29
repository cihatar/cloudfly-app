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
import { Button } from "../ui/button";
import { CustomButton, InputField } from "../global/FormElements";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFolder } from "@/api/api";
import { useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { FileProps, FolderProps } from "@/pages/Drive";

export default function CreateFolder({ parent }: { parent: string }) {
    // toast
    const { toast } = useToast();

    // ref
    const cancelBtnRef = useRef<null | HTMLButtonElement>(null);

    // query
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ name, parent }: { name: string; parent: string }) => createFolder({ name, parent }),
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
            queryClient.setQueryData(['drive', parent], (oldData: { files: FileProps[], folders: FolderProps[] }) => {
                if (oldData.files === null && oldData.folders === null) {
                    return { folders: [data.folder], files: oldData.files };
                }
                return { ...oldData, folders: [...oldData.folders, data.folder] };
            });
            cancelBtnRef.current?.click();
        },
        onError: (data: any) => {
            toast({
                title: "Error",
                description: data.response.data.error,
                variant: "destructive",
            });
        }
    });

    // handle create folder
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as { name: string };
        mutate({ name: data.name, parent })
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="rounded border w-24 h-8 text-xs
                    lg:w-32 lg:h-10 lg:text-sm shadow-md"
                    variant="outline"
                >
                    Create Folder
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Folder</DialogTitle>
                        <DialogDescription className="text-blackdefault">
                            <InputField
                                className="mt-2 mb-4"
                                placeholder="Enter folder name"
                                id="name"
                                name="name"
                            />
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start gap-2">
                        <CustomButton type="submit" text="Create" disabled={isPending} />
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" ref={cancelBtnRef}>
                                Cancel
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
