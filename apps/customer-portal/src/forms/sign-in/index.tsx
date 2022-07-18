import type { FC } from 'react'
import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Button,
  Box,
  FormErrorMessage
} from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'
import {
  Formik, Form, FormikHelpers, Field, ErrorMessage
} from 'formik'
import * as Yup from 'yup'

export interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
})

const SignInForm: FC<{
  onSubmit: (values: FormValues, helpers: FormikHelpers<FormValues>) => void;
  initialValues: FormValues;
  boxProps: BoxProps;
  isLoading: boolean;
}> = ({
  onSubmit,
  boxProps,
  initialValues,
  isLoading,
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  return (
    <Box
      {...boxProps}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {
          ({ errors, touched }) => (
            <Form>
              <VStack
                gap={4}
              >
                <FormControl
                  isInvalid={!!errors.email && touched.email}
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
                >
                  <FormLabel>
                    Password
                  </FormLabel>
                  <HStack>
                    <Field
                      as={Input}
                      type={isPasswordHidden ? 'password' : 'text'}
                      name="password"
                      id="password"
                    />
                    <Button
                      onClick={() => setIsPasswordHidden(!isPasswordHidden)}
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
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    Sign In
                  </Button>
                </Box>
              </VStack>
            </Form>
          )
        }
      </Formik>
    </Box>
  )
}

export default SignInForm
