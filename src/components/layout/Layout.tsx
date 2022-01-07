import React from 'react';
import {Box, useColorModeValue, useDisclosure, useColorMode, theme, ChakraProvider} from '@chakra-ui/react';
import {HeadBar} from "../molecules/Menu/HeadBar";
import {LinkItemProps} from "./LayoutProps";
import {FiHome} from "react-icons/fi";
import {FaHammer} from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import {ToastContainer} from "react-toastify";
import Footer from "../molecules/Footer/Footer";
import {SideBar} from "../molecules/Menu/SideBar";
import {
    Outlet
} from "react-router-dom";

export const Layout:React.FC = ({ children }) => {
    const { t } = useTranslation()
    let MainMenu: Array<LinkItemProps> = [
        { name: t('menu.home'), icon: FiHome, to:'/', display: { base: 'none', lg: 'flex' } },
        { name: t('menu.material'), icon: FaHammer, to: '/materials', display: { base: 'none', md: 'flex' } },
    ];
    const { onOpen, onClose, isOpen } = useDisclosure();
    const {colorMode} = useColorMode()

    return (
        <ChakraProvider theme={theme}>
            <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
                <HeadBar onOpen={onOpen} links={MainMenu} />
                <SideBar onClose={onClose} linkItems={MainMenu} isOpen={isOpen} />
                <Box p="4">
                    <Outlet />
                </Box>
                <ToastContainer theme={colorMode} draggablePercent={60} role="alert"/>
                <Footer/>
            </Box>
        </ChakraProvider>
    );
}

export default Layout