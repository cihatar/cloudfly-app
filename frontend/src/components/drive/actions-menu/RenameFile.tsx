import { renameFile } from "@/api/api";
import { CustomButton, InputField } from "@/components/global/FormElements";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useCustomToast from "@/hooks/useCustomToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

export default function RenameFile({ _id, parent, isRenameDialogOpen, setRenameDialogOpen }: { _id: string; parent: string; isRenameDialogOpen: boolean; setRenameDialogOpen: React.Dispatch<React.SetStateAction<boolean>>; }) {
    // toast
    const showToast = useCustomToast();

    // ref
    const cancelBtnRef = useRef<null | HTMLButtonElement>(null);

    // query
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: { _id: string, parent: string; name: string }) => renameFile(data),
        onSuccess: (data) => {
            showToast(data.message);
            queryClient.invalidateQueries({ queryKey: ['drive', parent || "root"]});
            cancelBtnRef.current?.click();
        },
        onError: (data: any) => {
            showToast(data.response.data.error, false);
        }
    });

    // handle rename file
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as { name: string };
        mutate({ _id, parent, name: data.name })
    };

    return (
        <Dialog open={isRenameDialogOpen} onOpenChange={setRenameDialogOpen}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Rename File</DialogTitle>
                        <DialogDescription className="text-blackdefault">
                            <InputField
                                className="mt-2 mb-4"
                                placeholder="Enter file name"
                                id="name"
                                name="name"
                            />
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start gap-2">
                        <CustomButton
                            type="submit"
                            disabled={isPending}
                        >
                            Rename
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
                </form>
            </DialogContent>
        </Dialog>
    );
}
