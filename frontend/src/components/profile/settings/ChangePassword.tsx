import { Button } from "@/components/ui/button";
import { changePassword, User } from "@/store/user/userSlice";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/store/hooks";
import { useToast } from "@/hooks/use-toast";
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
    const { toast } = useToast();

    // ref
    const cancelBtnRef = useRef<null | HTMLButtonElement>(null);

    // button loading
    const [btnLoading, setBtnLoading] = useState(false);

    // handle change password
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(
            formData.entries()
        ) as unknown as ChangePasswordForm;

        setBtnLoading(true);
        dispatch(changePassword(data)).unwrap().then((res) => {     
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
            // close dialog after changing password
            cancelBtnRef.current?.click();
        }).catch((err) => {
            toast({
                title: "Error",
                description: err,
                variant: "destructive",
            });
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
                    <Button variant="secondary">Change Password</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Change Password Request</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={handleSubmit}
                        className="flex justify-center flex-col gap-y-1 mt-4"
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
                            <CustomButton disabled={btnLoading} text="Change" />
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" ref={cancelBtnRef}>
                                    Cancel
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
