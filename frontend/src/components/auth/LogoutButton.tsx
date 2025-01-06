import React from "react";
import { Button } from "../ui/button";
import useCustomToast from "@/hooks/useCustomToast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/user/userSlice";

export default function LogoutButton() {
    // redux
    const dispatch = useAppDispatch();

    // navigate
    const navigate = useNavigate();

    // toast
    const showToast = useCustomToast();

    // handle logout
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        dispatch(logout())
            .unwrap()
            .then((res) => {
                showToast(res.message);
                navigate("/");
            })
            .catch((err) => {
                showToast(err, false);
            });
    };

    return (
        <Button
            variant="secondary"
            className="h-5 bg-transparent p-0 font-normal"
            onClick={handleClick}
        >
                Logout
        </Button>
    );
}
