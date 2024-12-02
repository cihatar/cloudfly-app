import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/global/Navbar";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { useEffect, useState } from "react";
import customAxios from "./config/axios";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const resp = await customAxios.post("/api/auth/verify-token");
                if (resp.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error: any) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        verifyToken();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route index />
                        <Route path="*" element={!isAuthenticated ? <Navigate to="/auth/login" /> : <NoPage />} />
                        <Route path="/auth/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                        <Route path="/auth/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
                        <Route
                            path="/auth/forgot-password"
                            element={isAuthenticated ? <Navigate to="/" /> : <ForgotPassword />}
                        />
                        <Route
                            path="/auth/reset-password"
                            element={isAuthenticated ? <Navigate to="/" /> : <ResetPassword />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
