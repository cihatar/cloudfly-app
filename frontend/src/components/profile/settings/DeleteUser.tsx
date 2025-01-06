import { CustomButton } from "@/components/global/FormElements";
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
import useCustomToast from "@/hooks/useCustomToast";
import { useAppDispatch } from "@/store/hooks";
import { deleteUser } from "@/store/user/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteUser() {
    // redux
    const dispatch = useAppDispatch();

    // checkbox 
    const [checked, setChecked] = useState(false);

    // navigate
    const navigate = useNavigate();

    // toast
    const showToast = useCustomToast();

    // button loading
    const [btnLoading, setBtnLoading] = useState(false);

    // handle delete user
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setBtnLoading(true);
        dispatch(deleteUser())
            .unwrap()
            .then((res) => {
                showToast(res.message);
                navigate("/auth/login");
            })
            .catch((err) => {
                showToast(err, false);
            }).finally(() => setBtnLoading(false));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CustomButton type="submit" variant="destructive">
                    Delete Your Account
                </CustomButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Account Request</DialogTitle>
                    <DialogDescription className="flex flex-col gap-y-4">
                        In case you delete your account, all the data you
                        have uploaded will be permanently removed.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-x-2">
                    <Checkbox id="terms" checked={checked} onCheckedChange={() => setChecked(!checked)}/>
                    <label
                        htmlFor="terms"
                        className="text-xs"
                    >
                        Accept terms and conditions
                    </label>
                </div>
                <DialogFooter className="sm:justify-start gap-2">
                    <CustomButton 
                        onClick={handleClick} 
                        type="button" 
                        disabled={btnLoading ? true : checked ? false : true}
                        loading={btnLoading}
                        variant="destructive" 
                    >
                        Confirm
                    </CustomButton>
                    <DialogClose asChild>
                        <CustomButton type="button" variant="secondary">
                            Cancel
                        </CustomButton>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
