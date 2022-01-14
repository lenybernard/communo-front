import {
    Box, Button, Center, Heading, Icon, Spacer,
    useColorModeValue,
} from '@chakra-ui/react';
import * as React from "react";
import {Material} from "../../../types";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {DateRangePicker, FocusedInputShape, isSameDay} from 'react-dates';
import {useState} from "react";
import moment from "moment";
import {FaArrowLeft} from "react-icons/fa";

export const AvailabilityPlanningCard = ({material, onBack}: {material: Material, onBack: () => void}) => {
    const [startDate, setStartDate] = useState<moment.Moment | null>(null)
    const [endDate, setEndDate] = useState<moment.Moment | null>(null)
    const [ focusedInput, setFocusedInput ] = useState<FocusedInputShape | null>('startDate')
    let bookedDays: moment.Moment[] = []
    material.bookings.edges.map(({node}) => {
        bookedDays.push(moment(node.startDate))
        let start = moment(node.startDate)
        const end = moment(node.endDate)
        if (start < end) {
            while (start < end) {
                let newDate = start.add(1, 'day')
                start = moment(newDate)
            }
        }
        bookedDays.push(moment(node.endDate))

        return true
    })

    return (
        <Box
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}>
            {onBack && <Button onClick={onBack} leftIcon={<FaArrowLeft/>}>Retour</Button>}
                <Center>
                    <Heading>Dispo</Heading>
                    <Spacer/>
                    <DateRangePicker
                        startDate={startDate} // momentPropTypes.momentObj or null,
                        startDateId="availabilityBookingInput_StartDate" // PropTypes.string.isRequired,
                        endDate={endDate} // momentPropTypes.momentObj or null,
                        endDateId="availabilityBookingInput_EndDate" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => {
                            setStartDate(startDate)
                            setEndDate(endDate)
                            if (startDate && endDate) {
                            let url = new URL('http://localhost:8000/api/booking/material/getEstimate')
                            url.search = new URLSearchParams( {startDate: startDate.format(), endDate: endDate.format(), materialId: material._id}).toString()
                            const requestOptions = {
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' },
                            }
                            fetch(url.toString(), requestOptions)
                                .then(response => response.json())
                                .then(response => {

                                })
                            }
                        }} // PropTypes.func.isRequired,
                        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                        numberOfMonths={1}
                        firstDayOfWeek={1}
                        displayFormat="DD/MM/Y"
                        isDayBlocked={momentDate => {
                            return bookedDays.some(bookedDay => isSameDay(bookedDay, momentDate))
                        }}
                    />
                </Center>
        </Box>
    );
}

export default AvailabilityPlanningCard