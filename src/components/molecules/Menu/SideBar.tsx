import React  from 'react';
import {
    Box,
    CloseButton,
    Flex,
    useColorModeValue,
    Drawer,
    DrawerContent,
    BoxProps,
} from '@chakra-ui/react';
import { LinkItemProps } from "../../layout/LayoutProps";
import {Logo} from "../../atoms/Logo/Logo";
import NavItem from "../../atoms/Menu/NavItem";

interface SideBarProps extends BoxProps {
    isOpen?: boolean|null;
    onClose: () => void;
    linkItems: LinkItemProps[]
}
export const SideBar = ({ isOpen, onClose, linkItems }: SideBarProps) =>
    <>
        <SidebarContent onClose={onClose}
                        linkItems={linkItems}
                        display={{ base: 'none' }} />
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
                <Logo height={"80px"} />
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {linkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} to={link.to} onClick={onClose}>
                    {link.name}
                </NavItem>
            ))}


        </Box>
    );
};


