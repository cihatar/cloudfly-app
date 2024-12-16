import { Cloudy } from "lucide-react";
import { Button } from "../ui/button";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

export default function Navbar() {
    const user = useAppSelector((state) => state.user.user);

    return (
        <>
            <nav className="bg-blackdefault min-h-5 flex items-center justify-center text-white p-1">
                <Button
                    variant={"link"}
                    className="select-none flex items-center justify-center text-whitedefault text-sm gap-1"
                    asChild
                >
                    <Link to={user ? "/drive" : "/"}>
                        <Cloudy />
                        Cloudfly
                    </Link>
                </Button>
            </nav>
            <Outlet />
        </>
    );
}
