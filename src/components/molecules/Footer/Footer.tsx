import {
    Box,
    chakra,
    Container,
    Link as CLink,
    Stack,
    Text,
    VisuallyHidden,
    Input,
    IconButton,
    useColorModeValue, Circle, Flex,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import {FaInstagram, FaSymfony, FaTwitter, FaYoutube} from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import {Logo} from "../../atoms/Logo/Logo";
import {useTranslation} from "react-i18next";
import { SiChakraui, SiGraphql, SiPostgresql, SiStrapi} from "react-icons/si";
import { GiHangingSpider } from "react-icons/gi";
import { GrGithub, GrReactjs } from "react-icons/gr";
import { VscGithub } from "react-icons/vsc";

const SocialButton = ({ children, label, href }: {children: ReactNode; label: string; href: string;}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

export const Footer = () => {
    const {t, i18n} = useTranslation()
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container as={Stack} maxW={'6xl'} py={10}>
                <Flex spacing={8} justifyContent={'space-between'}>
                    <Stack spacing={6}>
                        <Box>
                            <Logo height={100} width={220} />
                        </Box>
                        <Box w={['auto', 'auto', '300px']} my="5" fontStyle="italic">
                            <CLink isExternal={true} href="https://github.com/communo">
                                <GrGithub style={{display: 'inline', marginRight: 2}} />{t('layout.footer.license')}
                            </CLink>{' '}
                            {t('layout.footer.librariesCredit.1')}{', '}
                            <CLink isExternal={true} href="https://fr.reactjs.org">
                                <GrReactjs style={{display: 'inline', marginRight: 2}} />
                                React
                            </CLink>{', '}
                            <CLink isExternal={true} href="https://strapi.io">
                                <SiStrapi style={{display: 'inline', marginRight: 2}} />
                                Strapi
                            </CLink>{', '}
                            <CLink isExternal={true} href="https://chakra-ui.com">
                                <SiChakraui style={{display: 'inline', marginRight: 2}} />
                                CharkaUI
                            </CLink>{', '}
                            <CLink isExternal={true} href="https://symfony.com">
                                <FaSymfony style={{display: 'inline', marginRight: 2}} />
                                Symfony
                            </CLink>{', '}
                            <CLink isExternal={true} href="https://api-platform.com">
                                <GiHangingSpider style={{display: 'inline', marginRight: 2}} />
                                Api-Plaform
                            </CLink>{', '}
                            <CLink isExternal={true} href="https://graphql.org">
                                <SiGraphql style={{display: 'inline', marginRight: 2}} />
                                GraphQL
                            </CLink>{', '}
                            <CLink isExternal={true} href="https://www.postgresql.org">
                                <SiPostgresql style={{display: 'inline', marginRight: 2}} />
                                Postgres
                            </CLink>
                            {t('layout.footer.librariesCredit.2')}
                        </Box>
                        <Stack direction={'row'} spacing={6}>

                            <CLink href={'/?lng=' + (i18n.language === 'fr' ? 'en' : 'fr')} title={t('switch.language')}>
                                <Circle size='32px' bg='gray.200' color='blackAlpha-100'>
                                    {(i18n.language === 'fr' && 'en') || 'fr'}
                                </Circle>
                            </CLink>
                            <SocialButton label={'Github'} href="https://github.com/communo">
                                <VscGithub />
                            </SocialButton>
                            <SocialButton label={'Twitter'} href={'#'}>
                                <FaTwitter />
                            </SocialButton>
                            <SocialButton label={'YouTube'} href={'#'}>
                                <FaYoutube />
                            </SocialButton>
                            <SocialButton label={'Instagram'} href={'#'}>
                                <FaInstagram />
                            </SocialButton>
                        </Stack>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader>{t('layout.footer.newsletter.title')}</ListHeader>
                        <Stack direction={'row'}>
                            <Input
                                placeholder={t('layout.footer.newsletter.placeholder')}
                                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                                border={0}
                                _focus={{
                                    bg: 'whiteAlpha.300',
                                }}
                            />
                            <IconButton
                                bg={useColorModeValue('green.400', 'green.800')}
                                color={useColorModeValue('white', 'gray.800')}
                                _hover={{
                                    bg: 'green.600',
                                }}
                                title={t('layout.footer.newsletter.subscribe')}
                                aria-label={t('layout.footer.newsletter.subscribe')}
                                icon={<BiMailSend />}
                            />
                        </Stack>
                    </Stack>
                </Flex>
            </Container>
        </Box>
    );
}

export default Footer