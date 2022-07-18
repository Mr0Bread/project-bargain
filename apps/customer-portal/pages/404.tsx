import type { NextPage } from 'next'
import {
  Heading,
  Button,
  Center,
  VStack,
  Icon,
} from '@chakra-ui/react'
import Link from 'next/link'
import {
  BsBoxArrowInRight,
  BsExclamationCircle,
} from 'react-icons/bs'

const FourOhFour: NextPage = () => (
  <Center>
    <VStack
      spacing={8}
    >
      <Icon
        as={BsExclamationCircle}
        fontSize="6xl"
      />
      <Heading
        fontSize="4xl"
      >
        Page not found
      </Heading>
      <Link
        passHref
        href="/"
      >
        <Button
          variant="ghost"
          fontSize="3xl"
          p={8}
          rightIcon={<Icon as={BsBoxArrowInRight} />}
          colorScheme="green"
        >
          Go back to homepage
        </Button>
      </Link>
    </VStack>
  </Center>
)

export default FourOhFour
