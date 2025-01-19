import { AlignJustify, Cloudy } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CustomButton } from "./FormElements";
import ChangeTheme from "./ChangeTheme";
import { TOGGLE_SIDEBAR_DESKTOP, TOGGLE_SIDEBAR_MOBILE } from "@/store/sidebar/sidebarReducer";
import { useEffect } from "react";

export default function Navbar() {
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    const location = useLocation();   
    
    useEffect(() => {
        if(window.innerWidth < 1024) {
            dispatch({ type: TOGGLE_SIDEBAR_MOBILE }); 
        }        
    }, [location]);
    
    return (
        <>
            <nav className="bg-zinc-100 dark:bg-zinc-900 min-h-5 flex items-center justify-between p-1 px-6 z-50">
                {/* open/close sidebar */}
                {
                    (location.pathname === "/drive" ||
                    location.pathname === "/quick-access" ||
                    location.pathname === "/starred" ||
                    location.pathname === "/trash" ||
                    location.pathname === "/profile/settings") ?
                    <div className="cursor-pointer rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 p-1" onClick={() => {
                        if(window.innerWidth < 1024) {
                            dispatch({ type: TOGGLE_SIDEBAR_MOBILE });
                        } else {
                            dispatch({ type: TOGGLE_SIDEBAR_DESKTOP }); 
                        }
                    }}>
                        <AlignJustify className="scale-75"/>
                    </div> :
                    <div className="w-8"></div>
                }

                {/* logo */}
                <div>
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

                {/* theme */}
                <ChangeTheme />
            </nav>
            <Outlet />
        </>
    );
}
