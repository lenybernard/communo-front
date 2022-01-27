import * as React from "react";
import {Circle} from "../../../../types";
import {Avatar, useColorModeValue} from "@chakra-ui/react";
import {CommunityIcon} from "../../../atoms/Logo/CommunityIcon";

export const CircleLogo = ({circle}: {circle: Circle}) => {
    return <Avatar
        src={`http://127.0.0.1:8000/images/circles/${circle.logoName}`}
        alt={`Logo ${circle.name}`}
        icon={<CommunityIcon width={30} height={30}/>}
        border={`1px solid ${useColorModeValue('#eee', '#444')}`}
        boxShadow={"lg"}
        bg={useColorModeValue('white', 'gray.700')}
        title={circle.name}
    />
}
