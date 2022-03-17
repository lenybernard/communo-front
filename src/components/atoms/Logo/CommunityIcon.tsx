import * as React from 'react'
import logo from './community.svg'

export const CommunityIcon = ({
    width,
    height,
}: {
    width: number
    height: number
}) => <img src={logo} alt="Community" width={width} height={height} />
