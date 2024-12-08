import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteUser } from "@/store/user/userSlice";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DeleteUser() {
    // redux
    const { isLoading } = useAppSelector((state) => ({
        ...state.user,
    }));
    const dispatch = useAppDispatch();

    // navigate
    const navigate = useNavigate();

    // toast
    const { toast } = useToast();

    // handle update name
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        dispatch(deleteUser()).unwrap().then((res) => {
            toast({
                title: "Success",
                description: res.message,
                variant: "default",
                duration: 3000,
                style: {
                    color: "#fafafa",
                    backgroundColor: "#5cb85c",
                },
            });
            navigate("/auth/login")
        })
        .catch((err) => {
            toast({
                title: "Error",
                description: err,
                variant: "destructive",
            });
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="submit" variant="destructive">
                    Delete Your Account
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Account Request</DialogTitle>
                    <DialogDescription>
                        In case you delete your account, all the data you have
                        uploaded will be permanently removed.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start gap-2">
                    <Button
                        onClick={handleSubmit}
                        variant="destructive"
                        disabled={isLoading ? true : false}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Please wait
                            </>
                        ) : (
                            "Confirm"
                        )}
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
