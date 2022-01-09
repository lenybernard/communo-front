import React from 'react';
import {
    IconButton,
    Avatar,
    Box,
    Flex,
    HStack,
    VStack,
    useColorModeValue,
    Text,
    FlexProps,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Button, Link as CLink, Container,
} from '@chakra-ui/react';
import {Link} from "react-router-dom";
import {
    FiMenu,
    FiBell,
    FiChevronDown, FiPlus,
} from 'react-icons/fi';
import {ColorModeSwitcher} from "../../../ColorModeSwitcher";
import {Logo} from "../../atoms/Logo/Logo";
import {LinkItemProps} from "../../layout/LayoutProps";
import NavItem from "../../atoms/Menu/NavItem";
import {GoDiffAdded} from "react-icons/go";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../../auth/AuthStatus";

interface MobileProps extends FlexProps {
    onOpen: () => void;
    links: LinkItemProps[]
}

export const HeadBar = ({ onOpen, links, ...rest }: MobileProps) => {
    const {t} = useTranslation()
    const auth = useAuth()

    return (
        <Flex
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between' }}
            {...rest}>

            <Container maxW={"container.xl"}>

                <HStack spacing={{ base: '0', md: '6' }} justifyContent={'space-between'}>
                    <IconButton
                        mr={5}
                        display={{ base: 'flex', md: 'none' }}
                        onClick={onOpen}
                        variant="outline"
                        aria-label="open menu"
                        icon={<FiMenu />}
                    />
                    <CLink to={'/'} style={{ textDecoration: 'none' }} as={Link}>
                        <Logo height={"80px"} />
                    </CLink>
                    <Flex grow={1}>
                        {links.map((link) => (
                            <NavItem key={link.name} icon={link.icon} to={link.to} display={link.display}>
                                {link.name}
                            </NavItem>
                        ))}
                    </Flex>
                    <Flex alignItems={'center'}>
                        <Button
                            variant={'outline'}
                            colorScheme={'red'}
                            size={'sm'}
                            mr={4}
                            display={{base: 'none', sm: 'flex'}}
                            leftIcon={<FiPlus/>}
                        >
                            <Text>{t('layout.head.cta.label')}</Text>
                        </Button>
                        <Button display={{base: 'flex', sm: 'none'}}
                                variant={'ghost'}
                                colorScheme={'red'}>
                            <Box>
                                <GoDiffAdded size={20} />
                            </Box>
                        </Button>
                        <ColorModeSwitcher justifySelf="flex-end" display={{base: 'none', sm: 'flex'}}/>
                        <IconButton
                            size="lg"
                            variant="ghost"
                            aria-label="open menu"
                            display={{base: 'none', sm: 'flex'}}
                            icon={<FiBell />}
                        />
                        {(auth.user &&
                            <Flex alignItems={'center'}>
                                <Menu>
                                    <MenuButton
                                        py={2}
                                        transition="all 0.3s"
                                        _focus={{boxShadow: 'none'}}>
                                        <HStack>
                                            <Avatar
                                                size={'sm'}
                                                src={
                                                    'https://fr.gravatar.com/userimage/16874251/7a7c10a6f4a6aff3a8039666fc7f08e4.jpg?size=200'
                                                }
                                            />
                                            <VStack
                                                display={{base: 'none', md: 'flex'}}
                                                alignItems="flex-start"
                                                spacing="1px"
                                                ml="2">
                                                <Text
                                                    fontSize="sm">{auth.user.firstname + ' ' + auth.user.lastname}</Text>
                                                <Text fontSize="xs" color="gray.600">
                                                    Admin
                                                </Text>
                                            </VStack>
                                            <Box display={{base: 'none', md: 'flex'}}>
                                                <FiChevronDown/>
                                            </Box>
                                        </HStack>
                                    </MenuButton>
                                    <MenuList
                                        // bg={useColorModeValue('white', 'gray.900')}
                                        // borderColor={useColorModeValue('gray.200', 'gray.700')}
                                    >
                                        <MenuItem>
                                            <Link to={'/logout'}>{t('logout.title')}</Link>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                        ) || (
                            <Link to={'/login'}>Login</Link>
                        )}
                    </Flex>
                </HStack>
            </Container>
        </Flex>
    );
};