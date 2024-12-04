import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/global/Navbar";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Cloudy, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { verifyToken } from "./store/user/userSlice";

function AppRoutes() {
    const [logoScale, setLogoScale] = useState(false);
    const [loading, setLoading] = useState(false);

    const location = useLocation();    

    // redux
    const { user } = useAppSelector((state) => ({
        ...state.user,
    }));
    const dispatch = useAppDispatch();

    useEffect(() => {
        const authenticateUser = async () => {
            setLoading(true);
            dispatch(verifyToken()).then(() => {
                setLogoScale(true);
                setTimeout(() => setLoading(false), 1000);
            });
        };
        if (!user && !location.pathname.includes("auth")) {
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
    }

    return <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Navbar />}>
                    <Route index />
                    <Route path="*" element={user ? <NoPage /> : <Navigate to="/auth/login" />} />
                    <Route path="/auth/login" element={user ? <Navigate to="/" /> : <Login />} />
                    <Route path="/auth/register" element={user ? <Navigate to="/" /> : <Register />} />
                    <Route
                        path="/auth/forgot-password"
                        element={user ? <Navigate to="/" /> : <ForgotPassword />}
                    />
                    <Route
                        path="/auth/reset-password"
                        element={user ? <Navigate to="/" /> : <ResetPassword />}
                    />
                </Route>
            </Routes>
        </AnimatePresence>
}

export default function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}
