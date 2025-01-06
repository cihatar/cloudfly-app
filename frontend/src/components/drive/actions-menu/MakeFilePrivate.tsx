import { makeFilePrivate } from "@/api/api";
import { CustomButton } from "@/components/global/FormElements";
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

export default function MakeFilePrivate({ _id, parent, isPrivateDialogOpen, setPrivateDialogOpen }: { _id: string; parent: string; isPrivateDialogOpen: boolean; setPrivateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>; }) {
    // toast
    const showToast = useCustomToast();

    // ref
    const cancelBtnRef = useRef<null | HTMLButtonElement>(null);

    // query
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: { _id: string }) => makeFilePrivate(data),
        onSuccess: (data) => {
            showToast(data.message);
            queryClient.invalidateQueries({ queryKey: ['drive', parent || "root"]});
            cancelBtnRef.current?.click();
        },
        onError: (data: any) => {
            showToast(data.response.data.error, false);
        }
    });
    
    // handle share 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({ _id });
    }

    return (
        <Dialog open={isPrivateDialogOpen} onOpenChange={setPrivateDialogOpen}>
            <DialogContent className="sm:max-w-md">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Make private</DialogTitle>
                            <DialogDescription className="text-blackdefault">
                                Once you make this file private, the public link will become invalid, and only you will have access to it
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start gap-2 mt-4">
                            <CustomButton
                                type="submit"
                                loading={isPending}
                            >
                                Make this file private
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
    )
}
