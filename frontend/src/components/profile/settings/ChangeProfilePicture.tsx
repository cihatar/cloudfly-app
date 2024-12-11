import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/store/hooks";
import { updateImage, User } from "@/store/user/userSlice";
import { Loader2, Trash2 } from "lucide-react";
import React, { useRef, useState } from "react";

interface ChangeProfilePictureProps {
    user: User | null;
}

export default function ChangeProfilePicture({ user }: ChangeProfilePictureProps) {
    // profile image
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // redux 
    const dispatch = useAppDispatch();

    // ref
    const fileRef = useRef<null | HTMLInputElement>(null);

    // button loading
    const [btnLoading, setBtnLoading] = useState(false);

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

        setBtnLoading(true);

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
        }).finally(() => setBtnLoading(false));
    }


    return (
        <>
            <Avatar
                className="rounded w-24 h-24 cursor-pointer"
                onClick={() => fileRef.current?.click()}
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
                <Button
                    className="w-full"
                    disabled={btnLoading ? true : profileImage ? false : true}
                >
                     {btnLoading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Please wait
                            </>
                        ) : (
                            "Change"
                        )}
                </Button>
                <Button type="button" className="w-full" variant={"secondary"}>
                    <Trash2 />
                    Remove
                </Button>
            </form>
        </>
    );
}
