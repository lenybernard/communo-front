import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormErrorMessage,
    InputRightElement,
    InputGroup,
} from '@chakra-ui/react';
import {useTranslation} from "react-i18next";
import {SubmitHandler, useForm} from 'react-hook-form'
import {toast} from "react-toastify";
import React, {useState} from "react";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../../../auth/AuthStatus";

type FormData = {
    username: string;
    password: string;
};

export const LoginForm = ({title = null, subtitle = null}: {title?: string|null, subtitle?: string|null}) => {
    const { t } = useTranslation()
    const [showPassword, setShowPassword] = useState(false)
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>()

    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    const onSubmit = (values: FormData) =>
    {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values, null, 2)
        }
        fetch('http://localhost:8000/api/login', requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.message) {
                    throw new Error(response.message);
                }
                if (response.error) {
                    throw new Error(response.error);
                }
                toast(t('login.toast.success.' + Math.floor(Math.random() * 4), {'user': response.user}))
                auth.signin(response, () => {
                    // @ts-ignore
                    let from = location.state?.from?.pathname || "/";
                    navigate(from, { replace: true });
                });
            })
            .catch(error => {
                let errorMessage = t('login.toast.error.' + Math.floor(Math.random() * 5), {'error': error.toString().replace(/^Error: /, '')})
                setError('password', {type: "manual"})
                toast.error(errorMessage)
            });
    }

    return (
        <Flex
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>{title || t('login.title')}</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        {subtitle || t('login.subtitle')}️
                    </Text>
                </Stack>
                <Box
                    bg={useColorModeValue('white', 'gray.700')}
                    >
                    <Stack spacing={4}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormErrorMessage>
                                {errors.password && <p>Oups</p>}
                            </FormErrorMessage>
                            <FormControl id="email" isInvalid={errors.username !== null}>
                                <FormLabel>{t('login.form.email.label')}</FormLabel>
                                <Input type="email"
                                       placeholder={t('login.form.email.placeholder')}
                                       isRequired={true}
                                       {...register('username', {
                                           required: 'This is required',
                                           minLength: { value: 4, message: 'Minimum length should be 4' },
                                       })}
                                />
                            </FormControl>
                            <FormControl id="password" isInvalid={errors.password !== null}>
                                <FormLabel>{t('login.form.password.label')}</FormLabel>
                                <InputGroup size='md'>
                                    <Input type={showPassword ? 'text' : 'password'}
                                           isRequired={true}
                                           {...register('password', {
                                               required: 'This is required',
                                               minLength: { value: 4, message: 'Minimum length should be 4' },
                                           })}
                                    />
                                    <InputRightElement width='3.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Link color={'blue.400'}>{t('login.forgotPassword')}</Link>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    isLoading={isSubmitting}
                                    type='submit'>
                                    {t('login.form.button')}
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default LoginForm