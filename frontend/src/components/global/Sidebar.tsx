import { useAppSelector } from "@/store/hooks";
import {
    ChevronRight,
    FolderHeart,
    HardDrive,
    LogOut,
    Settings,
    Settings2,
    SquareUser,
    Trash2,
    UserRound,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
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

export default function Sidebar() {
    // redux
    const { user } = useAppSelector((state) => ({ ...state.user }));

    return (
        <div
            className="w-full bg-blackdefault/5 text-blackdefault px-6 py-4
        flex flex-col justify-between"
        >
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
                                        {`${user?.firstName} ${user?.lastName}`
                                            .length > 15
                                            ? `${user?.firstName} ${user?.lastName}`.substring(
                                                  0,
                                                  12
                                              ) + "..."
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
    );
}
