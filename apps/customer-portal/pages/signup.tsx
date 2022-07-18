import type { NextPage } from 'next'
import {
  Container,
  Heading,
} from '@chakra-ui/react'
import SignUpForm from 'Forms/sign-up'

const SignUp: NextPage = () => (
  <Container
    h="100%"
  >
    <Heading
      mb={6}
    >
      Sign Up
    </Heading>
    <SignUpForm />
  </Container>
)

export default SignUp
