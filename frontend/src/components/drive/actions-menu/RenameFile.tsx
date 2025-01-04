import { renameFile } from "@/api/api";
import { CustomButton, InputField } from "@/components/global/FormElements";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

export default function RenameFile({ _id, parent, isDialogOpen, setIsDialogOpen }: { _id: string; parent: string; isDialogOpen: boolean; setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>; }) {
    // toast
    const { toast } = useToast();

    // ref
    const cancelBtnRef = useRef<null | HTMLButtonElement>(null);

    // query
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: { _id: string, parent: string; name: string }) => renameFile(data),
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
            queryClient.invalidateQueries({ queryKey: ['drive', parent || "root"]});
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

    // handle rename file
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as { name: string };
        mutate({ _id, parent, name: data.name })
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                            text="Rename"
                            disabled={isPending}
                        />
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="secondary"
                                ref={cancelBtnRef}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
