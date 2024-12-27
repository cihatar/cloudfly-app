import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton, InputWithLabel } from "../global/FormElements";
import GoogleSign from "./GoogleSign";
import { loginUser, setUser } from "@/store/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useToast } from "@/hooks/use-toast";

interface LoginForm {
    email: string;
    password: string;
}

export default function LoginForm() {
    // redux
    const isLoading = useAppSelector((state) => state.user.isLoading);
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

            // set and redirect user
            setTimeout(() => {
                dispatch(setUser(res));
                navigate("/drive");
                setBtnLoading(false);
            }, 1000);
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
                    id="password" name="password" 
                    ref={passwordRef}
                />
            </div>
            <CustomButton disabled={btnLoading} loading={isLoading} text="Login" />
            <div className="flex justify-between">
                <p className="text-xs">
                    Not a member yet?{" "}
                    <Link to="/auth/register" className="text-blue-700 underline">
                        Register
                    </Link>
                </p>
                <Link to="/auth/forgot-password" className="text-blue-700 underline text-xs">
                        Forgot Password
                </Link>
            </div>
        </form>
    );
}
