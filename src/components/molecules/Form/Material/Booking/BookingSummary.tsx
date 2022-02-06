import {
    Box,
    Button,
    Text, useColorModeValue,
} from '@chakra-ui/react'
import * as React from "react"
import {Material, MaterialBooking} from "../../../../../types"
import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"
import {Dispatch, SetStateAction} from "react"
import moment from "moment"
import 'moment/locale/fr'
import {useTranslation} from "react-i18next"
import {ButtonState} from "./AvailabilityPlanning"
import {toast} from "react-toastify"
import {Navigate, useLocation} from "react-router-dom";

            export const BookingSummary = ({booking, material, buttonState, setButtonState, setStep}: {booking: MaterialBooking, material: Material, setButtonState: Dispatch<SetStateAction<ButtonState | null>>, buttonState: ButtonState|null, setStep: Dispatch<SetStateAction<"initial" | "choosePeriod" | "validated">>}) => {
    const {t, i18n} = useTranslation()
    moment.locale(i18n.language)
    let location = useLocation();

    const handleSubmit = (booking: MaterialBooking) =>
    {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: booking._id}, null, 2)
        }
        fetch(`http://localhost:8000/api/materialbookings/${booking.id}/validate`, requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.message) {
                    throw new Error(response.message);
                }
                if (response.error) {
                    throw new Error(response.error);
                }
                toast(t('materials.validate.toast.success.' + Math.floor(Math.random() * 4), {'user': response.user}))
                setStep('validated')

                return <Navigate to="/login" state={{ from: location }} replace />;
            })
            .catch(error => {
                let errorMessage = t('materials.validate.toast.error.' + Math.floor(Math.random() * 5), {'error': error.toString().replace(/^Error: /, '')})
                toast.error(errorMessage)
            });

    }

    return (
        <Box color={'gray.500'} textAlign={'center'}>
            <Text m={'1rem'} fontSize={'lg'}>
                {t('material.show.booking.summary.introduction', {'owner': material.owner})}
            </Text>
            {booking?.periods.map((period) => {
                return <li key={period.id}>
                    {(moment(period.startDate).format('L') !== moment(period.endDate).format('L') && t('material.show.booking.summary.periodItem.range.label', {
                        'startDate': moment(period.startDate).format('LL'),
                        'endDate': moment(period.endDate).format('LL'),
                        'price': period.price
                    })) || t('material.show.booking.summary.periodItem.singleDay.label', {'day': moment(period.startDate).format('LL')})}
                    {period.price !== 0 && (period.price < 10 ? ' 🪙 ' : ' 💰️ ') + t('material.show.booking.summary.periodItem.price', {'price' : period.price})}
                </li>
            })}
            <Text>
                {t('material.show.booking.summary.price', {'price': booking.price})}
            </Text>
            <Button
                bgColor={useColorModeValue('blue.400', 'yellow.400')}
                color={useColorModeValue('yellow', 'blue.700')}
                flex={1}
                fontSize={'sm'}
                mt={'1rem'}
                {...buttonState}
                boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                onClick={() => {
                    handleSubmit(booking)
                    setButtonState({
                            loadingText: t('material.show.booking.summary.button.validated'),
                            bgGradient: 'linear(to-l, purple.400, pink.400)',
                            color: 'white',
                            isLoading: true
                        }
                    )}}
                _hover={{
                    bgGradient: 'linear(to-l, purple.400, pink.400)',
                    color: 'yellow',
                    transform: 'translateY(2px)',
                    boxShadow: 'lg',
                }}>
                {t('material.show.booking.summary.button.validate')}
            </Button>
        </Box>
    )
}

export default BookingSummary