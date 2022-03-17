import * as React from 'react'
import { useColorModeValue, Button as CButton } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ReactElement } from 'react'

export const Button = ({
    link,
    label,
    icon,
    width,
}: {
    link: string
    label: string
    icon: ReactElement
    width: 'auto' | 'full'
}) => {
    return (
        <CButton
            rounded={'none'}
            w={width}
            mt={8}
            size={'lg'}
            py={'7'}
            color={useColorModeValue('white', 'gray.900')}
            bg={useColorModeValue('gray.900', 'white')}
            textTransform={'uppercase'}
            _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
            }}
            rightIcon={icon}
        >
            <Link to={link}>{label}</Link>
        </CButton>
    )
}
