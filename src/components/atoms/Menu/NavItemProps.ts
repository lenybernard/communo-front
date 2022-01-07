import {FlexProps} from "@chakra-ui/react";
import {IconType} from "react-icons";
import {ReactText} from "react";
import {TFunctionResult} from "i18next";

export declare interface NavItemProps extends FlexProps {
    icon: IconType
    to: string
    children: ReactText|TFunctionResult
}