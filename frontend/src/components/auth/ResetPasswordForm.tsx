import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { resetPassword } from "@/store/user/userSlice";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ResetPasswordForm {
    password: string;
    password_confirmation: string;
}

export default function ResetPasswordForm({ token }: { token: string }) {
    // redux
    const { isLoading } = useAppSelector((state) => ({
        ...state.user,
    }));
    const dispatch = useAppDispatch();

    // toast
    const { toast } = useToast();

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
            if (passwordRef.current && passwordConfirmationRef.current) {
                passwordRef.current.value = "";
                passwordRef.current.disabled = true;
                passwordConfirmationRef.current.value = "";
                passwordConfirmationRef.current.disabled = true;
            }

            // navigate("/auth/login");

            setTimeout(() => {
                navigate("/auth/login");
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
                Reset your password
            </h1>
            <div>
                <Input
                    className="focus-visible:ring-offset-0 mb-4"
                    type="password"
                    placeholder="Enter your password"
                    required
                    id="password"
                    name="password"
                    ref={passwordRef}
                />
                <Input
                    className="focus-visible:ring-offset-0"
                    type="password"
                    placeholder="Enter your password again"
                    required
                    id="password_confirmation"
                    name="password_confirmation"
                    ref={passwordConfirmationRef}
                />
            </div>
            <Button type="submit" disabled={btnLoading ? true : false}>
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin" />
                        Please wait
                    </>
                ) : (
                    "Reset"
                )}
            </Button>
        </form>
    );
}
