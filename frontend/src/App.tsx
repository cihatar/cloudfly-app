import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import VerifyToken from "./components/global/VerifyToken";
import Navbar from "./components/global/Navbar";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProfileSettings from "./pages/ProfileSettings";
import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "./store/hooks";

function AppRoutes() {
    const location = useLocation();    
    const user = useAppSelector((state) => state.user.user);

    return <AnimatePresence mode="wait">
                <VerifyToken user={user} location={location}>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Navbar />}>
                            <Route index />
                            <Route path="*" element={user ? <NoPage /> : <Navigate to="/auth/login" />} />
                            <Route path="/auth/login" element={user ? <Navigate to="/drive" /> : <Login />} />
                            <Route path="/auth/register" element={user ? <Navigate to="/drive" /> : <Register />} />
                            <Route
                                path="/auth/forgot-password"
                                element={user ? <Navigate to="/drive" /> : <ForgotPassword />}
                            />
                            <Route
                                path="/auth/reset-password"
                                element={user ? <Navigate to="/drive" /> : <ResetPassword />}
                            />
                            <Route
                                path="/profile/settings"
                                element={user ? <ProfileSettings /> : <Navigate to="/auth/login" />}
                            />
                        </Route>
                    </Routes>
                </VerifyToken>
            </AnimatePresence>
}

export default function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}
