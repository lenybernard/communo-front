import * as React from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react"
import Layout from "./components/layout/Layout";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Layout>

    </Layout>
  </ChakraProvider>
)

