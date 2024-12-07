import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/store/user/userSlice";

interface UpdateNameProps {
    user: User | null;
}

export default function UpdateName({ user }: UpdateNameProps) {
    return (
        <form className="flex flex-col gap-y-4">
            <div>
                <Label htmlFor="firstName" className="text-gray-700 text-xs">
                    First Name
                </Label>
                <Input
                    className="focus-visible:ring-offset-0"
                    type="text"
                    placeholder="First Name"
                    required
                    id="firstName"
                    name="firstName"
                    defaultValue={user?.firstName}
                />
            </div>
            <div>
                <Label htmlFor="lastName" className="text-gray-700 text-xs">
                    Last Name
                </Label>
                <Input
                    className="focus-visible:ring-offset-0"
                    type="text"
                    placeholder="Last Name"
                    required
                    id="lastName"
                    name="lastName"
                    defaultValue={user?.lastName}
                />
            </div>
            <Button type="submit" variant="secondary">
                Update
            </Button>
        </form>
    );
}
