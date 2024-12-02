import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import GoogleSign from "./GoogleSign";
import { registerUser } from "@/store/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default function RegisterForm() {
    // redux
    const { isLoading } = useAppSelector((state) => ({
        ...state.user,
    }));
    const dispatch = useAppDispatch();

    // navigate
    const navigate = useNavigate();

    // toast
    const { toast } = useToast();

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

        await dispatch(registerUser(data)).unwrap().then((res) => {
            toast({
                title: "Success",
                description: res.message,
                variant: "default",
                style: {
                    color: "#fafafa",
                    backgroundColor: "#5cb85c",
                },
            });

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
            toast({
                title: "Error",
                description: err,
                variant: "destructive",
            });
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-96 flex justify-center flex-col gap-y-4 p-8 shadow-2xl bg-whitedefault"
        >
            <h1 className="text-center text-4xl m-2 font-bold text-gray-700">
                Register
            </h1>
            <GoogleSign />
            <div className="flex w-full items-center gap-2 text-xs text-blackdefault">
                <div className="h-px w-full bg-blackdefault/25"></div>
                OR
                <div className="h-px w-full bg-blackdefault/25"></div>
            </div>
            <div className="flex gap-2">
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
                        ref={firstNameRef}
                    />
                </div>
                <div>
                    <Label htmlFor="lastName" className="text-gray-700 text-xs">
                        Last Name
                    </Label>
                    <Input
                        className="focus-visible:ring-offset-0"
                        type="text"
                        placeholder="Last Name"
                        required
                        id="lastName"
                        name="lastName"
                        ref={lastNameRef}
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="email" className="text-gray-700 text-xs">
                    Email
                </Label>
                <Input
                    className="focus-visible:ring-offset-0"
                    type="email"
                    placeholder="Email"
                    required
                    id="email"
                    name="email"
                    ref={emailRef}
                />
            </div>
            <div>
                <Label htmlFor="password" className="text-gray-700 text-xs">
                    Password
                </Label>
                <Input
                    className="focus-visible:ring-offset-0"
                    type="password"
                    placeholder="Password"
                    required
                    id="password"
                    name="password"
                    ref={passwordRef}
                />
            </div>
            <Button type="submit" disabled={isLoading ? true : false}>
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin" />
                        Please wait
                    </>
                ) : (
                    "Register"
                )}
            </Button>
            <p className="text-xs">
                Do you have an account?{" "}
                <Link to="/auth/login" className="text-blue-700 underline">
                    Login
                </Link>
            </p>
        </form>
    );
}
