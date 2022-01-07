import {Link} from "react-router-dom";
import {Flex, Icon, Link as CLink} from "@chakra-ui/react";
import React from "react";
import {NavItemProps} from "./NavItemProps";

export const NavItem = ({ icon, to, display, children, ...rest }: NavItemProps) => {
    return (
        <CLink to={to} style={{ textDecoration: 'none' }} as={Link} display={display}>
            <Flex
                align="center"
                p="4"
                mx="4"
                role="group"
                cursor="pointer"
                borderBottomWidth={'5px'}
                borderBottomColor={'transparent'}
                _hover={{
                    borderBottomColor: 'blue.500',
                    color: 'blue.500',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        display={{ base: 'none', lg: 'flex' }}
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'blue.500',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </CLink>
    );
};

export default NavItem