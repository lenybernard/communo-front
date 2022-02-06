import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image, Button,
} from '@chakra-ui/react';
import { FaChevronRight } from "react-icons/fa";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import * as React from "react";

type MaterialCardProps = {
    id: string
    picture: string
    name: string
    model: string
    brand: string
}

export const MaterialCard = ({picture, name, model, brand, id}: MaterialCardProps) => {
    const { t } = useTranslation()

    return <Center py={12} key={`materialCard${id}`}>
        <Link to={`/materials/${id}`}>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white.100', 'gray.700')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
                _hover={{
                    transform: 'translateY(2px)',
                    boxShadow: 'lg',
                }}>
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    bg='white'
                >
                    <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'cover'}
                        src={picture}
                    />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        {brand}
                    </Text>
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {name} {model}
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                        <Button rounded={'full'}
                                px={6}
                                w={'full'}
                                mt={8}
                                colorScheme={useColorModeValue('red', 'yellow')}
                                textTransform={'uppercase'}
                                rightIcon={<FaChevronRight/>}>
                                {t('material.card.button.label')}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Link>
    </Center>
}

export default MaterialCard