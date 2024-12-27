import Animate from "@/components/global/Animate";
import { Subtitle, Title } from "@/components/global/Titles";
import ChangePassword from "@/components/profile/settings/ChangePassword";
import ChangeProfilePicture from "@/components/profile/settings/ChangeProfilePicture";
import DeleteUser from "@/components/profile/settings/DeleteUser";
import UpdateName from "@/components/profile/settings/UpdateName";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/store/hooks";

export default function ProfileSettings() {
    // redux
    const user = useAppSelector((state) => state.user.user);

    return (
        <Animate>

            {/* title */}
            <Title title="Settings" subtitle="Update and customize your profile information"/>


            <Separator className="mt-4 mb-14" />


            {/* change profile image */}
            <Subtitle title="Change Your Profile Image" />
            <div className="flex items-center gap-x-4">
            <ChangeProfilePicture user={user}/>
            </div>
            <p className="text-blackdefault/75 text-xs mt-4">
                Recommended size is <b>256x256px</b>
            </p>


            <Separator className="mt-4 mb-14" />


            {/* update information */}
            <Subtitle title="Update Your Information" />
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
    );
}
