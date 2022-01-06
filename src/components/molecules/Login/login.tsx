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
import { useForm } from 'react-hook-form'
import {toast} from "react-toastify";
import {useState} from "react";
import {FaRegEye, FaRegEyeSlash} from "react-icons/all";

export const Login = () => {
    const { t } = useTranslation()
    const [showPassword, setShowPassword] = useState(false)
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = (values: {email: string, password: string}) =>
    {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values, null, 2)
        }
        fetch('http://localhost:8000/api/login', requestOptions)
            .then(response => response.json())
            .then(response => {
                toast(t('login.toast.success.' + Math.floor(Math.random() * 4), {'firstname': response.user.firstname}))
                console.log({ status: 'loaded', payload: response.user.firstname })
            })
            .catch(error => {
                let errorMessage = t('login.toast.error.' + Math.floor(Math.random() * 5))
                setError('password', {type: "manual"})
                toast.error(errorMessage)
            });

            /** @todo need to handle login success */
    }

    return (
        <Flex
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>{t('login.title')}</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        {t('login.subtitle')}️
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
                            <FormControl id="email" isInvalid={errors.email}>
                                <FormLabel>{t('login.form.email.label')}</FormLabel>
                                <Input type="email"
                                       placeholder={t('login.form.email.placeholder')}
                                       isRequired={true}
                                       {...register('email', {
                                           required: 'This is required',
                                           minLength: { value: 4, message: 'Minimum length should be 4' },
                                       })}
                                />
                            </FormControl>
                            <FormControl id="password" isInvalid={errors.password}>
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

export default Login