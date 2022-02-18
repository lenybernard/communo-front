import * as React from "react"
import {
    Box,
    VStack,
    Image,
    Text,
    Heading,
    Stack,
    SimpleGrid,
    Container,
    List,
    ListItem,
    StackDivider,
    Flex,
    Spinner,
    GridItem,
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure,
} from "@chakra-ui/react"
import {
    useQuery,
} from "@apollo/client"
import { useParams } from "react-router-dom"
import {useTranslation} from "react-i18next"
import {Material, MaterialBooking} from "../../types"
import {findMaterialById} from "../../repositories/Material/MaterialRepository"
import {Helmet} from "react-helmet"
import Lottie from "react-lottie"
import animationData from './../../lotties/fist-checks.json'
import ReactMarkdown from "react-markdown"
import UserCard from "../../components/molecules/Cards/UserCard"
import {useEffect, useState} from "react"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import AvailabilityPlanning from "../../components/molecules/Form/Material/Booking/AvailabilityPlanning"
import remarkGfm from "remark-gfm";
import BookingContext from "../../contexts/BookingContext";
import BookingSummary from "../../components/molecules/Form/Material/Booking/BookingSummary";


export const MaterialShow = () => {
    const { t } = useTranslation()
    const [ step, setStep ] = useState<'initial'|'choosePeriod'|'validated'>('initial')
    const [booking, setBooking] = useState<MaterialBooking|null>()
    let params = useParams();
    const {loading, error, data} = useQuery(findMaterialById, {
        variables: {
            id: '/api/materials/' + params.id
        }
    });
    let material: Material|null = null
    if (!loading) {
        material = data.material
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        if (booking && booking.status === 'validated') {
            onOpen()
        }
    }, [booking])

    return (error && <p>Error </p>) || (loading && <Spinner/>) || (material &&
        <BookingContext.Provider value={{booking, setBooking}}>
            <Helmet>
                <title>{material.name} {material.brand} {material.model} { t('meta.title.suffix') }</title>
            </Helmet>
            <Container maxW={'7xl'} minW={'300px'}>
                <SimpleGrid
                    columns={(step === 'initial' || step === 'validated') ? { base: 1, lg: 5 } : { base: 1, lg: 6 }}
                    spacing={{ base: 8, md: 10 }}
                    pt={{ base: 9, md: 15 }}
                    pb={{ base: 15, md: 20 }}
                    gap={8}
                >
                    <GridItem rowSpan={{base: 1, lg: 2}} colSpan={(step === 'initial' || step === 'validated') ? {base: 1, lg: 3} : {base: 1, lg: 2 }} display={step === 'choosePeriod' ? { base: 'none', lg: 'grid' } : 'inherit'}>
                        <Flex>
                        <Zoom wrapStyle={{width: '100%'}}>
                            <Image
                                rounded={'md'}
                                alt={'product image'}
                                src={
                                    'http://127.0.0.1:8000/images/materials/' + material.images.edges[0].node?.imageName
                                }
                                bg={'white'}
                                fit={'cover'}
                                align={'center'}
                                w={'100%'}
                                h={{ base: '100%', sm: '400px', lg: '500px' }}
                            />
                        </Zoom>
                        {step === 'choosePeriod' && <UserCard user={material.owner} step={step}/>}
                    </Flex>
                    </GridItem>
                    <GridItem rowSpan={2} colSpan={(step === 'initial' || step === 'validated') ? 2 : 4}>
                        {step === 'choosePeriod' && <Flex height={'100%'}><AvailabilityPlanning material={material} onBack={() => setStep('initial')} setStep={setStep} /></Flex>}
                        {(step === 'initial' || step === 'validated') && <VStack>
                            <UserCard user={material.owner} step={step}/>
                            <Box width={'100%'}>
                                <Button
                                    flex={1}
                                    isFullWidth={true}
                                    fontSize={'sm'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    onClick={() => setStep('choosePeriod')}
                                    boxShadow={
                                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                    }
                                    _focus={{
                                        bg: 'blue.500',
                                    }}
                                    _hover={{
                                        bg: 'blue.500',
                                        transform: 'translateY(2px)',
                                        boxShadow: 'lg',
                                    }}>
                                    {t('material.show.button.label', {user: material.owner})}
                                </Button>
                            </Box>
                        </VStack>
                        }
                    </GridItem>
                </SimpleGrid>

                <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent pb={5}>
                        <ModalHeader>{t('material.show.booking.validate.success.title')}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Lottie
                                options={{
                                    loop: false,
                                    autoplay: true,
                                    animationData: animationData,
                                    rendererSettings: {
                                        preserveAspectRatio: "xMidYMid slice"
                                    }
                                }}
                                isClickToPauseDisabled={true}
                                height={400}
                                width={400}
                                speed={2.5}
                            />
                            <div dangerouslySetInnerHTML={{__html: t('material.show.booking.validate.success.body', {'user': booking?.user})}} />
                        </ModalBody>
                    </ModalContent>
                </Modal>

                <Stack spacing={{ base: 6, md: 10 }}>
                    <Box as={'header'}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                            {material.name}
                        </Heading>
                        <Text
                            colorScheme={'gray'}
                            fontWeight={700}
                            as={'span'}
                            mr={2}
                            fontSize={'lg'}>
                            Prix:
                        </Text>
                        {material.pricings.collection.map((pricing) => (
                            <Text
                                key={pricing._id}
                                colorScheme={'gray'}
                                fontWeight={300}
                                as={'span'}
                                borderBottomWidth={2}
                                borderBottomStyle={'solid'}
                                borderBottomColor={'red'}
                                mr={3}
                                fontSize={'lg'}>
                                {pricing.value === 0 ?
                                    t('material.show.pricing.free.' + Math.floor(Math.random() * 9) ) :
                                    t('material.show.pricing.price', {'amount': pricing.value, 'period': t('material.show.pricing.period.' + pricing.period)}) + (pricing.circles.edges.length > 0 ? ' (' + (pricing.circles.edges.map(({node}) => (node.name))) + ')' : '')
                                }
                            </Text>
                        ))}
                    </Box>

                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={'column'}
                        divider={
                            <StackDivider
                                borderColor={'gray'}
                            />
                        }>
                        <VStack spacing={{ base: 4, sm: 6 }}>
                            <Text fontSize={'lg'}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                                aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                                maxime modi nam officiis porro, quae, quisquam quos
                                reprehenderit velit? Natus, totam.
                            </Text>
                        </VStack>
                        <Box>
                            <Text
                                fontSize={{ base: '16px', lg: '18px' }}
                                colorScheme={'yellow'}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                {t('material.show.features')}
                            </Text>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                                <List spacing={2}>
                                    <ListItem>Chronograph</ListItem>
                                    <ListItem>Master Chronometer Certified</ListItem>{' '}
                                    <ListItem>Tachymeter</ListItem>
                                </List>
                                <List spacing={2}>
                                    <ListItem>Anti‑magnetic</ListItem>
                                    <ListItem>Chronometer</ListItem>
                                    <ListItem>Small seconds</ListItem>
                                </List>
                            </SimpleGrid>
                        </Box>
                        <Box>
                            <Text
                                fontSize={{ base: '16px', lg: '18px' }}
                                colorScheme={'yellow'}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                {t('material.show.details')}
                            </Text>

                            <List spacing={2}>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Caractéristique:
                                    </Text>{' '}
                                    20 mm
                                </ListItem>
                            </List>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </BookingContext.Provider>
    )
}

export default MaterialShow