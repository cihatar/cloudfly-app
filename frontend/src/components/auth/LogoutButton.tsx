import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/user/userSlice";

export default function LogoutButton() {
    // redux
    const dispatch = useAppDispatch();

    // navigate
    const navigate = useNavigate();

    // toast
    const { toast } = useToast();

    // handle logout
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        dispatch(logout())
            .unwrap()
            .then((res) => {
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
                navigate("/auth/login");
            })
            .catch((err) => {
                toast({
                    title: "Error",
                    description: err,
                    variant: "destructive",
                });
            });
    };

    return (
        <Button
            asChild
            variant="secondary"
            className="h-[32px]"
            onClick={handleClick}
        >
            <div className="flex items-center gap-1 cursor-pointer font-normal">
                <LogOut className="scale-75" /> Logout
            </div>
        </Button>
    );
}
