import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ForgotPasswordForm() {
    return (
        <form className="w-96 flex justify-center flex-col gap-y-4 p-8 shadow-2xl bg-whitedefault">
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
            <Button type="submit">Send reset password link</Button>
            <Link to="/auth/login" className="text-blue-700 underline text-xs">
                Go back
            </Link>
        </form>
    );
}
