import {
    Box,
    useColorModeValue,
} from '@chakra-ui/react';
import * as React from "react";

export const Card:React.FC<{rounded?: string, borderRadius?: string, maxW?: string}> = (props) => {
    const {rounded, children, borderRadius, maxW} = props
    return <Box
            maxW={maxW}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={rounded || 'lg'}
            borderRadius={borderRadius}
            p={6}
            textAlign={'center'}>
            {children}
        </Box>
}
export default Card