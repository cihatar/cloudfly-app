import { Cloudy } from "lucide-react";
import { Button } from "../ui/button";
import { Outlet } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav className="bg-blackdefault min-h-5 flex items-center justify-center text-white p-1">
                <Button
                    variant={"link"}
                    className="select-none flex items-center justify-center text-whitedefault text-sm gap-1"
                >
                    <Cloudy />
                    Cloudfly
                </Button>
            </nav>
            <Outlet />
        </>
    );
}
