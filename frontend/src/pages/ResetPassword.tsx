import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { useSearchParams } from "react-router-dom";
import NoPage from "./NoPage";
import Animate from "@/components/global/Animate";

export default function ResetPassword() {
    const [query] = useSearchParams();
    const token = query.get("token") as string;

    if (!token) {
        return <NoPage />;
    }

    return (
        <Animate>
            <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
                <ResetPasswordForm token={token} />
            </div>
        </Animate>
    );
}