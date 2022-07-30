import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import DefaultLayout from 'Layouts/default'
import theme from 'Theme'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { appWithTranslation } from 'next-i18next'
import { ApolloProvider } from '@apollo/client'
import GraphQlClient from 'GraphQl/client'
import { Provider as ReduxProvider } from 'react-redux'
import ReduxStore from 'Store'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => (
    <DefaultLayout {...pageProps}>
      {page}
    </DefaultLayout>
  ))

  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={GraphQlClient}>
        <ReduxProvider store={ReduxStore}>
          {getLayout(<Component {...pageProps} />)}
        </ReduxProvider>
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default appWithTranslation(MyApp)
