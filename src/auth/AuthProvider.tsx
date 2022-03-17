import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { User } from '../types'
import { useCookies } from 'react-cookie'

interface JWTAuthResponse {
    user: User
    token: string
    tokenExpiresAt: string
    refreshToken: string
}
interface AuthContextType {
    user: User | null
    token: string | null
    signin: (response: JWTAuthResponse, callback: VoidFunction) => void
    signout: (callback: VoidFunction) => void
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    signin: () => {},
    signout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [tokenExpiresAt, setTokenExpiresAt] = useState<string | null>(null)
    const [refreshToken, setRefreshToken] = useState<string | null>(null)
    const [cookies, setCookie, removeCookie] = useCookies()

    const cookieUser = cookies.user
    useEffect(() => {
        const tmpToken = localStorage.getItem('token')
        const tmpRefreshToken = localStorage.getItem('refreshToken')
        if (tmpToken !== undefined) {
            setToken(tmpToken)
        }
        if (tmpRefreshToken !== undefined) {
            setRefreshToken(tmpRefreshToken)
        }
        if (cookieUser !== undefined) {
            setUser(cookieUser)
        }
    }, [cookieUser])

    const signin = (response: JWTAuthResponse, callback: VoidFunction) => {
        setToken(response.token)
        setUser(response.user)
        setTokenExpiresAt(response.tokenExpiresAt)
        setRefreshToken(response.refreshToken)
        localStorage.setItem('token', response.token)
        localStorage.setItem('tokenExpiresAt', response.tokenExpiresAt)
        localStorage.setItem('refreshToken', response.refreshToken)
        setCookie('user', response.user)
        callback()
    }

    const signout = (callback: VoidFunction) => {
        setToken(null)
        setTokenExpiresAt(null)
        setRefreshToken(null)
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpiresAt')
        localStorage.removeItem('refreshToken')
        removeCookie('user')
        callback()
    }

    const value = { user, token, refreshToken, tokenExpiresAt, signin, signout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
