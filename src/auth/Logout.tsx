import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthStatus'

export const Logout = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const auth = useAuth()
    useEffect(() => {
        auth.signout(() => {
            navigate('/', { replace: true })
            toast(t('logout.toast'))
        })
    })

    return <div />
}
