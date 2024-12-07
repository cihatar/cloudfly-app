import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/store/user/userSlice";

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
            <Button variant="secondary">Change Password</Button>
        </div>
    );
}
