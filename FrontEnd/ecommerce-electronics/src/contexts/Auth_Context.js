import React from "react";
import { useContext, useState } from "react";
const Auth_Context = React.createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("");
    return (
        <Auth_Context.Provider value={{ token, setToken }}>
            {children}
        </Auth_Context.Provider>
    )
}
export const useAuthContext = () => {
    return useContext(Auth_Context);
}