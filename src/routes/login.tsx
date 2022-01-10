import React from "react"
import {Box, Flex, useColorModeValue} from "@chakra-ui/react";
import LoginForm from "../components/molecules/Form/Login/login";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";

const Login = () => {
    const {t} = useTranslation()

    return <>
        <Helmet>
            <title>{t('login.authentication.needed.title')} {'< Communo'}</title>
        </Helmet>
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}>
                <LoginForm title={t('login.authentication.needed.title')} subtitle={t('login.authentication.needed.subtitle')}/>
            </Box>
        </Flex>
    </>;
}

export default Login