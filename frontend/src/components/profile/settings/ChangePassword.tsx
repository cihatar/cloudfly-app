import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRef } from "react";

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
    const { isLoading } = useAppSelector((state) => ({
        ...state.user,
    }));
    const dispatch = useAppDispatch();

    // toast
    const { toast } = useToast();

    // ref
    const cancelBtnRef = useRef<null | HTMLButtonElement>(null);

    // handle change password
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(
            formData.entries()
        ) as unknown as ChangePasswordForm;

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
        });
    };

    return (
        <div className="flex flex-col gap-y-4">
            <div>
                <Label htmlFor="email" className="text-gray-700 text-xs">
                    Email
                </Label>
                <Input
                    className="focus-visible:ring-offset-0"
                    type="text"
                    placeholder="First Name"
                    required
                    id="email"
                    name="email"
                    defaultValue={user?.email}
                    disabled
                />
            </div>
            <div>
                <Label htmlFor="password" className="text-gray-700 text-xs">
                    Password
                </Label>
                <Input
                    className="focus-visible:ring-offset-0"
                    type="password"
                    placeholder="First Name"
                    required
                    id="password"
                    name="password"
                    defaultValue="******"
                    disabled
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
                        <Input
                            className="focus-visible:ring-offset-0 mb-4"
                            type="password"
                            placeholder="Enter your password"
                            required
                            id="oldPassword"
                            name="oldPassword"
                        />
                        <Input
                            className="focus-visible:ring-offset-0 mb-4"
                            type="password"
                            placeholder="Enter your new password"
                            required
                            id="password"
                            name="password"
                        />
                        <Input
                            className="focus-visible:ring-offset-0 mb-4"
                            type="password"
                            placeholder="Enter your new password again"
                            required
                            id="password_confirmation"
                            name="password_confirmation"
                        />
                        <DialogFooter className="sm:justify-start gap-2">
                            <Button
                                type="submit"
                                disabled={isLoading ? true : false}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Please wait
                                    </>
                                ) : (
                                    "Change"
                                )}
                            </Button>
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
