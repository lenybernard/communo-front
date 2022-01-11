import React, {useEffect} from "react"
import {User} from "../types";
import {useCookies} from "react-cookie";

interface JWTAuthResponse {
    user: User
    token: string
    tokenExpiresAt: string
    refreshToken: string
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
    let [tokenExpiresAt, setTokenExpiresAt] = React.useState<any>(null);
    let [refreshToken, setRefreshToken] = React.useState<any>(null);
    const [cookies, setCookie, removeCookie] = useCookies();

    const cookieUser = cookies.user
    useEffect(() => {
        const _token = localStorage.getItem('token')
        const _refreshToken = localStorage.getItem('refreshToken')
        if (_token !== undefined) {
            setToken(_token)
        }
        if (_refreshToken !== undefined) {
            setRefreshToken(_refreshToken)
        }
        if (cookieUser !== undefined) {
            setUser(cookieUser)
        }
    }, [cookieUser])

    let signin = (response: JWTAuthResponse, callback: VoidFunction) => {
        setToken(response.token)
        setUser(response.user)
        setTokenExpiresAt(response.tokenExpiresAt)
        setRefreshToken(response.refreshToken)
        localStorage.setItem('token', response.token)
        localStorage.setItem('tokenExpiresAt', response.tokenExpiresAt)
        localStorage.setItem('refreshToken', response.refreshToken)
        setCookie('user', response.user)
        callback()
    };

    let signout = (callback: VoidFunction) => {
        setToken(null);
        setTokenExpiresAt(null);
        setRefreshToken(null);
        setUser(null);
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpiresAt')
        localStorage.removeItem('refreshToken')
        removeCookie('user')
        callback();
    };

    let value = { user, token, refreshToken, tokenExpiresAt, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthProvider