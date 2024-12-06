import Animate from "@/components/global/Animate";
import Sidebar from "@/components/global/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/store/hooks";
import { Trash2 } from "lucide-react";

export default function ProfileSettings() {
    // redux
    const { user } = useAppSelector((state) => ({ ...state.user }));

    return (
        <div className="grid grid-cols-[280px,1fr] h-[calc(100vh-48px)]">
            <Sidebar />
            <div className="w-full h-full self-center p-16 justify-self-center overflow-y-auto">
                <Animate>
                    {/* title */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold">Settings</h1>
                        <p className="text-blackdefault/75 text-xs">
                            Update and customize your profile information
                        </p>
                    </div>

                    <Separator className="mt-4 mb-14" />

                    {/* change profile image */}
                    <h2 className="text-xl font-semibold mb-4">
                        Change Your Profile Image
                    </h2>
                    <div className="flex items-center gap-x-4">
                        <Avatar className="rounded w-24 h-24">
                            <AvatarImage
                                src={user?.profileImage}
                                alt={user?.firstName}
                            />
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
                    </div>
                    <p className="text-blackdefault/75 text-xs mt-4">
                        Recommended size is <b>256x256px</b>
                    </p>

                    <Separator className="mt-4 mb-14" />

                    {/* update information */}
                    <h2 className="text-xl font-semibold mb-4">
                        Update Your Information
                    </h2>
                    <div className="flex gap-x-4 justify-stretch items-stretch">
                        <form className="flex flex-col gap-y-4">
                            <div>
                                <Label
                                    htmlFor="firstName"
                                    className="text-gray-700 text-xs"
                                >
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
                                <Label
                                    htmlFor="lastName"
                                    className="text-gray-700 text-xs"
                                >
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
                            <Button type="submit" variant="secondary">Update</Button>
                        </form>
                        <div className="flex flex-col gap-y-4">
                            <div>
                                <Label
                                    htmlFor="email"
                                    className="text-gray-700 text-xs"
                                >
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
                                <Label
                                    htmlFor="password"
                                    className="text-gray-700 text-xs"
                                >
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
                    </div>

                    <Separator className="mt-4 mb-14" />

                    {/* delete account */}
                    <Button type="submit" variant="destructive">Delete Your Account</Button>
                </Animate>
            </div>
        </div>
    );
}
