import { useAppSelector } from "@/store/hooks";
import {
    ChevronRight,
    FolderHeart,
    HardDrive,
    LogOut,
    Pencil,
    Settings,
    Trash2,
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

export default function Sidebar() {
    // redux
    const { user } = useAppSelector((state) => ({ ...state.user }));

    return (
        <div
            className="w-full bg-blackdefault/5 text-blackdefault min-h-[calc(100vh-48px)] px-6 py-4
        flex flex-col justify-between"
        >
            {/* header */}
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="w-full flex justify-between items-center mb-4 p-2 rounded cursor-pointer hover:bg-blackdefault/5">
                        <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                                        user?.profileImage
                                    }`}
                                    alt=""
                                    className="rounded w-8"
                                />
                                <div className="text-start">
                                    <h2 className="font-bold text-sm">
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
                                to="/edit-profile"
                                className="flex items-center gap-1"
                            >
                                <Pencil className="scale-75" />
                                Edit Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div className="flex items-center gap-1 cursor-pointer">
                                <LogOut className="scale-75" /> Logout
                            </div>
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
