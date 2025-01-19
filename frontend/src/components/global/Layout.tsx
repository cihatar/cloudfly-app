import { useAppSelector } from "@/store/hooks";
import { Outlet } from "react-router-dom";
import UploadProgress from "./UploadProgress";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

export default function Layout() {
    // redux
    const { isDesktopSidebarOpen, isMobileSidebarOpen } = useAppSelector((state) => state.sidebar);
    const user = useAppSelector((state) => state.user.user);        

    return (
        <div className={`${isDesktopSidebarOpen ? "screen-with-sidebar" : "screen-with-small-sidebar"} h-screendefault overflow-auto`}>
            
            {/* sidebar */}
            <div className="lg:block hidden">
                <DesktopSidebar user={user} isSidebarOpen={isDesktopSidebarOpen} />
            </div>
            <div className="block lg:hidden">
                <MobileSidebar user={user} isSidebarOpen={isMobileSidebarOpen} />
            </div>
            

            {/* outlet */}
            <div className="w-full lg:h-full lg:overflow-y-auto">
                <Outlet />
            </div>

            {/* upload progress */}
            <UploadProgress />
            
        </div>
    );
}
