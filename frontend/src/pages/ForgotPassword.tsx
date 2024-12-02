import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Animate from "@/components/global/Animate";

export default function ForgotPassword() {
    return (
        <Animate>
            <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
                <ForgotPasswordForm />
            </div>
        </Animate>
    );
}
