import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton, InputWithLabel } from "../global/FormElements";
import { Title } from "../global/Titles";
import GoogleSign from "./GoogleSign";
import { registerUser } from "@/store/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import useCustomToast from "@/hooks/useCustomToast";

interface RegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default function RegisterForm() {
    // redux
    const isLoading = useAppSelector((state) => state.user.isLoading);
    const dispatch = useAppDispatch();

    // navigate
    const navigate = useNavigate();

    // toast
    const showToast = useCustomToast();

    // ref
    const firstNameRef = useRef<null | HTMLInputElement>(null);
    const lastNameRef = useRef<null | HTMLInputElement>(null);
    const emailRef = useRef<null | HTMLInputElement>(null);
    const passwordRef = useRef<null | HTMLInputElement>(null);

    // handle login
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(
            formData.entries()
        ) as unknown as RegisterForm;

        dispatch(registerUser(data)).unwrap().then((res) => {
            showToast(res.message);

            // clear inputs
            if (firstNameRef.current && lastNameRef.current && emailRef.current && passwordRef.current) {
                firstNameRef.current.value = "";
                firstNameRef.current.disabled = true;
                lastNameRef.current.value = "";
                lastNameRef.current.disabled = true;
                emailRef.current.value = "";
                emailRef.current.disabled = true;
                passwordRef.current.value = "";
                passwordRef.current.disabled = true;
            }

            navigate("/auth/login");
        }).catch((err) => {
            showToast(err, false);
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-96 flex justify-center flex-col gap-y-4 p-8 shadow-2xl bg-whitedefault"
        >
            <Title title="Register" className="text-center mb-2"/>

            <GoogleSign />
            <div className="flex w-full items-center gap-2 text-xs text-blackdefault">
                <div className="h-px w-full bg-[#E4E4E7]"></div>
                OR
                <div className="h-px w-full bg-[#E4E4E7]"></div>
            </div>
            <div className="flex gap-2">
                <div>
                    <InputWithLabel 
                        label="First Name" 
                        type="text" 
                        placeholder="First Name" 
                        id="firstName" 
                        name="firstName" 
                        ref={firstNameRef}
                    />
                </div>
                <div>
                    <InputWithLabel 
                        label="Last Name" 
                        type="text" 
                        placeholder="Last Name" 
                        id="lastName" 
                        name="lastName" 
                        ref={lastNameRef}
                    />
                </div>
            </div>
            <div>
                <InputWithLabel 
                    label="Email" 
                    type="email" 
                    placeholder="Email" 
                    id="email" 
                    name="email" 
                    ref={emailRef}
                />
            </div>
            <div>
                <InputWithLabel 
                    label="Password" 
                    type="password" 
                    placeholder="Password" 
                    id="password" 
                    name="password" 
                    ref={passwordRef}
                />
            </div>
            <CustomButton disabled={isLoading} text="Register"/>
            <p className="text-xs">
                Do you have an account?{" "}
                <Link to="/auth/login" className="text-blue-700 underline">
                    Login
                </Link>
            </p>
        </form>
    );
}
