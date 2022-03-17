import { IconType } from 'react-icons'
import { Token } from '@chakra-ui/styled-system/dist/declarations/src/utils'
import * as CSS from 'csstype'

export declare interface LinkItemProps {
    name: string
    icon: IconType
    to: string
    display?: Token<CSS.Property.Display>
}
