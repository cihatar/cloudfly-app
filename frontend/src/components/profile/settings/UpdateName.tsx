import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/store/hooks";
import { updateName, User } from "@/store/user/userSlice";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface UpdateNameProps {
    user: User | null;
}

interface UpdateNameForm {
    firstName: string;
    lastName: string;
}

export default function UpdateName({ user }: UpdateNameProps) {
    // redux
    const dispatch = useAppDispatch();

    // toast
    const { toast } = useToast();
    
    // button loading
    const [btnLoading, setBtnLoading] = useState(false);

    // handle update name
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(
            formData.entries()
        ) as unknown as UpdateNameForm;

        if (data.firstName === user?.firstName &&
            data.lastName === user?.lastName) return;

        setBtnLoading(true);
        dispatch(updateName(data)).unwrap().then((res) => {     
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
        }).catch((err) => {
            toast({
                title: "Error",
                description: err,
                variant: "destructive",
            });
        }).finally(() => setBtnLoading(false));
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
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
            <Button type="submit" variant="secondary" disabled={btnLoading ? true : false}>
            {btnLoading ? (
                    <>
                        <Loader2 className="animate-spin" />
                        Please wait
                    </>
                ) : (
                    "Update"
                )}
            </Button>
        </form>
    );
}
