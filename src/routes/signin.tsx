import React from "react"
import {
    Avatar,
    AvatarGroup, Box,
    Button, Container,
    Flex,
    Heading,
    Stack,
    Text,
    useBreakpointValue, useColorModeValue,
} from "@chakra-ui/react";
import LoginForm from "../components/molecules/Form/Login/loginForm";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";
import RegisterForm from "../components/molecules/Form/Register/registerForm";
import {Link} from "react-router-dom";
import Blur from "../components/layout/Blur";

const avatars = [
    {
        name: 'Ryan Florence',
        url: 'https://bit.ly/ryan-florence',
    },
    {
        name: 'Segun Adebayo',
        url: 'https://bit.ly/sage-adebayo',
    },
    {
        name: 'Kent Dodds',
        url: 'https://bit.ly/kent-c-dodds',
    },
    {
        name: 'Prosper Otemuyiwa',
        url: 'https://bit.ly/prosper-baba',
    },
    {
        name: 'Christian Nwamba',
        url: 'https://bit.ly/code-beast',
    },
];

const Signin = ({mode}: {mode: 'login'|'register'}) => {
    const {t} = useTranslation()

    return <>
        <Helmet>
            <title>{t('login.authentication.needed.title')} {'< Communo'}</title>
        </Helmet>
        <Box position={'relative'}>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Blur
                position={'absolute'}
                bottom={-10}
                left={-10}
                style={{ filter: 'blur(70px)' }}
            />
            <Container maxW={'7xl'}>
                <Flex
                    flexDirection={{ base: 'column', lg: 'row' }}
                    maxW={'7xl'}
                    py={{ base: 10, sm: 20, lg: 32 }}>
                    <Stack spacing={{ base: 10, md: 20 }}>
                        <Heading
                            lineHeight={1.1}
                            fontSize={{ base: '3xl', sm: '4xl', md: mode === 'login' ? '5xl' : '3xl', lg: mode === 'login' ? '6xl' : '4xl' }}>
                            {t('signin.hero.title.part1')}{' '}
                            <Text
                                as={'span'}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                bgClip="text">
                                {t('signin.hero.title.part2')}
                            </Text>{' '}
                            {t('signin.hero.title.part3')}
                        </Heading>
                        <Stack direction={'row'} spacing={4} align={'center'}>
                            <AvatarGroup>
                                {avatars.map((avatar) => (
                                    <Avatar
                                        key={avatar.name}
                                        name={avatar.name}
                                        src={avatar.url}
                                        size={'md'}
                                        position={'relative'}
                                        zIndex={2}
                                        _before={{
                                            content: '""',
                                            width: 'full',
                                            height: 'full',
                                            rounded: 'full',
                                            transform: 'scale(1.125)',
                                            bgGradient: 'linear(to-bl, red.400,pink.400)',
                                            position: 'absolute',
                                            zIndex: -1,
                                            top: 0,
                                            left: 0,
                                        }}
                                    />
                                ))}
                            </AvatarGroup>
                            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
                                +
                            </Text>
                            <Flex
                                align={'center'}
                                justify={'center'}
                                fontFamily={'heading'}
                                fontSize={{ base: 'sm', md: 'lg' }}
                                bg={'gray.800'}
                                color={'white'}
                                rounded={'full'}
                                width={useBreakpointValue({ base: '44px', md: '60px' })}
                                height={useBreakpointValue({ base: '44px', md: '60px' })}
                                position={'relative'}
                                casing={'uppercase'}
                                _before={{
                                    content: '""',
                                    width: 'full',
                                    height: 'full',
                                    rounded: 'full',
                                    transform: 'scale(1.125)',
                                    bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                                    position: 'absolute',
                                    zIndex: -1,
                                    top: 0,
                                    left: 0,
                                }}>
                                {t('register.you')}
                            </Flex>
                        </Stack>
                    </Stack>
                    <Stack
                        bg={useColorModeValue('white', 'gray.600')}
                        rounded={'xl'}
                        p={{ base: 4, sm: 6, md: 8 }}
                        mt={{base: 4, sm: 6, md: 0}}
                        spacing={{ base: 8 }}
                    >
                        <Stack spacing={4}>
                            <Heading
                                color={useColorModeValue('gray.600', 'white')}
                                lineHeight={1.1}
                                fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}>
                                {t('signin.title')}
                                <Text
                                    as={'span'}
                                    bgGradient="linear(to-r, yellow.200,yellow.400)"
                                    bgClip="text">
                                    {' '}!
                                </Text>
                            </Heading>
                            <Text color={useColorModeValue('gray.600', 'gray.200')} fontSize={{ base: 'sm', sm: 'md' }}>
                                {t('signin.subtitle')}{' '}
                                <Text
                                    as={'span'}
                                    bgGradient="linear(to-r, red.400,pink.400)"
                                    bgClip="text">
                                    {t('signin.emphaseWord')}
                                </Text>
                            </Text>
                        </Stack>
                        {
                            mode === 'login' ? (
                                <>
                                    <LoginForm/>
                                    <Link to={'/register'}>
                                        <Button variant={'ghost'} w={'full'}>{t('login.form.register')}</Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <RegisterForm />
                                    <Link to={'/login'}>
                                        <Button variant={'ghost'} w={'full'}>{t('register.form.login')}</Button>
                                    </Link>
                                </>
                            )
                        }
                    </Stack>
                </Flex>
            </Container>
        </Box>
    </>;
}

export default Signin