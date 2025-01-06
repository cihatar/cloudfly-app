import { Cloudy } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { CustomButton } from "./FormElements";
import ChangeTheme from "./ChangeTheme";

export default function Navbar() {
    const user = useAppSelector((state) => state.user.user);

    return (
        <>
            <nav className="bg-zinc-100 dark:bg-zinc-900 min-h-5 flex items-center justify-center lg:justify-between p-1 px-6 z-50">
                {/* <div></div> */}
                <div className="">
                    <CustomButton
                        variant={"link"}
                        effect={false}
                        className="p-2 select-none flex items-center justify-center text-sm gap-1"
                        asChild
                    >
                        <Link to={user ? "/drive" : "/"}>
                            <Cloudy />
                            Cloudfly
                        </Link>
                    </CustomButton>
                </div>
                <ChangeTheme />
            </nav>
            <Outlet />
        </>
    );
}
