import React from "react";
import useCustomToast from "@/hooks/useCustomToast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/user/userSlice";
import { CustomButton } from "../global/FormElements";
import { useQueryClient } from "@tanstack/react-query";

export default function LogoutButton() {
    // redux
    const dispatch = useAppDispatch();

    // navigate
    const navigate = useNavigate();

    // toast
    const showToast = useCustomToast();

    // query
    const queryClient = useQueryClient();

    // handle logout
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        dispatch(logout())
            .unwrap()
            .then((res) => {
                showToast(res.message);
                queryClient.clear();
                navigate("/");
            })
            .catch((err) => {
                showToast(err, false);
            });
    };

    return (
        <CustomButton
            variant="secondary"
            effect={false}
            className="h-5 bg-transparent p-0 font-normal"
            onClick={handleClick}
        >
                Logout
        </CustomButton>
    );
}
