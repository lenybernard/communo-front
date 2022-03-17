import { Select } from '@chakra-ui/react'
import React, {useMemo} from "react"
import {UseFormRegisterReturn} from "react-hook-form"
import countryList from 'react-select-country-list'
import {useTranslation} from "react-i18next";

export const GenderForm = ({register, isRequired = false}: {register: UseFormRegisterReturn, isRequired?: boolean}) => {
    const { t } = useTranslation()
    const options = useMemo(() => [
        {label: ''},
        {label: t('form.gender.female'), value: 'female'},
        {label: t('form.gender.male'), value: 'male'},
    ], [])

    return <Select
        isRequired={isRequired}
        {...register}
    >{options.map((option: {label: string, value?: string}) => <option key={option.label} value={option.value}>{option.label}</option>)}
    </Select>
}

export default GenderForm