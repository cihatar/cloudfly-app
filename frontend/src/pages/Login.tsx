import LoginForm from "@/components/auth/LoginForm";
import Animate from "@/components/global/Animate";

export default function LoginPage() {
    return (
        <Animate className="min-h-screendefault flex items-center justify-center">
            <LoginForm />
        </Animate>
    );
}
