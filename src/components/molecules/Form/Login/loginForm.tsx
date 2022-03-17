import {
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    FormErrorMessage,
    InputRightElement,
    InputGroup,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../auth/AuthStatus'

type FormData = {
    username: string
    password: string
}

interface LocationState {
    from: {
        pathname: string
    }
}

export const LoginForm = () => {
    const { t } = useTranslation()
    const [showPassword, setShowPassword] = useState(false)
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>()

    const navigate = useNavigate()
    const location = useLocation()
    const auth = useAuth()

    const onSubmit = (values: FormData) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values, null, 2),
        }
        fetch('http://localhost:8000/api/login', requestOptions)
            .then((response) => response.json())
            .then((response) => {
                if (response.message) {
                    throw new Error(response.message)
                }
                if (response.error) {
                    throw new Error(response.error)
                }
                toast(
                    t('login.toast.success.' + Math.floor(Math.random() * 4), {
                        user: response.user,
                    })
                )
                auth.signin(response, () => {
                    const from =
                        (location.state as LocationState).from.pathname || '/'
                    navigate(from, { replace: true })
                })
            })
            .catch((error) => {
                const errorMessage = t(
                    'login.toast.error.' + Math.floor(Math.random() * 5),
                    { error: error.toString().replace(/^Error: /, '') }
                )
                setError('password', { type: 'manual' })
                toast.error(errorMessage)
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormErrorMessage>
                {errors.password && <p>Oups</p>}
            </FormErrorMessage>
            <FormControl id="email" isInvalid={errors.username !== undefined}>
                <FormLabel>{t('login.form.email.label')}</FormLabel>
                <Input
                    type="email"
                    placeholder={t('login.form.email.placeholder')}
                    isRequired={true}
                    {...register('username', {
                        required: 'This is required',
                        minLength: {
                            value: 4,
                            message: t('form.errors.tooShort', { count: 4 }),
                        },
                        pattern: /^\S+@\S+$/i,
                    })}
                />
            </FormControl>
            <FormControl
                id="password"
                isInvalid={errors.password !== undefined}
            >
                <FormLabel>{t('login.form.password.label')}</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        isRequired={true}
                        {...register('password', {
                            required: 'This is required',
                            minLength: {
                                value: 4,
                                message: 'Minimum length should be 4',
                            },
                        })}
                    />
                    <InputRightElement width="3.5rem">
                        <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Stack spacing={10}>
                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                >
                    <Link color={'blue.400'}>{t('login.forgotPassword')}</Link>
                </Stack>
                <Button
                    bg={'blue.400'}
                    color={'white'}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    _hover={{
                        bgGradient: 'linear(to-r, red.400,pink.400)',
                        boxShadow: 'xl',
                    }}
                    isLoading={isSubmitting}
                    type="submit"
                >
                    {t('login.form.button')}
                </Button>
            </Stack>
        </form>
    )
}

export default LoginForm
