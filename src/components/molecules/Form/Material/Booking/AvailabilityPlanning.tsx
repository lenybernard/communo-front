import {
    Box,
    Button,
    Heading,
    Spacer,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import * as React from "react";
import {Material, MaterialBooking} from "../../../../../types";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {DateRangePicker, FocusedInputShape, isSameDay} from 'react-dates';
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import moment from "moment";
import 'moment/locale/fr'
import {FaArrowLeft} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
import BookingSummary from "./BookingSummary";

export interface ButtonState {
    bgGradient: string
    color: string
    isLoading: boolean
    loadingText: string
}

export const AvailabilityPlanning = ({material, onBack, setStep}: {material: Material, onBack: () => void, setStep: Dispatch<SetStateAction<"initial" | "choosePeriod" | "validated">>}) => {
    const {t, i18n} = useTranslation()
    const [startDate, setStartDate] = useState<moment.Moment | null>(null)
    const [endDate, setEndDate] = useState<moment.Moment | null>(null)
    const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>('startDate')
    const [booking, setBooking] = useState<MaterialBooking|null>()
    const [buttonState, setButtonState] = useState<null|ButtonState>(null)
    const [summary, setSummary] = useState<Element|null>()
    moment.locale(i18n.language)
    let bookedDays: moment.Moment[] = []
    material.bookings.edges.map(({node}) => {
        if (node.status !== 'estimated') {
            bookedDays.push(moment(node.startDate))
            let start = moment(node.startDate)
            const end = moment(node.endDate)
            if (start < end) {
                while (start < end) {
                    let newDate = start.add(1, 'day')
                    start = moment(newDate)
                    bookedDays.push(newDate)
                }
            }
            bookedDays.push(moment(node.endDate))
        }

        return true
    })


    useEffect(() => {
        if (booking) {
            // @ts-ignore
            setSummary(<BookingSummary
                booking={booking}
                material={material}
                setButtonState={setButtonState}
                buttonState={buttonState}
                setStep={setStep}
            />)
        }
    }, [booking, buttonState])

    return (
        <Box
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}>
            {onBack && <Button onClick={onBack} leftIcon={<FaArrowLeft/>}>Retour</Button>}
            <VStack>
                <Heading as='h2' size={'lg'}>{t('material.show.booking.choosePeriod.title')}</Heading>
                <Spacer/>
                <DateRangePicker
                    startDatePlaceholderText={t('material.show.booking.choosePeriod.startDate')}
                    endDatePlaceholderText={t('material.show.booking.choosePeriod.endDate')}
                    showClearDates={true}
                    hideKeyboardShortcutsPanel={true}
                    startDate={startDate} // momentPropTypes.momentObj or null,
                    startDateId="availabilityBookingInput_StartDate" // PropTypes.string.isRequired,
                    endDate={endDate} // momentPropTypes.momentObj or null,
                    endDateId="availabilityBookingInput_EndDate" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => {
                        setStartDate(startDate)
                        setEndDate(endDate)
                        if (startDate && endDate) {
                        let url = new URL(`http://localhost:8000/api/material/${material._id}/booking/estimate`)
                        url.search = new URLSearchParams( {startDate: startDate.format(), endDate: endDate.format(), materialId: material._id}).toString()
                        let jwt = localStorage.getItem('token')
                        const requestOptions = {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: `Bearer ${jwt}`,
                            },
                        }
                        fetch(url.toString(), requestOptions)
                            .then(response => response.json())
                            .then(response => {
                                toast('Ça couterait ' + response.price + '€ m\'sieur')
                                setBooking(response)
                            })
                        }
                    }} // PropTypes.func.isRequired,
                    focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                    minimumNights={0}
                    numberOfMonths={1}
                    firstDayOfWeek={1}
                    displayFormat="DD/MM/Y"
                    isDayBlocked={momentDate => {
                        return bookedDays.some(bookedDay => isSameDay(bookedDay, momentDate))
                    }}
                />
                <Spacer/>

                {booking && summary}
            </VStack>
        </Box>
    );
}

export default AvailabilityPlanning