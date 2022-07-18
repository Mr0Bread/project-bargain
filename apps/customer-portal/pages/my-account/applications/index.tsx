import type { ReactElement } from 'react'
import MyAccountLayout from 'Layouts/my-account'
import {
  SimpleGrid,
  Box,
  Heading,
  Divider,
  Icon,
  Button,
} from '@chakra-ui/react'
import { BsPlusCircle } from 'react-icons/bs'
import Link from 'next/link'
import type { NextPageWithLayout } from '../../_app'

const Applications: NextPageWithLayout = () => (
  <>
    <Link
      passHref
      href="/my-account/applications/new"
    >
      <Button
        mb={6}
        leftIcon={<Icon as={BsPlusCircle} />}
      >
        Add New
      </Button>
    </Link>
    <SimpleGrid
      columns={4}
      gap={6}
    >
      <Link
        passHref
        href="/my-account/applications/42"
      >
        <Box
          border="1px"
          borderRadius="lg"
          transition="background-color .2s"
          _hover={{
            cursor: 'pointer',
            backgroundColor: 'gray.700',
          }}
        >
          <Heading
            size="md"
            px={4}
            pt={2}
          >
            Mercedes S500
          </Heading>
          <Divider
            my={4}
          />
          <Box
            px={4}
            pb={2}
          >
            Application Short Data
          </Box>
        </Box>
      </Link>
    </SimpleGrid>
  </>
)

Applications.getLayout = (page: ReactElement) => (
  <MyAccountLayout title="Applications">
    {page}
  </MyAccountLayout>
)

export default Applications
