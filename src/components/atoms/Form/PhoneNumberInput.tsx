import {
    Box,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
} from '@chakra-ui/react'
import React from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { RequiredAsterisk } from './RequiredAsterisk'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input'
import i18nIsoCountries, { registerLocale } from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'
import fr from 'i18n-iso-countries/langs/fr.json'

interface PhoneNumberProps {
    name: string
    register: UseFormRegister<any>
    errors:
        | {
              countryCode?: FieldError | undefined
              nationalNumber?: FieldError | undefined
          }
        | undefined
    isRequired?: boolean
}

export const PhoneNumberInput = ({
    name,
    register,
    errors,
    isRequired = false,
}: PhoneNumberProps) => {
    const { t, i18n } = useTranslation()
    const countries = getCountries()
    registerLocale(en)
    registerLocale(fr)

    return (
        <FormControl id={name} isInvalid={errors !== undefined}>
            <FormLabel>
                {t('register.form.phoneNumber.label')}{' '}
                {isRequired && <RequiredAsterisk />}
            </FormLabel>
            <Flex>
                <Select
                    defaultValue={getCountryCallingCode('FR')}
                    isRequired={isRequired}
                    {...register(name + '.countryCode', {
                        required: 'This is required',
                        valueAsNumber: true,
                    })}
                    w={'6rem'}
                >
                    {countries.map(
                        (code) =>
                            i18nIsoCountries.isValid(code) && (
                                <option
                                    key={code}
                                    value={getCountryCallingCode(code)}
                                >
                                    {i18nIsoCountries.getName(
                                        code,
                                        i18n.language
                                    )}
                                </option>
                            )
                    )}
                </Select>
                <Box flexGrow={1} ml={1}>
                    <Input
                        type="text"
                        placeholder={t('register.form.phoneNumber.placeholder')}
                        isRequired={isRequired}
                        {...register(name + '.nationalNumber', {
                            required: 'This is required',
                        })}
                    />
                </Box>
            </Flex>
            {errors !== undefined && (
                <FormErrorMessage>
                    {errors.nationalNumber?.message}
                </FormErrorMessage>
            )}
        </FormControl>
    )
}
