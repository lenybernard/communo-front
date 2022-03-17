import {Text} from '@chakra-ui/react'
import React from "react"

export const RequiredAsterisk = () => <Text
    as={'span'}
    bgGradient="linear(to-r, red.400,pink.400)"
    bgClip="text">
    *
</Text>

export default RequiredAsterisk