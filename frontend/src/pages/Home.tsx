import Animate from "@/components/global/Animate";
import logo from "@/assets/my_files.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-[calc(100vh-48px)] flex items-center justify-center overflow-hidden relative bg-blackdefault text-whitedefault">
            <Animate className="w-[1200px] flex flex-col lg:flex-row items-center justify-center gap-8 px-16">
                <img
                    src={logo}
                    alt="My Files"
                    width={500}
                    className="w-72 lg:w-[500px]"
                />
                <div className="flex flex-col items-center text-center justify-center gap-y-8">
                    <h2 className="font-semibold text-4xl lg:text-5xl">
                        <span className="text-bluedefault">Cloud-based</span> file storage and sharing application
                    </h2>
                    <Button asChild className="h-12 w-40" variant="secondary">
                        <Link to="/auth/login">Login/Register</Link>
                    </Button>
                </div>
            </Animate>
        </div>
    );
}
