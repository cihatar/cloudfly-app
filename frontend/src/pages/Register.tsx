import RegisterForm from "@/components/auth/RegisterForm";
import Animate from "@/components/global/Animate";

export default function Register() {
    return (
        <Animate>
            <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
                <RegisterForm />
            </div>
        </Animate>
    );
}
