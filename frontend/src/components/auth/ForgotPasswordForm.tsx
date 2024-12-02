import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { forgotPassword } from "@/store/user/userSlice";
import { useRef } from "react";
import { Loader2 } from "lucide-react";

interface ForgotPasswordForm {
    email: string;
}

export default function ForgotPasswordForm() {
    // redux
    const { isLoading } = useAppSelector((state) => ({
        ...state.user,
    }));
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

        await dispatch(forgotPassword(data)).unwrap().then((res) => {
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
            <h1 className="text-center text-4xl m-2 font-bold text-gray-700">
                Forgot your password?
            </h1>
            <div>
                <Input
                    className="focus-visible:ring-offset-0"
                    type="email"
                    placeholder="Enter your email"
                    required
                    id="email"
                    name="email"
                    ref={emailRef}
                />
            </div>
            <Button type="submit" disabled={isLoading ? true : false}>
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin" />
                        Please wait
                    </>
                ) : (
                    "Send reset password link"
                )}
            </Button>
            <Link to="/auth/login" className="text-blue-700 underline text-xs">
                Go back
            </Link>
        </form>
    );

}
