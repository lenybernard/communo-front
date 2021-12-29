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
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>

          </VStack>
        </Grid>
      </Box>
    </Layout>
  </ChakraProvider>
)
