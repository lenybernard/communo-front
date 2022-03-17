import React from 'react'
import { useAuth } from '../../auth/AuthStatus'

export const Profile = () => {
    const auth = useAuth()

    return <div>Profile de {auth.user?.firstname}</div>
}
