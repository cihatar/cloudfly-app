import { shareFile } from "@/api/api";
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
import { useState } from "react";

export default function ShareFile({ _id, parent, publicKey, isShareDialogOpen, setShareDialogOpen }: { _id: string; parent: string; publicKey: string | null; isShareDialogOpen: boolean; setShareDialogOpen: React.Dispatch<React.SetStateAction<boolean>>; }) {
    const [isLoading, setLoading] = useState(false);
    const [isCopied, setCopied] = useState(false);

    // toast
    const showToast = useCustomToast();

    // query
    const queryClient = useQueryClient();

    const { mutate, data } = useMutation({
        mutationFn: (data: { _id: string }) => shareFile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['drive', parent || "root"]} )
                .finally(() => {
                    setLoading(false);
                    setCopied(false);
                })
        },
        onError: (data: any) => {
            showToast(data.response.data.error, false);
        }
    });

    // handle share 
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        mutate({ _id });
    }

    // handle copy link
    const copyLinkToClipboard = async (link: string) => {
        try {
            if (navigator?.clipboard?.writeText) {
              await navigator.clipboard.writeText(link);
              setCopied(true);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Dialog open={isShareDialogOpen} onOpenChange={setShareDialogOpen}>
            <DialogContent className="sm:max-w-md">
                {
                    (data && publicKey) ? 
                    <>
                        <DialogHeader>
                            <DialogTitle>{data.message}</DialogTitle>
                            <DialogDescription>
                                <InputField
                                    className="mt-2 text-sm"
                                    readOnly
                                    value={data.link}
                                />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start gap-2">
                            <CustomButton onClick={() => copyLinkToClipboard(data.link)}
                                disabled={isCopied}
                                className={`${isCopied && 'bg-greendefault hover:bg-greendefault/95 text-white'}`}>
                                {isCopied ? "Copied" : "Copy to Clipboard"}
                            </CustomButton>
                            <DialogClose asChild>
                                <CustomButton
                                    type="button"
                                    variant="secondary"
                                >
                                    OK
                                </CustomButton>
                            </DialogClose>
                        </DialogFooter>
                    </> 
                    : 
                    <>
                        <DialogHeader>
                            <DialogTitle>Share</DialogTitle>
                            <DialogDescription>
                                Once you share your file, a unique link will be generated. You can share this link with others, and they will be able to download and access your file
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start gap-2">
                            <CustomButton
                                onClick={handleClick}
                                loading={isLoading}
                                className="bg-bluedefault hover:bg-bluedefault/95 text-white"
                            >
                                Share my file
                            </CustomButton>
                            <DialogClose asChild>
                                <CustomButton
                                    type="button"
                                    variant="secondary"
                                >
                                    Cancel
                                </CustomButton>
                            </DialogClose>
                        </DialogFooter>
                    </>
                }
            </DialogContent>
        </Dialog>
    )
}
