import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import VerifyToken from "./components/global/VerifyToken";
import Navbar from "./components/global/Navbar";
import Sidebar from "./components/global/Sidebar";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import FileDownload from "./pages/FileDownload";
import Drive from "./pages/Drive";
import Starred from "./pages/Starred";
import ProfileSettings from "./pages/ProfileSettings";
import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "./store/hooks";
import { ThemeProvider } from "./context/theme-provider";

function AppRoutes() {
    const location = useLocation();    
    const user = useAppSelector((state) => state.user.user);

    return <VerifyToken user={user} location={location}>
                <ThemeProvider defaultTheme="dark" storageKey="theme"> 
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            
                            <Route path="/" element={<Navbar />}>
                                {/* public routes */}
                                <Route index element={user ? <Navigate to="/drive" /> : <Home />} />
                                <Route path="/auth/login" element={user ? <Navigate to="/drive" /> : <Login />} />
                                <Route path="/auth/register" element={user ? <Navigate to="/drive" /> : <Register />} />
                                <Route path="/auth/forgot-password" element={user ? <Navigate to="/drive" /> : <ForgotPassword />}  />
                                <Route path="/auth/reset-password" element={user ? <Navigate to="/drive" /> : <ResetPassword />} />
                                <Route path="/file/d/:key" element={<FileDownload />} />

                                {/* private routes */}
                                <Route path="*" element={user ? <NoPage /> : <Navigate to="/auth/login" />} />
                                <Route element={user ? <Sidebar /> : <Navigate to="/auth/login" />}>
                                    <Route path="/drive" element={<Drive />} />
                                    <Route path="/starred" element={<Starred />} />
                                    <Route path="/profile/settings" element={<ProfileSettings />} />
                                </Route>
                            </Route>

                        </Routes>
                    </AnimatePresence>
                </ThemeProvider>
            </VerifyToken>
}

export default function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            }
        }
    })
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </QueryClientProvider>
    );
}
