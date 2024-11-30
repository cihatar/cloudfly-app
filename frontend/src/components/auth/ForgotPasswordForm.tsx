import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { forgotPassword } from "@/store/user/userSlice";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface ForgotPasswordForm {
    email: String;
}

export default function ForgotPasswordForm() {
    // redux
    const { isLoading, success, error } = useAppSelector((state) => ({
        ...state.user,
    }));
    const dispatch = useAppDispatch();

    // toast
    const { toast } = useToast();

    // handle forgot password
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(
            formData.entries()
        ) as unknown as ForgotPasswordForm;

        await dispatch(forgotPassword(data));
    };

    useEffect(() => {
        if (success) {
            toast({
                title: "Success",
                description: success,
                variant: "default",
                style: {
                    color: "#fafafa",
                    backgroundColor: "#5cb85c",
                },
            });


        } else if (error) {
            toast({
                title: "Error",
                description: error,
                variant: "destructive",
            });
        }
    }, [success, error])

    return (
        <>
            {success ? (
                <div className="w-96 flex flex-col items-center justify-center gap-y-4 p-8 shadow-2xl bg-whitedefault">
                    <p className="text-9xl">✅</p>
                    <p className="text-center font-light">Password reset link has been sent</p>
                </div>
            ) : (
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
                    <Link
                        to="/auth/login"
                        className="text-blue-700 underline text-xs"
                    >
                        Go back
                    </Link>
                </form>
            )}
        </>
    );

}
