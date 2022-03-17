import { Select } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import countryList from 'react-select-country-list'

export const CountryForm = ({
    register,
}: {
    register: UseFormRegisterReturn
}) => {
    const options = useMemo(() => countryList().getData(), [])

    return (
        <Select isRequired={true} {...register}>
            {options.map((option: { label: string; value: string }) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    )
}
