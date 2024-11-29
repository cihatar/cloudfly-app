import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import GoogleSign from "./GoogleSign";

export default function RegisterForm() {
    return (
        <form className="w-96 flex justify-center flex-col gap-y-4 p-8 shadow-2xl bg-whitedefault">
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
                />
            </div>
            <Button type="submit">Register</Button>
            <p className="text-xs">
                Do you have an account?{" "}
                <Link to="/auth/login" className="text-blue-700 underline">
                    Login
                </Link>
            </p>
        </form>
    );
}
