import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import GoogleSign from "./GoogleSign";
import { loginUser } from "@/store/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginForm {
    email: string;
    password: string;
}

export default function LoginForm() {
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
    const emailRef = useRef<null | HTMLInputElement>(null);
    const passwordRef = useRef<null | HTMLInputElement>(null);
    
    // button loading
    const [btnLoading, setBtnLoading] = useState(false);

    // handle login
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(
            formData.entries()
        ) as unknown as LoginForm;

        setBtnLoading(true);
        dispatch(loginUser(data)).unwrap().then((res) => {     
            toast({
                title: "Success",
                description: `Welcome, ${res?.firstName}!`,
                variant: "default",
                duration: 3000,
                style: {
                    color: "#fafafa",
                    backgroundColor: "#5cb85c",
                },
            });
            // clear inputs
            if (emailRef.current && passwordRef.current) {
                emailRef.current.value = "";
                emailRef.current.disabled = true;
                passwordRef.current.value = "";
                passwordRef.current.disabled = true;
            }

            // redirect user
            setTimeout(() => {
                navigate("/");
                window.location.reload();
                setBtnLoading(false);
            }, 3000);
        }).catch((err) => {
            toast({
                title: "Error",
                description: err,
                variant: "destructive",
            });
            setBtnLoading(false);
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-96 flex justify-center flex-col gap-y-4 p-8 shadow-2xl bg-whitedefault"
        >
            <h1 className="text-center text-4xl m-2 font-bold text-gray-700">
                Login
            </h1>
            <GoogleSign />
            <div className="flex w-full items-center gap-2 text-xs text-blackdefault">
                <div className="h-px w-full bg-blackdefault/25"></div>
                OR
                <div className="h-px w-full bg-blackdefault/25"></div>
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
                <div className="flex justify-between text-xs mb-1">
                    <Label htmlFor="password" className="text-gray-700">
                        Password
                    </Label>
                    <Link
                        to="/auth/forgot-password"
                        className="text-blue-700 underline"
                    >
                        Forgot Password
                    </Link>
                </div>
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
            <Button type="submit" disabled={btnLoading ? true : false}>
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin" />
                        Please wait
                    </>
                ) : (
                    "Login"
                )}
            </Button>
            <p className="text-xs">
                Not a member yet?{" "}
                <Link to="/auth/register" className="text-blue-700 underline">
                    Register
                </Link>
            </p>
        </form>
    );
}
