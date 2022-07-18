import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Icon,
  useBoolean,
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { BsPencilSquare, BsCheck2Circle } from 'react-icons/bs'

const PersonalDetailsForm = () => {
  const [isDisabled, { toggle: toggleIsDisabled }] = useBoolean(true)

  return (
    <Formik
      initialValues={{
        firstName: 'Project',
        lastName: 'Bargain',
      }}
      onSubmit={() => toggleIsDisabled()}
    >
      {
        () => (
          <Form>
            <VStack
              spacing={4}
            >
              <FormControl
                isDisabled={isDisabled}
              >
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Field
                  name="firstName"
                  as={Input}
                />
              </FormControl>
              <FormControl
                isDisabled={isDisabled}
              >
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Field
                  name="lastName"
                  as={Input}
                />
              </FormControl>
            </VStack>
            <Button
              colorScheme={isDisabled ? 'gray' : 'teal'}
              type="submit"
              w="100%"
              mt={6}
              leftIcon={isDisabled ? <Icon as={BsPencilSquare} /> : <Icon as={BsCheck2Circle} />}
            >
              {
                isDisabled ? 'Edit' : 'Save'
              }
            </Button>
          </Form>
        )
      }
    </Formik>
  )
}

export default PersonalDetailsForm
