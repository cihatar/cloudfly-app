import { deletePermanently, FilesAndFoldersReqBody } from "@/api/api";
import { CustomButton } from "@/components/global/FormElements";
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
import useCustomToast from "@/hooks/useCustomToast";
import { FileProps, FolderProps } from "@/pages/Drive";
import { useAppDispatch } from "@/store/hooks";
import { setCurrentStorage } from "@/store/user/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRef } from "react";

export default function EmptyTrash({ data }: { data: { files: FileProps[], folders: FolderProps[] } }) {
    // toast
    const showToast = useCustomToast();

    // redux
    const dispatch = useAppDispatch();

    // ref
    const cancelBtnRef = useRef<null | HTMLButtonElement>(null);

    // query
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: FilesAndFoldersReqBody) => deletePermanently(data),
        onSuccess: (data) => {
            showToast(data.message);
            dispatch(setCurrentStorage(data.currentStorage))
            queryClient.invalidateQueries({ queryKey: ['trash']});
            cancelBtnRef.current?.click();
        },
        onError: (data: any) => {
            showToast(data.response.data.error, false);
        }
    });

    // handle empty trash
    const handleEmptyTrash = () => {
        mutate({ files: data.files, folders: data.folders });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CustomButton type="button" variant="destructive" className="cursor-default rounded-full">
                    <Trash2 />
                    Empty Trash
                </CustomButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="capitalize">Empty Trash</DialogTitle>
                    <DialogDescription>
                        Once you empty the trash, all files and folders will be permanently removed from the system and cannot be restored under any circumstances. 
                        Please ensure that you have a backup or are absolutely certain before proceeding with the deletion
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start gap-2">
                    <CustomButton
                        onClick={handleEmptyTrash}
                        type="button"
                        variant="destructive"
                        loading={isPending}
                    >
                        Empty Trash
                    </CustomButton>
                    <DialogClose asChild>
                        <CustomButton
                            type="button"
                            variant="secondary"
                            ref={cancelBtnRef}
                        >
                            Cancel
                        </CustomButton>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
