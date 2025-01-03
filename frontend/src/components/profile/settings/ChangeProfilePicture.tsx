import { CustomButton } from "@/components/global/FormElements";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/store/hooks";
import { removeImage, updateImage, User } from "@/store/user/userSlice";
import React, { useRef, useState } from "react";

interface ChangeProfilePictureProps {
    user: User | null;
}

export default function ChangeProfilePicture({ user }: ChangeProfilePictureProps) {
    // profile image
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const defaultProfileImage = `${import.meta.env.VITE_BACKEND_URL}/images/default-profile-image.jpg`;
    const isDefaultProfileImage = user?.profileImage === defaultProfileImage;

    // redux 
    const dispatch = useAppDispatch();

    // ref
    const fileRef = useRef<null | HTMLInputElement>(null);

    // button loading
    const [uploadBtnLoading, setUploadBtnLoading] = useState(false);
    const [removeBtnLoading, setRemoveBtnLoading] = useState(false);

    // toast
    const { toast } = useToast();



    // handle file input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        
        const target = e.target as HTMLInputElement;
        const image: File = (target.files as FileList)[0];
        setProfileImage(image);

        const preview = URL.createObjectURL(image);        
        setPreviewImage(preview);        
    };



    // handle profile image upload
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setUploadBtnLoading(true);

        const image = profileImage as File;
        const formData = new FormData();
        formData.append("profileImage", image);

        dispatch(updateImage(formData)).unwrap().then((res) => {     
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
            setProfileImage(null);
            setPreviewImage(null); 
        }).catch((err) => {
            toast({
                title: "Error",
                description: err,
                variant: "destructive",
            });
        }).finally(() => setUploadBtnLoading(false));
    };



    // handle remove image 
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setRemoveBtnLoading(true);

        dispatch(removeImage()).unwrap().then((res) => {     
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
            setProfileImage(null);
            setPreviewImage(null); 
        }).catch((err) => {
            toast({
                title: "Error",
                description: err,
                variant: "destructive",
            });
        }).finally(() => setRemoveBtnLoading(false));
    };


    return (
        <>
            <Avatar
                className="rounded w-24 h-24 cursor-pointer"
                onClick={() => {
                    if (fileRef.current) {
                        fileRef.current.click()
                        fileRef.current.value = "";
                    }
                }}
            >
                <AvatarImage
                    src={previewImage ? previewImage : user?.profileImage}
                    alt={user?.firstName}
                />
                <AvatarFallback className="rounded">
                    {`${user?.firstName}`.slice(0, 1)}
                </AvatarFallback>
            </Avatar>
            <form className="w-64 flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    accept="image/*"
                    hidden
                    ref={fileRef}
                    onChange={handleChange}
                />

                {/* upload image button */}
                <CustomButton 
                    disabled={uploadBtnLoading ? true : profileImage ? false : true}
                    loading={uploadBtnLoading}
                    text="Change"
                />

                {/* remove image button */}
                <CustomButton 
                    onClick={handleClick} 
                    type="button" 
                    disabled={isDefaultProfileImage ? true : removeBtnLoading ? true : false}
                    loading={removeBtnLoading}
                    text="Remove"
                    variant="secondary" 
                />
            </form>
        </>
    );
}
