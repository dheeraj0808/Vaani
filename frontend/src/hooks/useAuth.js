import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { getCurrentUser } from '../services/authService';

const useAuth = () => {
    const { user, setUser } = useAuthContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await getCurrentUser();
                    setUser(userData);
                } catch (error) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, [setUser]);

    return { user, loading };
};

export default useAuth;
