import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteUser() {
    // redux
    const { isLoading } = useAppSelector((state) => ({
        ...state.user,
    }));
    const dispatch = useAppDispatch();

    // checkbox 
    const [checked, setChecked] = useState(false);

    // navigate
    const navigate = useNavigate();

    // toast
    const { toast } = useToast();

    // handle update name
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        dispatch(deleteUser())
            .unwrap()
            .then((res) => {
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
                navigate("/auth/login");
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
                    <DialogDescription className="flex flex-col gap-y-4">
                        <p className="text-sm text-muted-foreground">
                            In case you delete your account, all the data you
                            have uploaded will be permanently removed.
                        </p>
                        <div className="flex items-center gap-x-2">
                            <Checkbox id="terms" checked={checked} onCheckedChange={() => setChecked(!checked)}/>
                            <label
                                htmlFor="terms"
                                className="text-xs"
                            >
                                Accept terms and conditions
                            </label>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start gap-2">
                    <Button
                        onClick={handleSubmit}
                        variant="destructive"
                        disabled={isLoading ? true : checked ? false : true}
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
