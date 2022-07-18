import DefaultLayout from 'Layouts/default'
import type { PropsWithChildren, FC } from 'react'
import {
  Grid,
  GridItem,
  Box,
  Heading,
  Divider,
} from '@chakra-ui/react'
import MyAccountSidebar from 'Components/my-account-sidebar'
import { useRouter } from 'next/router'
import { ALL_ROUTES } from 'Utils/Constants'

export interface MyAccountLayoutProps {
  title: string;
}

const MyAccountLayout: FC<PropsWithChildren<MyAccountLayoutProps>> = ({ children, title }) => {
  const { asPath } = useRouter()
  const isNewApplicationPage = asPath === ALL_ROUTES.MY_ACCOUNT.APPLICATION_NEW

  return (
    <DefaultLayout>
      <Grid
        templateColumns={isNewApplicationPage ? '1fr' : '33% auto'}
        gap={8}
      >
        {
          !isNewApplicationPage && (
            <GridItem>
              <MyAccountSidebar
                shadow="lg"
                pb={6}
                borderRadius="md"
                h="100%"
              />
            </GridItem>
          )
        }
        <GridItem>
          <Box
            shadow="lg"
            borderRadius="md"
            h="100%"
            p={4}
          >
            <Heading
              size="lg"
              mb={4}
            >
              {title}
            </Heading>
            <Divider
              mb={6}
            />
            {children}
          </Box>
        </GridItem>
      </Grid>
    </DefaultLayout>
  )
}

export default MyAccountLayout
