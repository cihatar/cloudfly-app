import Animate from "@/components/global/Animate";
import Sidebar from "@/components/global/Sidebar";
import ChangePassword from "@/components/profile/settings/ChangePassword";
import ChangeProfilePicture from "@/components/profile/settings/ChangeProfilePicture";
import DeleteUser from "@/components/profile/settings/DeleteUser";
import UpdateName from "@/components/profile/settings/UpdateName";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/store/hooks";

export default function ProfileSettings() {
    // redux
    const user = useAppSelector((state) => ({ ...state.user.user }));

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
                       <ChangeProfilePicture user={user}/>
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
                        {/* update name */}
                        <UpdateName user={user} />

                        {/* change password */}
                        <ChangePassword user={user} />
                    </div>


                    <Separator className="mt-4 mb-14" />


                    {/* delete account */}
                    <DeleteUser />

                </Animate>
            </div>
        </div>
    );
}
