import { changePassword, User } from "@/store/user/userSlice";
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
import { useAppDispatch } from "@/store/hooks";
import useCustomToast from "@/hooks/useCustomToast";
import { useRef, useState } from "react";
import { CustomButton, InputField, InputWithLabel } from "@/components/global/FormElements";

interface ChangePasswordProps {
    user: User | null;
}

interface ChangePasswordForm {
    oldPassword: string;
    password: string;
    password_confirmation: string;
}

export default function ChangePassword({ user }: ChangePasswordProps) {
    // redux
    const dispatch = useAppDispatch();

    // toast
    const showToast = useCustomToast();

    // ref
    const cancelBtnRef = useRef<null | HTMLButtonElement>(null);

    // button loading
    const [btnLoading, setBtnLoading] = useState(false);

    // handle change password
    const handleChangePassword= (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(
            formData.entries()
        ) as unknown as ChangePasswordForm;

        setBtnLoading(true);
        dispatch(changePassword(data)).unwrap().then((res) => {     
            showToast(res.message);
            // close dialog after changing password
            cancelBtnRef.current?.click();
        }).catch((err) => {
            showToast(err, false);
        }).finally(() => setBtnLoading(false));
    };

    return (
        <div className="flex flex-col gap-y-4">
            <div>
                <InputWithLabel 
                    label="Email" 
                    type="text" 
                    placeholder="Email" 
                    id="email" 
                    name="email" 
                    defaultValue={user?.email}
                    disabled={true}
                />
            </div>
            <div>
                <InputWithLabel 
                    label="Password" 
                    type="password" 
                    placeholder="Password" 
                    id="password" 
                    name="password" 
                    defaultValue="******"
                    disabled={true}
                />
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <CustomButton type="button" variant="secondary">Change Password</CustomButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Change Password Request</DialogTitle>
                        <DialogDescription>Please enter your current password and choose a new one to update your password</DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={handleChangePassword}
                        className="flex justify-center flex-col gap-y-1"
                    >
                        <InputField 
                            className="mb-4"
                            type="password"
                            placeholder="Enter your password"
                            id="oldPassword"
                            name="oldPassword"
                        />
                        <InputField 
                            className="mb-4"
                            type="password"
                            placeholder="Enter your new password"
                            id="password"
                            name="password"
                        />
                        <InputField 
                            className="mb-4"
                            type="password"
                            placeholder="Enter your new password again"
                            id="password_confirmation"
                            name="password_confirmation"
                        />
                        <DialogFooter className="sm:justify-start gap-2">
                            <CustomButton loading={btnLoading}>Change</CustomButton>
                            <DialogClose asChild>
                                <CustomButton type="button" variant="secondary" ref={cancelBtnRef}>
                                    Cancel
                                </CustomButton>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
