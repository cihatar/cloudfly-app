import LoginForm from "@/components/auth/LoginForm";
import Animate from "@/components/global/Animate";

export default function LoginPage() {
    return (
        <Animate>
            <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
                <LoginForm />
            </div>
        </Animate>
    );
}
