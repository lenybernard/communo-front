import * as React from "react"
import {
    Box,
    VStack,
    Image,
    Text,
    Heading,
    Button,
    Stack,
    SimpleGrid,
    Container,
    List,
    ListItem,
    StackDivider,
    Flex,
    Spinner,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Spacer,
} from "@chakra-ui/react"
import {
    useQuery,
    gql
} from "@apollo/client";
import { useParams } from "react-router-dom";
import {useTranslation} from "react-i18next";
import ReactMarkdown from "react-markdown";
import ExchangeMailCloud from "../../components/atoms/Illustrations/ExchangeMailCloud";
import {Material} from "../../types";
import remarkGfm from "remark-gfm";

const MATERIAL_GET_QUERY = gql`
  query GetMaterial($id: ID!) {
    material(id: $id) {
      id
      name
      model
      brand
      reference
      owner {
        _id
        firstname
        lastname
        email
        phoneNumber
      }
      category {
        id
        name
      }
      images {
        edges {
          node {
            id
            imageName
            imageSize
          }
        }
      }
    }
  }
`;

export const MaterialShow = () => {
    const { t } = useTranslation()
    let params = useParams();
    const {loading, error, data} = useQuery(MATERIAL_GET_QUERY, {
        variables: {
            id: '/api/materials/' + params.id
        }
    });
    if (error) console.error(error)
    let material: Material|null = null
    if (!loading) {
        material = data.material
    }
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (error && <p>Error </p>) || (loading && <Spinner/>) || (material &&
        <Container maxW={'7xl'}>
            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 18, md: 24 }}>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={'product image'}
                        src={
                            'http://127.0.0.1:8000/images/materials/' + material.images.edges[0].node?.imageName
                        }
                        fit={'cover'}
                        align={'center'}
                        w={'100%'}
                        h={{ base: '100%', sm: '400px', lg: '500px' }}
                    />
                </Flex>
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
                            fontWeight={300}
                            fontSize={'2xl'}>
                            12,00 €/jour
                        </Text>
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
                            <Text
                                colorScheme={'gray'}
                                fontSize={'2xl'}
                                fontWeight={'300'}>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                                diam nonumy eirmod tempor invidunt ut labore
                            </Text>
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

                    <Button
                        rounded={'none'}
                        w={'full'}
                        mt={8}
                        size={'lg'}
                        py={'7'}
                        colorScheme={'green'}
                        textTransform={'uppercase'}
                        onClick={onOpen}
                        _hover={{
                            transform: 'translateY(2px)',
                            boxShadow: 'lg',
                        }}>
                        {t('material.show.button.label', {user: material.owner})}
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                {t('material.show.modal.title', {user: material.owner})}
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {t('material.show.modal.body', {user: material.owner})}
                                </ReactMarkdown>
                                <ExchangeMailCloud
                                    height={{ sm: '16rem', lg: '24rem' }}
                                    mt={{ base: 12, sm: 16 }}/>
                                <Spacer h={35}/>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Stack>
            </SimpleGrid>
        </Container>
    )
}

export default MaterialShow