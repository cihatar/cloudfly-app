import RegisterForm from "@/components/auth/RegisterForm";
import Animate from "@/components/global/Animate";

export default function Register() {
    return (
        <Animate className="min-h-screendefault flex items-center justify-center">
            <RegisterForm />
        </Animate>
    );
}
