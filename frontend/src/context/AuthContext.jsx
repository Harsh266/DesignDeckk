import { createContext, useState, useEffect } from "react";
import axiosInstance from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const res = await axiosInstance.get("/auth/me");
            setUser(res.data);
        } catch (error) {
            console.error("Auth check failed:", error);
            setUser(null);
            // Try to refresh token if auth check fails
            try {
                await axiosInstance.post('/auth/refresh-token');
                // If refresh successful, try auth check again
                const retryRes = await axiosInstance.get("/auth/me");
                setUser(retryRes.data);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    };

    // Set up periodic token refresh
    useEffect(() => {
        const REFRESH_INTERVAL = 20 * 60 * 1000; // Refresh every 20 minutes

        const refreshToken = async () => {
            try {
                await axiosInstance.post('/auth/refresh-token');
            } catch (error) {
                console.error('Token refresh failed:', error);
            }
        };

        const intervalId = setInterval(refreshToken, REFRESH_INTERVAL);

        return () => clearInterval(intervalId);
    }, []);

    // Initial auth check
    useEffect(() => {
        checkAuth();
    }, []);

    const value = {
        user,
        setUser,
        loading,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
