import * as React from 'react'
import {
    Heading,
    Avatar,
    Text,
    Stack,
    Button,
    Badge,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Spacer,
    useDisclosure,
    Wrap,
} from '@chakra-ui/react'
import { User } from '../../../types'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ExchangeMailCloud } from '../../atoms/Illustrations/ExchangeMailCloud'
import { HiOutlineChatAlt } from 'react-icons/hi'
import { Card } from './Card'
import Rating from 'react-rating'
import { CircleLogo } from '../User/Circle/CircleLogo'
import { useAuth } from '../../../auth/AuthStatus'

export const UserCard = ({
    user,
    step,
}: {
    user: User
    step: 'initial' | 'choosePeriod' | 'validated'
}) => {
    const fullname = user.firstname + ' ' + user.lastname
    const { t } = useTranslation()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const borderRadius = step === 'choosePeriod' ? '0 10px 10px 0' : undefined
    const auth = useAuth()
    return (
        <Card borderRadius={borderRadius}>
            <Avatar
                size={'xl'}
                src={`http://127.0.0.1:8000/images/users/${user.avatarName}`}
                name={`${user.firstname} ${user.lastname}`}
                mb={4}
                pos={'relative'}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
                {(user.roles.includes('ROLE_MODERATOR') && (
                    <Text
                        bgGradient="linear(to-l, #7928CA, #FF0080)"
                        bgClip="text"
                        fontWeight="extrabold"
                        children={fullname}
                    />
                )) ||
                    fullname}
            </Heading>
            <Stack direction="column">
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    {user.city}
                </Text>
                <Wrap spacing="1rem" justify="center">
                    {user.circles.edges.map(({ node }) => {
                        return <CircleLogo key={node._id} circle={node} />
                    })}
                </Wrap>
                <Rating readonly initialRating={user.averageRatingScore ?? 0} />
            </Stack>

            <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                <Badge
                    px={2}
                    py={1}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    fontWeight={'400'}
                >
                    {t('user.card.ratingsNumber', {
                        count: user.ratings.totalCount,
                    })}
                </Badge>
                <Badge
                    px={2}
                    py={1}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    fontWeight={'400'}
                >
                    {t('user.card.sharedItemsNumber', {
                        count: user.materials.paginationInfo.totalCount,
                    })}
                </Badge>
            </Stack>

            <Stack mt={8} direction={'row'} spacing={4}>
                <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    onClick={onOpen}
                    leftIcon={<HiOutlineChatAlt />}
                    disabled={user._id === auth.user?.id}
                    _focus={{
                        bg: 'gray.200',
                    }}
                >
                    {t('user.card.contact')}
                </Button>
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            {t('material.show.modal.title', { user: user })}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {t('material.show.modal.body', { user: user })}
                            </ReactMarkdown>
                            <ExchangeMailCloud
                                height={{ sm: '16rem', lg: '24rem' }}
                                mt={{ base: 12, sm: 16 }}
                            />
                            <Spacer h={35} />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Stack>
        </Card>
    )
}
