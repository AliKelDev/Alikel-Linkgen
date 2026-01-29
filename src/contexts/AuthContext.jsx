import React, { createContext, useContext, useState, useEffect } from 'react';
import { authFunctions } from '../firebase';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = authFunctions.onAuthStateChange((user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signIn = async () => {
        try {
            const user = await authFunctions.signInWithGoogle();
            return user;
        } catch (error) {
            console.error('Sign in error:', error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await authFunctions.signOutUser();
        } catch (error) {
            console.error('Sign out error:', error);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        signIn,
        signOut,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
