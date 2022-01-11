import * as React from "react"
import {
    Box,
    VStack,
    Grid,
    Heading,
    Container,
    Spinner,
    SlideFade,
    Flex,
    SimpleGrid,
    Icon,
    Button,
    ButtonGroup,
    Input,
    InputGroup,
    InputRightElement, Text,
} from "@chakra-ui/react"
import {
    useQuery,
} from "@apollo/client";
import MaterialCard from "../../components/molecules/Cards/MaterialCard";
import {useTranslation} from "react-i18next";
import {Material} from "../../types";
import {findMaterials} from "../../repositories/Material/MaterialRepository";
import {MutableRefObject, useRef, useState} from "react";
import useUrlQuery from "../../hooks/useUrlQuery";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {FaSearchengin} from "react-icons/fa";
import {TiTimesOutline} from "react-icons/ti";

interface MaterialListProps {
    page: number
    topRef: MutableRefObject<any>
    searchTerms: string
}

const MaterialList = ({page, topRef, searchTerms}: MaterialListProps) => {
    const navigate = useNavigate()
    const {t} = useTranslation()

    const scrollTo = (ref: MutableRefObject<any>) => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    let query = useUrlQuery()
    if (query.has('page')) {
        let pageQuery = query.get('page')
        if (pageQuery !== null)
        {
            page = parseInt(pageQuery)
        }
    }
    const { loading, error, data } = useQuery(findMaterials, {
        variables: {
            page,
            searchTerms
        }
    })
    if (error) return <p>Error :(</p>;
    let materials = []
    let paginationInfo = {lastPage: 0, totalCount: 0}
    if (!loading) {
        materials = data.materials.collection
        paginationInfo = data.materials.paginationInfo
    }

    const jumpPage = (number: number) => {
        navigate('?page=' + number)
        scrollTo(topRef)
    }

    let pageRange = [];
    for (let i = 1; i <= paginationInfo.lastPage; i++) {
        pageRange.push(i);
    }

    return (loading && <Spinner size='xl' />) || (error && <div>Error :(</div>) || (
        <Container maxW='8xl' ref={topRef}>
            <Text>{t('material.index.itemsFound' + (paginationInfo.totalCount > 1 ? '_plural' : ''), {'count': paginationInfo.totalCount})}</Text>
            <SlideFade in={!loading} offsetY='300px'>
                <Flex
                    textAlign={'center'}
                    justifyContent={'center'}
                    direction={'column'}
                    width={'full'}>
                    <SimpleGrid
                        columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
                        spacing={'10'}
                        mt={16}
                        mx={'auto'}>
                        {
                            materials.map((material: Material) => {
                                const picture = material.images.edges.length > 0 ? 'http://127.0.0.1:8000/images/materials/' + material.images.edges[0].node.imageName : 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
                                return <MaterialCard key={material._id} picture={picture} name={material.name} brand={material.brand} model={material.model} id={material._id}/>
                            })
                        }
                    </SimpleGrid>
                    {pageRange.length > 1 &&
                        <Flex justifyContent={'center'}>
                            <ButtonGroup variant="solid">
                                {pageRange.map((i) => {
                                    return <Button key={`page-${i}`} onClick={() => jumpPage(i)}
                                                   isActive={i === page}>{i}</Button>
                                })}
                            </ButtonGroup>
                        </Flex>
                    }
                    <Box>
                        <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={'yellow.300'}>
                            <path
                                fill={'currentColor'}
                                d="M10.7964 5.04553e-07C8.66112 -0.000123335 6.57374 0.632971 4.79827 1.81922C3.0228 3.00547 1.63898 4.69158 0.82182 6.66433C0.00466116 8.63708 -0.209132 10.8079 0.207477 12.9021C0.624087 14.9964 1.65239 16.9201 3.16233 18.4299L19.1153 34.3828C19.2395 34.5074 19.3871 34.6062 19.5496 34.6736C19.7121 34.741 19.8863 34.7757 20.0622 34.7757C20.2381 34.7757 20.4123 34.741 20.5748 34.6736C20.7373 34.6062 20.8848 34.5074 21.0091 34.3828L36.962 18.4272C38.9319 16.3917 40.0228 13.6636 39.9996 10.8311C39.9764 7.99858 38.8409 5.28867 36.838 3.28573C34.835 1.28279 32.1251 0.147283 29.2926 0.124081C26.4601 0.100879 23.732 1.19184 21.6965 3.1617L20.0622 4.79337L18.4305 3.1617C17.4276 2.15892 16.237 1.36356 14.9267 0.821064C13.6163 0.278568 12.2119 -0.000433066 10.7937 5.04553e-07H10.7964Z"
                            />
                        </Icon>&nbsp;
                        <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={'yellow.300'}>
                            <path
                                fill={'currentColor'}
                                d="M10.7964 5.04553e-07C8.66112 -0.000123335 6.57374 0.632971 4.79827 1.81922C3.0228 3.00547 1.63898 4.69158 0.82182 6.66433C0.00466116 8.63708 -0.209132 10.8079 0.207477 12.9021C0.624087 14.9964 1.65239 16.9201 3.16233 18.4299L19.1153 34.3828C19.2395 34.5074 19.3871 34.6062 19.5496 34.6736C19.7121 34.741 19.8863 34.7757 20.0622 34.7757C20.2381 34.7757 20.4123 34.741 20.5748 34.6736C20.7373 34.6062 20.8848 34.5074 21.0091 34.3828L36.962 18.4272C38.9319 16.3917 40.0228 13.6636 39.9996 10.8311C39.9764 7.99858 38.8409 5.28867 36.838 3.28573C34.835 1.28279 32.1251 0.147283 29.2926 0.124081C26.4601 0.100879 23.732 1.19184 21.6965 3.1617L20.0622 4.79337L18.4305 3.1617C17.4276 2.15892 16.237 1.36356 14.9267 0.821064C13.6163 0.278568 12.2119 -0.000433066 10.7937 5.04553e-07H10.7964Z"
                            />
                        </Icon>&nbsp;
                        <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={'yellow.300'}>
                            <path
                                fill={'currentColor'}
                                d="M10.7964 5.04553e-07C8.66112 -0.000123335 6.57374 0.632971 4.79827 1.81922C3.0228 3.00547 1.63898 4.69158 0.82182 6.66433C0.00466116 8.63708 -0.209132 10.8079 0.207477 12.9021C0.624087 14.9964 1.65239 16.9201 3.16233 18.4299L19.1153 34.3828C19.2395 34.5074 19.3871 34.6062 19.5496 34.6736C19.7121 34.741 19.8863 34.7757 20.0622 34.7757C20.2381 34.7757 20.4123 34.741 20.5748 34.6736C20.7373 34.6062 20.8848 34.5074 21.0091 34.3828L36.962 18.4272C38.9319 16.3917 40.0228 13.6636 39.9996 10.8311C39.9764 7.99858 38.8409 5.28867 36.838 3.28573C34.835 1.28279 32.1251 0.147283 29.2926 0.124081C26.4601 0.100879 23.732 1.19184 21.6965 3.1617L20.0622 4.79337L18.4305 3.1617C17.4276 2.15892 16.237 1.36356 14.9267 0.821064C13.6163 0.278568 12.2119 -0.000433066 10.7937 5.04553e-07H10.7964Z"
                            />
                        </Icon>
                    </Box>
                </Flex>
            </SlideFade>
        </Container>
    )
}

export const Index = () => {
    const { t } = useTranslation()
    const [page] = useState(1)
    const topRef = useRef(null)
    const [searchTerms, setSearchTerms] = useState('')

    return <>
        <Helmet>
            <title>{ t('material.index.title') } { t('meta.title.suffix') }</title>
        </Helmet>
        <Box textAlign="center" fontSize="xl" ref={topRef}>
            <Grid p={4}>
                <VStack>
                    <Heading>
                        { t('material.index.title') }
                    </Heading>
                        <InputGroup maxW={'400px'}>
                            <Input
                                placeholder='Search'
                                size='xl'
                                bg={'white'}
                                rounded={'full'}
                                px={5}
                                py={2}
                                mt={5}
                                value={searchTerms}
                                onChange={(event) => setSearchTerms(event.target.value)}
                            />
                            <InputRightElement children={(searchTerms && <TiTimesOutline style={{'cursor': 'pointer'}} onClick={(event) => setSearchTerms('')}/>) || <FaSearchengin />}
                                               fontSize={'xl'}
                                               mt={6}/>
                        </InputGroup>
                    <MaterialList page={page} topRef={topRef} searchTerms={searchTerms}/>
                </VStack>
            </Grid>
        </Box>
    </>
}

export default Index