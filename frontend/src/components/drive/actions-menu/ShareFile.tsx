import { shareFile } from "@/api/api";
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
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface ResponseDataProps {
    link: string;
    message: string;
}

export default function ShareFile({ _id, isShareDialogOpen, setShareDialogOpen }: { _id: string; isShareDialogOpen: boolean; setShareDialogOpen: React.Dispatch<React.SetStateAction<boolean>>; }) {
    const [data, setData] = useState<ResponseDataProps | null>(null);
    const [isCopied, setCopied] = useState(false);

    // toast
    const { toast } = useToast();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: { _id: string }) => shareFile(data),
        onSuccess: (data) => {
            setData(data);
        },
        onError: (data: any) => {
            toast({
                title: "Error",
                description: data.response.data.error,
                variant: "destructive",
            });
        }
    });
    
    // handle share 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                    data ? 
                    <>
                        <DialogHeader>
                            <DialogTitle>{data.message}</DialogTitle>
                            <DialogDescription className="text-blackdefault">
                                <InputField
                                    className="mt-2 text-sm"
                                    readOnly
                                    value={data.link}
                                />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start gap-2">
                            <Button onClick={() => copyLinkToClipboard(data.link)}
                                className={`${isCopied && 'bg-greendefault hover:bg-greendefault/95'}`}>
                                {isCopied ? "Copied" : "Copy to Clipboard"}
                            </Button>
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="secondary"
                                >
                                    OK
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </> 
                    : 
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Share</DialogTitle>
                            <DialogDescription className="text-blackdefault">
                                {/* <InputField
                                    className="mt-2 mb-4"
                                    readOnly
                                /> */}
                                Once you share your file, a unique link will be generated. You can share this link with others, and they will be able to download and access your file
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start gap-2 mt-4">
                            <CustomButton
                                type="submit"
                                text="Share my file"
                                disabled={isPending}
                                className="bg-bluedefault hover:bg-bluedefault/95"
                            />
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="secondary"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                }
            </DialogContent>
        </Dialog>
    )
}
