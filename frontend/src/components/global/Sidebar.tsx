import { useAppSelector } from "@/store/hooks";
import {
    AlignJustify,
    ChevronRight,
    FolderHeart,
    HardDrive,
    Settings,
    Trash2,
} from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LogoutButton from "../auth/LogoutButton";
import { useState } from "react";

export default function Sidebar() {
    // show sidebar 
    const [showSidebar, setShowSidebar] = useState(false);

    // redux
    const user = useAppSelector((state) => state.user.user);

    return (
        <div className="lg:grid lg:grid-cols-[280px,1fr] h-[calc(100vh-48px)] overflow-auto">

            <div className="lg:hidden absolute top-3 left-3 cursor-pointer" onClick={() => setShowSidebar(!showSidebar)}>
                <AlignJustify className="scale-75 text-whitedefault"/>
            </div>
            
            <div className={`w-full bg-blackdefault/5 text-blackdefault px-6 py-4 flex flex-col justify-between z-10 lg:block ${!showSidebar && 'hidden'}`}>
                <div>
                    {/* header */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="w-full flex justify-between items-center mb-4 p-2 rounded cursor-pointer hover:bg-blackdefault/5">
                            <div className="w-full flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Avatar className="rounded w-8 h-8">
                                        <AvatarImage
                                            src={user?.profileImage}
                                            alt={user?.firstName}
                                        />
                                        <AvatarFallback className="rounded">
                                            {`${user?.firstName}`.slice(0, 1)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="text-start">
                                        <h2 className="font-semibold text-sm">
                                            {`${user?.firstName} ${user?.lastName}`.length > 15
                                                ? `${user?.firstName} ${user?.lastName}`.substring(0,12) + "..."
                                                : `${user?.firstName} ${user?.lastName}`}
                                        </h2>
                                        <p className="text-blackdefault/80 text-xs">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                                <Settings className="scale-75" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-1"
                                >
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    to="/profile/settings"
                                    className="flex items-center gap-1"
                                >
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <LogoutButton />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* body */}
                    <div>
                        <h2 className="font-bold text-xs text-blackdefault/50 p-2">
                            Tabs
                        </h2>

                        <NavLink
                            to="/"
                            className="flex justify-between p-2 text-blackdefault rounded cursor-pointer hover:bg-blackdefault/5"
                        >
                            <div className="flex items-center gap-2">
                                <HardDrive className="scale-75" />
                                <h2 className="text-sm">My Drive</h2>
                            </div>
                            <ChevronRight className="scale-50" />
                        </NavLink>

                        <NavLink
                            to="/starred"
                            className="flex justify-between p-2 text-blackdefault rounded cursor-pointer hover:bg-blackdefault/5"
                        >
                            <div className="flex items-center gap-2">
                                <FolderHeart className="scale-75" />
                                <h2 className="text-sm">Starred</h2>
                            </div>
                            <ChevronRight className="scale-50" />
                        </NavLink>

                        <NavLink
                            to="/trash"
                            className="flex justify-between p-2 text-blackdefault rounded cursor-pointer hover:bg-blackdefault/5"
                        >
                            <div className="flex items-center gap-2">
                                <Trash2 className="scale-75" />
                                <h2 className="text-sm">Trash</h2>
                            </div>
                            <ChevronRight className="scale-50" />
                        </NavLink>
                    </div>
                </div>

                {/* footer */}
                <div></div>

            </div>

            {/* outlet */}
            <div className="w-full lg:h-full p-8 lg:p-12 lg:overflow-y-auto">
                <Outlet />
            </div>
            
        </div>
    );
}
