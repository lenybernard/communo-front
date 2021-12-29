import React  from 'react';
import {
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Link as CLink,
    Drawer,
    DrawerContent,
    BoxProps,
    FlexProps,
} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { LinkItemProps } from "../../layout/LayoutProps";
import {Logo} from "../../atoms/Logo";
import {useTranslation} from "react-i18next";
import {FaLanguage} from "react-icons/all";
import {TFunctionResult} from "i18next";

interface SideBarProps extends BoxProps {
    isOpen?: boolean|null;
    onClose: () => void;
    linkItems: LinkItemProps[]
}
export const SideBar = ({ isOpen, onClose, linkItems }: SideBarProps) =>
    <>
        <SidebarContent onClose={onClose}
                        linkItems={linkItems}
                        display={{ base: 'none', md: 'block' }} />
        <Drawer
            autoFocus={false}
            isOpen={isOpen ?? false}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full">
            <DrawerContent>
                <SidebarContent onClose={onClose} linkItems={linkItems} />
            </DrawerContent>
        </Drawer>
    </>


const SidebarContent = ({ onClose, linkItems, ...rest }: SideBarProps) => {
    const { t, i18n } = useTranslation()
    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Logo height={300} width={300} />
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {linkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} to={link.to}>
                    {link.name}
                </NavItem>
            ))}

            {i18n.language === 'fr' &&
                <NavItem key={'switch-lang-en'} icon={FaLanguage} to={'/?lng=en'}>
                    {t('switch.language')}
                </NavItem>
                ||
                <NavItem key={'switch-lang-fr'} icon={FaLanguage} to={'/?lng=fr'}>
                    {t('switch.language')}
                </NavItem>
            }
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType
    to: string
    children: ReactText|TFunctionResult
}
const NavItem = ({ icon, to, children, ...rest }: NavItemProps) => {
    return (
        <CLink to={to} style={{ textDecoration: 'none' }} as={Link}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'yellow.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </CLink>
    );
};
