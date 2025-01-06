import React, { useRef, useState } from "react";
import { CustomButton, InputField } from "../global/FormElements";
import { Title } from "../global/Titles";
import { resetPassword } from "@/store/user/userSlice";
import useCustomToast from "@/hooks/useCustomToast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

interface ResetPasswordForm {
    password: string;
    password_confirmation: string;
}

export default function ResetPasswordForm({ token }: { token: string }) {
    // redux
    const isLoading = useAppSelector((state) => state.user.isLoading);
    const dispatch = useAppDispatch();

    // toast
    const showToast = useCustomToast();

    // navigate
    const navigate = useNavigate();

    // ref
    const passwordRef = useRef<null | HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<null | HTMLInputElement>(null);

    // button loading
    const [btnLoading, setBtnLoading] = useState(false);

    // handle reset password
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { password, password_confirmation } = Object.fromEntries(
            formData.entries()
        ) as unknown as ResetPasswordForm;

        setBtnLoading(true);
        dispatch(resetPassword({ token, password, password_confirmation })).unwrap().then((res) => {
            showToast(res.message);
    
            // clear inputs
            if (passwordRef.current && passwordConfirmationRef.current) {
                passwordRef.current.value = "";
                passwordRef.current.disabled = true;
                passwordConfirmationRef.current.value = "";
                passwordConfirmationRef.current.disabled = true;
            }

            setTimeout(() => {
                navigate("/auth/login");
                setBtnLoading(false);
            }, 3000);
            }).catch((err) => {
                showToast(err, false);
                setBtnLoading(false);
            });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-96 flex justify-center flex-col gap-y-4 p-8 border shadow-md rounded-md"
        >
            <Title className="text-center mb-2">Reset password</Title>
            
            <InputField 
                type="password" 
                placeholder="Enter your password" 
                id="password" 
                name="password" 
                ref={passwordRef}
            />
            <InputField
                type="password" 
                placeholder="Enter your password again" 
                id="password_confirmation" 
                name="password_confirmation" 
                ref={passwordRef}
            />
            <CustomButton disabled={btnLoading} loading={isLoading}>Reset</CustomButton>
        </form>
    );
}
