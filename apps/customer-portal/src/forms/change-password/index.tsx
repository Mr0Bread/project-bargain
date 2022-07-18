import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react'
import {
  FormikHelpers, Formik, Form, Field, ErrorMessage,
} from 'formik'
import { FC } from 'react'

export interface FormValues {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordFormProps {
  onSubmit: (values: FormValues, helpers: FormikHelpers<FormValues>) => void;
  initialValues: FormValues;
  isLoading: boolean;
}

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  onSubmit,
  initialValues,
  isLoading,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
  >
    {
      ({ errors, touched }) => (
        <Form>
          <VStack>
            <FormControl
              isInvalid={!!errors.currentPassword && touched.currentPassword}
            >
              <FormLabel>
                Current Password
              </FormLabel>
              <Field
                name="currentPassword"
                as={Input}
              />
              <ErrorMessage
                name="currentPassword"
                component={FormErrorMessage}
              />
            </FormControl>
            <FormControl
              isInvalid={!!errors.newPassword && touched.newPassword}
            >
              <FormLabel>
                New Password
              </FormLabel>
              <Field
                name="newPassword"
                as={Input}
              />
              <ErrorMessage
                name="newPassword"
                component={FormErrorMessage}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              w="100%"
              disabled={isLoading}
              isLoading={isLoading}
            >
                Save
            </Button>
          </VStack>
        </Form>
      )
    }
  </Formik>
)

export default ChangePasswordForm
