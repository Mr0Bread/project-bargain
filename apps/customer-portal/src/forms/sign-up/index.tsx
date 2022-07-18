import { useEffect } from 'react'
import type { FC } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Button,
  Box,
  useBoolean,
  FormErrorMessage,
  Spinner,
} from '@chakra-ui/react'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useMutation, gql } from '@apollo/client'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'Store'
import { setCustomerState, selectCustomer } from 'Store/slices/customer.slice'
import { useRouter } from 'next/router'

const SignUpForm: FC = () => {
  const [signUp, { loading }] = useMutation(
    gql`
            mutation Mutation($input: CustomerInput!) {
                signUp(input: $input) {
                    email
                    firstName
                    id
                    lastName,
                }
            }
        `,
  )
  const dispatch = useDispatch()
  const [isPasswordHidden, setIsPasswordHidden] = useBoolean(true)
  const router = useRouter()
  const { isSignedIn } = useSelector(selectCustomer)

  useEffect(() => {
    if (isSignedIn) {
      router.push('/my-account')
    }
  }, [router, isSignedIn])

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(8, 'Minimum 8 characters').required('Required'),
      })}
      onSubmit={async (values) => {
        const {
          data: {
            signUp: {
              email,
              firstName,
              lastName,
            },
          },
        } = await signUp({ variables: { input: { ...values } } })

        dispatch(setCustomerState({
          email,
          firstName,
          lastName,
          isSignedIn: true,
        }))
        router.push('/my-account')
      }}
    >
      {
        ({ errors, touched }) => (
          <Box
            position="relative"
          >
            {loading && (
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
              >
                <Spinner
                  size="lg"
                />
              </Box>
            )}
            <Form>
              <VStack
                gap={4}
              >
                <FormControl
                  isInvalid={!!errors.firstName && touched.firstName}
                  isDisabled={loading}
                >
                  <FormLabel
                    htmlFor="firstName"
                  >
                                    First Name
                  </FormLabel>
                  <Field
                    as={Input}
                    name="firstName"
                    id="firstName"
                  />
                  <ErrorMessage
                    name="firstName"
                    component={FormErrorMessage}
                  />
                </FormControl>
                <FormControl
                  isInvalid={!!errors.lastName && touched.lastName}
                  isDisabled={loading}
                >
                  <FormLabel>
                                    Last Name
                  </FormLabel>
                  <Field
                    as={Input}
                    name="lastName"
                    id="lastName"
                  />
                  <ErrorMessage
                    name="lastName"
                    component={FormErrorMessage}
                  />
                </FormControl>
                <FormControl
                  isInvalid={!!errors.email && touched.email}
                  isDisabled={loading}
                >
                  <FormLabel>
                                    Email
                  </FormLabel>
                  <Field
                    as={Input}
                    name="email"
                    id="email"
                  />
                  <ErrorMessage
                    name="email"
                    component={FormErrorMessage}
                  />
                </FormControl>
                <FormControl
                  isInvalid={!!errors.password && touched.password}
                  isDisabled={loading}
                >
                  <FormLabel>
                                    Password
                  </FormLabel>
                  <HStack>
                    <Field
                      as={Input}
                      name="password"
                      id="password"
                      type={isPasswordHidden ? 'password' : 'text'}
                    />
                    <Button
                      onClick={setIsPasswordHidden.toggle}
                    >
                      {isPasswordHidden ? 'Show' : 'Hide'}
                    </Button>
                  </HStack>
                  <ErrorMessage
                    name="password"
                    component={FormErrorMessage}
                  />
                </FormControl>
                <Box
                  pt={4}
                  w="100%"
                >
                  <Button
                    type="submit"
                    colorScheme="teal"
                    w="100%"
                    isDisabled={loading}
                  >
                                    Sign Up
                  </Button>
                </Box>
              </VStack>
            </Form>
          </Box>
        )
      }
    </Formik>
  )
}

export default SignUpForm
