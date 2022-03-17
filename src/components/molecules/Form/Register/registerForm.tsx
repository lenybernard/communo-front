import {
    Box,
    Stack,
    Input,
    Button,
    SimpleGrid,
    Avatar,
    FormErrorMessage,
    FormControl,
    FormLabel,
    InputGroup,
    InputRightElement,
    Center,
    AvatarBadge,
    IconButton,
    FormHelperText,
    Tooltip,
} from '@chakra-ui/react'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaInfo, FaRegEye, FaRegEyeSlash, FaTrashAlt } from 'react-icons/fa'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CountryForm } from '../../../atoms/Form/CountryForm'
import { GenderForm } from '../../../atoms/Form/GenderForm'
import 'react-phone-number-input/style.css'
import { RequiredAsterisk } from '../../../atoms/Form/RequiredAsterisk'
import { PhoneNumberInput } from '../../../atoms/Form/PhoneNumberInput'

// interface FormData {
//     avatar: string
//     firstname: string
//     lastname: string
//     email: string
//     password: string
//     phoneNumberObject: {
//         countryCode: number
//         nationalNumber: string
//     }
//     city: string
//     country: string
//     gender: 'male' | 'female' | null
// }

const RegisterForm = () => {
    const { t } = useTranslation()
    const [showPassword, setShowPassword] = useState(false)
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FieldValues>()

    const navigate = useNavigate()

    const onSubmit = (values: FieldValues) => {
        // JSON.stringify(values, null, 2)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values, null, 2),
        }
        fetch('http://localhost:8000/api/users', requestOptions)
            .then((response) => response.json())
            .then((response) => {
                if (response.message) {
                    throw new Error(response.message)
                }
                if (response.error) {
                    throw new Error(response.error)
                }
                console.log(values)
                console.log(response)
                toast(
                    t('login.toast.success.' + Math.floor(Math.random() * 4), {
                        user: response.user,
                    })
                )
                navigate('/register/confirm', { replace: true })
            })
            .catch((error) => {
                const errorMessage = t(
                    'login.toast.error.' + Math.floor(Math.random() * 5),
                    { error: error.toString().replace(/^Error: /, '') }
                )
                toast.error(errorMessage)
            })
    }
    const defaultCountry = 'FR'

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormErrorMessage>
                {errors.password && <p>Oups</p>}
            </FormErrorMessage>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacingX={10} spacingY={3}>
                <Box>
                    <FormControl id="userName">
                        <Stack direction={['column', 'row']} spacing={6}>
                            <Center>
                                <Avatar size="xl">
                                    <AvatarBadge
                                        as={IconButton}
                                        size="sm"
                                        rounded="full"
                                        top="-10px"
                                        colorScheme={'red'}
                                        color={'white'}
                                        aria-label="remove Image"
                                        icon={<FaTrashAlt />}
                                    />
                                </Avatar>
                            </Center>
                            <Center w="full">
                                <FormLabel>
                                    {t('register.form.avatar.browse')}
                                    <Input type={'file'} w="full" />
                                </FormLabel>
                            </Center>
                        </Stack>
                    </FormControl>
                </Box>
                <Box alignSelf={'end'}>
                    <FormControl
                        id="email"
                        isInvalid={errors.email !== undefined}
                    >
                        <FormLabel>
                            {t('register.form.email.label')}{' '}
                            <RequiredAsterisk />
                        </FormLabel>
                        <Input
                            type="email"
                            placeholder={t('register.form.email.placeholder')}
                            isRequired={true}
                            {...register('email', {
                                required: 'This is required',
                                minLength: {
                                    value: 4,
                                    message: 'Minimum length should be 4',
                                },
                                pattern: /^\S+@\S+$/i,
                            })}
                        />
                        {errors.email !== undefined && (
                            <FormErrorMessage>
                                {errors.email.message}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                </Box>
                <Box>
                    <FormControl
                        id="firstname"
                        isInvalid={errors.firstname !== undefined}
                    >
                        <FormLabel>
                            {t('register.form.firstname.label')}{' '}
                            <RequiredAsterisk />
                        </FormLabel>
                        <Input
                            type="text"
                            placeholder={t(
                                'register.form.firstname.placeholder'
                            )}
                            isRequired={true}
                            {...register('firstname', {
                                required: 'This is required',
                            })}
                        />
                        {errors.firstname !== undefined && (
                            <FormErrorMessage>
                                {errors.firstname.message}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                </Box>
                <Box>
                    <FormControl
                        id="lastname"
                        isInvalid={errors.lastname !== undefined}
                    >
                        <FormLabel>
                            {t('register.form.lastname.label')}{' '}
                            <RequiredAsterisk />
                        </FormLabel>
                        <Input
                            type="text"
                            placeholder={t(
                                'register.form.lastname.placeholder'
                            )}
                            isRequired={true}
                            {...register('lastname', {
                                required: 'This is required',
                            })}
                        />
                        {errors.lastname !== undefined && (
                            <FormErrorMessage>
                                {errors.lastname.message}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                </Box>
                <Box>
                    <FormControl
                        id="password"
                        isInvalid={errors.password !== undefined}
                    >
                        <FormLabel>
                            {t('register.form.password.label')}{' '}
                            <RequiredAsterisk />
                        </FormLabel>
                        <InputGroup size="md">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                isRequired={true}
                                autoComplete="off"
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
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <FaRegEyeSlash />
                                    ) : (
                                        <FaRegEye />
                                    )}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </Box>
                <Box>
                    <PhoneNumberInput
                        name={'phoneNumberObject'}
                        register={register}
                        isRequired={false}
                        errors={errors.phoneNumberObject}
                    />
                </Box>
            </SimpleGrid>
            <SimpleGrid
                columns={{ base: 1, sm: 3 }}
                mt={3}
                spacingX={10}
                spacingY={3}
            >
                <Box>
                    <FormControl
                        id="city"
                        isInvalid={errors.city !== undefined}
                    >
                        <FormLabel>
                            {t('register.form.city.label')} <RequiredAsterisk />
                        </FormLabel>
                        <Input
                            type="text"
                            placeholder={t('register.form.city.placeholder')}
                            isRequired={true}
                            {...register('city', {
                                required: 'This is required',
                            })}
                        />
                        {errors.city !== undefined && (
                            <FormErrorMessage>
                                {errors.city.message}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                </Box>
                <Box>
                    <FormControl
                        id="country"
                        isInvalid={errors.country !== undefined}
                    >
                        <FormLabel>
                            {t('register.form.country.label')}{' '}
                            <RequiredAsterisk />
                        </FormLabel>
                        <CountryForm
                            register={register('country', {
                                required: 'This is required',
                                value: defaultCountry,
                            })}
                        />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl
                        id="gender"
                        isInvalid={errors.gender !== undefined}
                    >
                        <FormLabel>{t('register.form.gender.label')}</FormLabel>
                        <GenderForm
                            isRequired={false}
                            register={register('gender')}
                        />
                        <FormHelperText>
                            <Tooltip
                                hasArrow
                                label={t('register.form.gender.help')}
                            >
                                <Button
                                    variant={'link'}
                                    size={'sm'}
                                    leftIcon={<FaInfo />}
                                >
                                    {t('register.form.gender.why')}
                                </Button>
                            </Tooltip>
                        </FormHelperText>
                    </FormControl>
                </Box>
            </SimpleGrid>
            <Stack spacing={10}>
                <Button
                    fontFamily={'heading'}
                    mt={8}
                    w={'full'}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    color={'white'}
                    isLoading={isSubmitting}
                    _hover={{
                        bgGradient: 'linear(to-r, red.400,pink.400)',
                        boxShadow: 'xl',
                    }}
                    type="submit"
                >
                    {t('register.form.button')}
                </Button>
            </Stack>
        </form>
    )
}

export default RegisterForm
