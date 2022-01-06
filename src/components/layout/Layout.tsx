import React from 'react';
import {Box, useColorModeValue, useDisclosure, useColorMode} from '@chakra-ui/react';
import {HeadBar} from "../molecules/Menu/HeadBar";
import {SideBar} from "../molecules/Menu/SideBar";
import {LinkItemProps} from "./LayoutProps";
import {FiHome} from "react-icons/fi";
import {FaHammer, FaHandsHelping} from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import {ToastContainer} from "react-toastify";

export const Layout:React.FC = ({ children }) => {
    const { t } = useTranslation()
    const LinkItems: Array<LinkItemProps> = [
        { name: t('menu.home'), icon: FiHome, to:'/' },
        { name: t('menu.material'), icon: FaHammer, to: '/materials' },
        { name: t('menu.service'), icon: FaHandsHelping, to: '#' },
    ];
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {colorMode} = useColorMode()
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SideBar isOpen={isOpen} onClose={onClose} linkItems={LinkItems} />
            {/* mobilenav */}
            <HeadBar onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
            <ToastContainer theme={colorMode} draggablePercent={60} role="alert"/>
        </Box>
    );
}

export default Layout