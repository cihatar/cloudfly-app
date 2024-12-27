import { Link } from "react-router-dom";
import { CustomButton, InputField } from "../global/FormElements";
import { Title } from "../global/Titles";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { forgotPassword } from "@/store/user/userSlice";
import { useRef } from "react";

interface ForgotPasswordForm {
    email: string;
}

export default function ForgotPasswordForm() {
    // redux
    const isLoading = useAppSelector((state) => state.user.isLoading);
    const dispatch = useAppDispatch();

    // toast
    const { toast } = useToast();

    // ref
    const emailRef = useRef<null | HTMLInputElement>(null);

    // handle forgot password
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(
            formData.entries()
        ) as unknown as ForgotPasswordForm;

        dispatch(forgotPassword(data)).unwrap().then((res) => {
            toast({
                title: "Success",
                description: res.message,
                variant: "default",
                style: {
                    color: "#fafafa",
                    backgroundColor: "#5cb85c",
                },
            });

            // clear input
            if (emailRef.current) {
                emailRef.current.value = "";
            }

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
            <Title title="Forgot your password?" className="text-center mb-2"/>

            <div>
                <InputField 
                    type="email" 
                    placeholder="Enter your email" 
                    id="email" 
                    name="email" 
                    ref={emailRef}
                />
            </div>
            <CustomButton disabled={isLoading} text="Send reset password link" />
            <Link to="/auth/login" className="text-blue-700 underline text-xs">
                Go back
            </Link>
        </form>
    );

}
