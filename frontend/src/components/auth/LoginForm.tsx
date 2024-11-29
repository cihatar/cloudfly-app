import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import GoogleSign from "./GoogleSign";

export default function LoginForm() {
    return (
        <form className="w-96 flex justify-center flex-col gap-y-4 p-8 shadow-2xl bg-whitedefault">
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
                />
            </div>
            <Button type="submit">Login</Button>
            <p className="text-xs">
                Not a member yet?{" "}
                <Link to="/auth/register" className="text-blue-700 underline">
                    Register
                </Link>
            </p>
        </form>
    );
}
