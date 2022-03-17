import * as React from 'react'
import { MaterialBooking } from '../types'
import { Dispatch, SetStateAction } from 'react'

interface BookingContextInterface {
    booking: MaterialBooking | null | undefined
    setBooking: Dispatch<SetStateAction<MaterialBooking | null | undefined>>
}

export const BookingContext =
    React.createContext<BookingContextInterface | null>(null)
