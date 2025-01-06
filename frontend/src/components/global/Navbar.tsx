import { Cloudy } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { CustomButton } from "./FormElements";

export default function Navbar() {
    const user = useAppSelector((state) => state.user.user);

    return (
        <>
            <nav className="bg-blackdefault min-h-5 flex items-center justify-center text-white p-1">
                <CustomButton
                    variant={"link"}
                    effect={false}
                    className="select-none flex items-center justify-center text-whitedefault text-sm gap-1"
                    asChild
                >
                    <Link to={user ? "/drive" : "/"}>
                        <Cloudy />
                        Cloudfly
                    </Link>
                </CustomButton>
            </nav>
            <Outlet />
        </>
    );
}
