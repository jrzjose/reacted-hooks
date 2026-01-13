import * as React from 'react';
import FirebaseAuth from "../handlers/Auth"

// 1. Define the shape of the Context
interface AuthContextType {
    currentUser: any | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    authenticate: () => Promise<void>;
}

const { signIn, signOut, getCurrentUser } = FirebaseAuth;

// 2. Initialize context with undefined (to catch usage outside Provider)
const Context = React.createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<React.ReactNode> = ({ children }:React.ReactNode) => {
    const [currentUser, setCurrentUser] = React.useState<any | null>(null);

    const login = React.useCallback(() => signIn().then(setCurrentUser), []);

    const logout = React.useCallback(() => signOut().then(() => setCurrentUser(null)), []);

    const authenticate = React.useCallback(() => getCurrentUser().then(setCurrentUser), []);
    
    const value = React.useMemo(() => ({
        login,
        logout,
        authenticate,
        currentUser
    }), [currentUser]); // login/logout/authenticate are stable references

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

// 3. Custom hook with type checking
export const useAuthContext = (): AuthContextType => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;