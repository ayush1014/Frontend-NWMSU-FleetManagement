import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('userData');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error('Failed to retrieve user:', error);
            return null;
        }
    });

    const login = (userData) => {
        try {
            localStorage.setItem('userData', JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error('Failed to save user data:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('userData');
        setUser(null);
    };

    // Effect to log the current user state
    useEffect(() => {
        console.log('Current user:', user);
    }, [user]);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
