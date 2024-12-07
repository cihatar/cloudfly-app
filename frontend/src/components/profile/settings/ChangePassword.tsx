import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/store/user/userSlice";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface ChangePasswordProps {
    user: User | null;
}

export default function ChangePassword({ user }: ChangePasswordProps) {
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
                    <form className="flex justify-center flex-col gap-y-1 mt-4">
                        <div className="grid flex-1 gap-2">
                            <Input
                                className="focus-visible:ring-offset-0 mb-4"
                                type="password"
                                placeholder="Enter your password"
                                required
                                id="oldPassword"
                                name="oldPassword"
                            />
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Input
                                className="focus-visible:ring-offset-0 mb-4"
                                type="password"
                                placeholder="Enter your new password"
                                required
                                id="password"
                                name="password"
                            />
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Input
                                className="focus-visible:ring-offset-0"
                                type="password"
                                placeholder="Enter your new password again"
                                required
                                id="password_confirmation"
                                name="password_confirmation"
                            />
                        </div>
                    </form>
                    <DialogFooter className="sm:justify-start gap-2">
                        <Button
                            type="submit"
                            className="bg-greendefault hover:bg-greendefault/90"
                        >
                            Change
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
