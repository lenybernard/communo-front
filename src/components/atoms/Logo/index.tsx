import * as React from "react";
import logo from "./logo.svg"

export const LogoImage = ({width, height}: {width: number, height: number}) =>
    <img src={logo} alt="Logo" width={width} height={height} />