import UserCard from "../Cards/UserCard";
import {Box, Button} from "@chakra-ui/react";
import AvailabilityPlanningCard from "../Form/Material/Booking/AvailabilityPlanning";
import * as React from "react";
import {useState} from "react";
import {Material} from "../../../types";
import {useTranslation} from "react-i18next";
import Card from "../Cards/Card";

const BookMaterial = ({material}: {material: Material}) => {
    const [step, setStep] = useState('zero')
    const {t} = useTranslation()

    return <>
        {(step === 'zero') ||
        (step === 'choosePeriod' && <AvailabilityPlanningCard material={material} onBack={() => setStep('zero')}/>)}
    </>
}

export default BookMaterial