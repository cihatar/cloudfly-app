import { useAppDispatch } from '@/store/hooks';
import { User, verifyToken } from '@/store/user/userSlice';
import { Location } from 'react-router-dom';
import { Cloudy, Loader2 } from 'lucide-react';
import React from 'react'
import useCustomToast from '@/hooks/useCustomToast';

interface Props {
    children: React.ReactNode;
    user: User | null;
    location: Location;
}

export default function VerifyToken({ children, user, location }: Props) {
    const [logoScale, setLogoScale] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    
    const dispatch = useAppDispatch();

    const showToast = useCustomToast();

    React.useEffect(() => {
        const authenticateUser = () => {
            setLoading(true);
            dispatch(verifyToken()).unwrap().then((res) => {
                showToast(`Welcome, ${res?.firstName}!`);
            }).finally(() => {
                setLogoScale(true);
                setTimeout(() => setLoading(false), 1000);
            })
        };
        if (!user && 
            (location.pathname !== "/" && 
            location.pathname !== "/auth/login" && 
            location.pathname !== "/auth/register" && 
            location.pathname !== "/auth/forgot-password" && 
            location.pathname !== "/auth/reset-password" &&
            !location.pathname.startsWith("/file/d/"))
        ) {
            authenticateUser();
        }
    }, []);

    if (loading) {
        return (
            <div className={`h-screen flex items-center justify-center p-1`}>
                <div
                    className={`font-medium [&_svg]:size-4 select-none flex items-center justify-center text-sm gap-1 transition-transform duration-1000 ${logoScale && "scale-150"}`}
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
