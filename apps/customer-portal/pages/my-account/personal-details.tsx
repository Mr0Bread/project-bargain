import type { ReactElement } from 'react'
import MyAccountLayout from 'Layouts/my-account'
import {
  Heading,
  Divider,
  Box,
  Button,
  Icon,
  VStack,
  useBoolean,
} from '@chakra-ui/react'
import PersonalDetailsForm from 'Forms/personal-details'
import { BsPencilSquare } from 'react-icons/bs'
import ChangePasswordForm from 'Forms/change-password'
import type { NextPageWithLayout } from '../_app'

const PersonalDetails: NextPageWithLayout = () => {
  const [isChangingPassword, { on, off }] = useBoolean(false)

  return (
    <>
      <Box
        maxW="50%"
      >
        <PersonalDetailsForm />
      </Box>
      <Heading
        as="h3"
        size="md"
        mt={8}
      >
        Advanced
      </Heading>
      <Divider my={6} />
      <VStack
        alignItems="flex-start"
        maxW="250px"
        spacing={4}
      >
        {
          isChangingPassword
            ? (
              <ChangePasswordForm
                initialValues={{
                  currentPassword: '',
                  newPassword: '',
                }}
                onSubmit={() => off()}
                isLoading={false}
              />
            )
            : (
              <Button
                leftIcon={<Icon as={BsPencilSquare} />}
                w="100%"
                onClick={on}
              >
                Change Password
              </Button>
            )
        }
        <Button
          leftIcon={<Icon as={BsPencilSquare} />}
          w="100%"
        >
          Change Email
        </Button>
      </VStack>
    </>
  )
}

PersonalDetails.getLayout = (page: ReactElement) => (
  <MyAccountLayout title="Personal Details">
    {page}
  </MyAccountLayout>
)

export default PersonalDetails
