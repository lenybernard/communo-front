import React, {useEffect} from "react"
import {User} from "../types";
import {useCookies} from "react-cookie";

interface JWTAuthResponse {
    user: User
    token: string
}
interface AuthContextType {
    user: User
    token: string
    signin: (response: JWTAuthResponse, callback: VoidFunction) => void
    signout: (callback: VoidFunction) => void
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    let [user, setUser] = React.useState<any>(null);
    let [token, setToken] = React.useState<any>(null);
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        if (cookies.token !== undefined) {
            setToken(localStorage.getItem('token'))
        }
        if (cookies.user !== undefined) {
            setUser(cookies.user)
        }
    }, [])

    let signin = (response: JWTAuthResponse, callback: VoidFunction) => {
        setUser(response.user)
        setToken(response.token)
        localStorage.setItem('token', response.token)
        setCookie('user', response.user)
        callback()
    };

    let signout = (callback: VoidFunction) => {
        setToken(null);
        setUser(null);
        removeCookie('token')
        removeCookie('user')
        callback();
    };

    let value = { user, token, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthProvider