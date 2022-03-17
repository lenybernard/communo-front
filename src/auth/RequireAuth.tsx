import React from 'react'
import { useAuth } from './AuthStatus'
import { useLocation, Navigate } from 'react-router-dom'

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth()
    const location = useLocation()

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}
