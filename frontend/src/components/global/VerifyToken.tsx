import { useAppDispatch } from '@/store/hooks';
import { User, verifyToken } from '@/store/user/userSlice';
import { Location } from 'react-router-dom';
import { Cloudy, Loader2 } from 'lucide-react';
import React from 'react'

interface Props {
    children: React.ReactNode;
    user: User | null;
    location: Location;
}

export default function VerifyToken({ children, user, location }: Props) {
    const [logoScale, setLogoScale] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        const authenticateUser = async () => {
            setLoading(true);
            dispatch(verifyToken()).then(() => {
                setLogoScale(true);
                setTimeout(() => setLoading(false), 1000);
            });
        };
        if (!user &&
            location.pathname !== "/" &&
            location.pathname !== "/auth/login" &&
            location.pathname !== "/auth/register" &&
            location.pathname !== "/auth/forgot-password" &&
            location.pathname !== "/auth/reset-password") {
            authenticateUser();
        }
    }, []);

    if (loading) {
        return (
            <div className={`bg-blackdefault h-screen flex items-center justify-center text-white p-1`}>
                <div
                    className={`font-medium [&_svg]:size-4 select-none flex items-center justify-center text-whitedefault text-sm gap-1 transition-transform duration-1000 ${logoScale && "scale-150"}`}
                >
                    <Cloudy />
                    Cloudfly
                    <Loader2 className={`animate-spin ${logoScale && "hidden"}`} />
                </div>
            </div>
        );
    };

    return children;
}
