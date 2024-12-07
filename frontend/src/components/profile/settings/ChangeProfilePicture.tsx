import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/store/user/userSlice";
import { Trash2 } from "lucide-react";

interface ChangeProfilePictureProps {
    user: User | null;
}

export default function ChangeProfilePicture({ user }: ChangeProfilePictureProps) {
    return (
        <>
            <Avatar className="rounded w-24 h-24">
                <AvatarImage src={user?.profileImage} alt={user?.firstName} />
                <AvatarFallback className="rounded">
                    {`${user?.firstName}`.slice(0, 1)}
                </AvatarFallback>
            </Avatar>
            <div className="w-64 flex flex-col gap-4">
                <input
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    hidden
                />
                <Button className="w-full">Change</Button>
                <Button className="w-full" variant={"secondary"}>
                    <Trash2 />
                    Remove
                </Button>
            </div>
        </>
    );
}
