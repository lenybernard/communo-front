import * as React from "react";
import logo from "./logo.svg"

export const Logo = ({width, height}: {width: number, height: number}) =>
    <img src={logo} width={width} height={height} />