import { useState } from "react";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Progress } from "../ui/progress";
import LogoutButton from "../auth/LogoutButton";
import UploadProgress from "./UploadProgress";
import { bytesToSize, convertToPercentage } from "@/utils/convert";

export default function Sidebar() {
    // show sidebar 
    const [showSidebar, setShowSidebar] = useState(false);

    // redux
    const user = useAppSelector((state) => state.user.user);

    return (
        <div className="screen-with-sidebar h-screendefault overflow-auto">

            <div className="lg:hidden absolute top-3 left-3 cursor-pointer" onClick={() => setShowSidebar(!showSidebar)}>
                <AlignJustify className="scale-75 text-whitedefault"/>
            </div>
            
            <div className={`w-full bg-blackdefault/5 text-blackdefault px-6 py-4 flex flex-col justify-between z-10 lg:flex ${!showSidebar && 'hidden'}`}>
                <div>
                    {/* header */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="w-full flex justify-between items-center mb-4 p-2 rounded cursor-pointer hover:bg-blackdefault/5">
                            <div className="w-full flex items-center justify-between">
                                <div className="flex items-center gap-2">

                                    <img src={user?.profileImage} alt={user?.firstName} className="rounded w-8 h-8"/>

                                    <div className="text-start">
                                        <p className="font-semibold text-sm">
                                            {`${user?.firstName} ${user?.lastName}`.length > 15
                                                ? `${user?.firstName} ${user?.lastName}`.substring(0,12) + "..."
                                                : `${user?.firstName} ${user?.lastName}`}
                                        </p>
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
                    <p className="font-bold text-xs text-blackdefault/50 p-2">
                        Tabs
                    </p>
                    <ul>
                        <li>
                            <NavLink
                                to="/drive"
                                className="flex justify-between p-2 text-blackdefault rounded cursor-pointer hover:bg-blackdefault/5"
                                >
                                <div className="flex items-center gap-2">
                                    <HardDrive className="scale-75" />
                                    <p className="text-sm">My Drive</p>
                                </div>
                                <ChevronRight className="scale-50" />
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/starred"
                                className="flex justify-between p-2 text-blackdefault rounded cursor-pointer hover:bg-blackdefault/5"
                                >
                                <div className="flex items-center gap-2">
                                    <FolderHeart className="scale-75" />
                                    <p className="text-sm">Starred</p>
                                </div>
                                <ChevronRight className="scale-50" />
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/trash"
                                className="flex justify-between p-2 text-blackdefault rounded cursor-pointer hover:bg-blackdefault/5"
                                >
                                <div className="flex items-center gap-2">
                                    <Trash2 className="scale-75" />
                                    <p className="text-sm">Trash</p>
                                </div>
                                <ChevronRight className="scale-50" />
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* footer */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                        <div className="text-xs bg-blackdefault/5 select-none flex flex-col justify-center items-center gap-2 p-2 mt-2">
                            {bytesToSize(user?.currentStorage)}
                            {" / "}
                            {bytesToSize(user?.maxStorage)}
                            <Progress value={convertToPercentage(user?.currentStorage, user?.maxStorage)} className="bg-whitedefault h-1" />
                        </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs">
                                {bytesToSize((user?.maxStorage || 0) - (user?.currentStorage || 0))}
                                {" "}of free memory out of{" "}
                                {bytesToSize(user?.maxStorage)}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                
            </div>

            {/* outlet */}
            <div className="w-full lg:h-full p-6 lg:p-12 lg:overflow-y-auto">
                <Outlet />
            </div>

            <UploadProgress />
            
        </div>
    );
}
