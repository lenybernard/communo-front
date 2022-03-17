import * as React from 'react'
import {
    Box,
    Button,
    Heading,
    Spacer,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react'
import { Material } from '../../../../../types'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker, FocusedInputShape, isSameDay } from 'react-dates'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import moment, { locale } from 'moment'
import 'moment/locale/fr'
import { FaArrowLeft } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { BookingSummary } from './BookingSummary'
import { BookingContext } from '../../../../../contexts/BookingContext'

export interface ButtonState {
    bgGradient: string
    color: string
    isLoading: boolean
    loadingText: string
}

export const AvailabilityPlanning = ({
    material,
    onBack,
    setStep,
}: {
    material: Material
    onBack: () => void
    setStep: Dispatch<SetStateAction<'initial' | 'choosePeriod' | 'validated'>>
}) => {
    const { t, i18n } = useTranslation()
    const [fromDate, setFromDate] = useState<moment.Moment | null>(null)
    const [toDate, setToDate] = useState<moment.Moment | null>(null)
    const [focus, setFocus] = useState<FocusedInputShape | null>('startDate')
    const [buttonState, setButtonState] = useState<null | ButtonState>(null)
    const [summary, setSummary] = useState<Element>()
    const bookingContext = React.useContext(BookingContext)
    locale(i18n.language)
    const bookedDays: moment.Moment[] = []
    material.bookings.edges.map(({ node }) => {
        if (node.status !== 'estimated') {
            bookedDays.push(moment(node.startDate))
            let start = moment(node.startDate)
            const end = moment(node.endDate)
            if (start < end) {
                while (start < end) {
                    const newDate = start.add(1, 'day')
                    start = moment(newDate)
                    bookedDays.push(newDate)
                }
            }
            bookedDays.push(moment(node.endDate))
        }

        return true
    })

    useEffect(() => {
        if (bookingContext?.booking) {
            setSummary(
                // @ts-ignore
                <BookingSummary
                    booking={bookingContext?.booking}
                    material={material}
                    setButtonState={setButtonState}
                    buttonState={buttonState}
                    setStep={setStep}
                />
            )
        }
    }, [bookingContext, buttonState, material, setStep])

    return (
        <Box
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
        >
            {onBack && (
                <Button onClick={onBack} leftIcon={<FaArrowLeft />}>
                    Retour
                </Button>
            )}
            <VStack>
                <Heading as="h2" size={'lg'}>
                    {t('material.show.booking.choosePeriod.title')}
                </Heading>
                <Spacer />
                <DateRangePicker
                    startDatePlaceholderText={t(
                        'material.show.booking.choosePeriod.startDate'
                    )}
                    endDatePlaceholderText={t(
                        'material.show.booking.choosePeriod.endDate'
                    )}
                    showClearDates={true}
                    hideKeyboardShortcutsPanel={true}
                    startDate={fromDate} // momentPropTypes.momentObj or null,
                    startDateId="availabilityBookingInput_StartDate" // PropTypes.string.isRequired,
                    endDate={toDate} // momentPropTypes.momentObj or null,
                    endDateId="availabilityBookingInput_EndDate" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => {
                        setFromDate(startDate)
                        setToDate(endDate)
                        if (startDate && endDate) {
                            const url = new URL(
                                `http://localhost:8000/api/material/${material._id}/booking/estimate`
                            )
                            url.search = new URLSearchParams({
                                startDate: startDate.format(),
                                endDate: endDate.format(),
                                materialId: material._id,
                            }).toString()
                            const jwt = localStorage.getItem('token')
                            const requestOptions = {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    authorization: `Bearer ${jwt}`,
                                },
                            }
                            fetch(url.toString(), requestOptions)
                                .then((response) => response.json())
                                .then((response) => {
                                    bookingContext?.setBooking(response)
                                })
                        }
                    }} // PropTypes.func.isRequired,
                    focusedInput={focus} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={(focusedInput) => setFocus(focusedInput)} // PropTypes.func.isRequired,
                    minimumNights={0}
                    numberOfMonths={1}
                    firstDayOfWeek={1}
                    displayFormat="DD/MM/Y"
                    isDayBlocked={(momentDate) => {
                        return bookedDays.some((bookedDay) =>
                            isSameDay(bookedDay, momentDate)
                        )
                    }}
                />
                <Spacer />

                {bookingContext?.booking && summary}
            </VStack>
        </Box>
    )
}
