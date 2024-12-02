import Animate from "@/components/global/Animate";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NoPage() {
    return (
        <Animate>
            <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
                <div className="w-96 flex flex-col items-center justify-center gap-y-4 p-8 shadow-2xl bg-whitedefault">
                    <p className="text-9xl">😒</p>
                    <h1 className="text-9xl font-bold">404</h1>
                    <p className="text-center font-light">
                        The page you are trying to access doesn&#39;t exist
                    </p>
                    <Button asChild className="w-48">
                        <Link to="/">Return home</Link>
                    </Button>
                </div>
            </div>
        </Animate>
    );
}
