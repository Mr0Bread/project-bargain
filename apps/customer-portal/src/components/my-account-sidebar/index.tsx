import type { FC } from 'react'
import { useRouter } from 'next/router'
import { BsPersonFill, BsCardList, BsGearFill } from 'react-icons/bs'
import { BiExit } from 'react-icons/bi'
import Link from 'next/link'
import {
  Box,
  VStack,
  Icon,
  Center,
  Button,
  useBoolean,
} from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'
import { gql, useMutation } from '@apollo/client'
import { ALL_ROUTES } from 'Utils/Constants'
import { useDispatch } from 'Store'
import { setCustomerState } from 'Store/slices/customer.slice'

const MyAccountSidebar: FC<BoxProps> = (props) => {
  const signOutMutation = gql`
    mutation Mutation {
      signOut
    }
  `

  const { asPath, push } = useRouter()
  const [signOut] = useMutation<{ signOut: boolean }>(signOutMutation)
  const [isLoading, { on: setLoadingOn, off: setLoadingOff }] = useBoolean(false)
  const dispatch = useDispatch()

  return (
    <Box
      {...props}
    >
      <VStack
        spacing={10}
      >
        <Box
          w="100%"
          mt={20}
        >
          <Center>
            <Icon
              as={BsPersonFill}
              fontSize="5xl"
            />
          </Center>
        </Box>
        <Box>
          <VStack
            spacing={4}
          >
            <Link
              passHref
              href="/my-account/personal-details"
            >
              <Button
                variant="ghost"
                leftIcon={<Icon fontSize="2xl" as={BsPersonFill} />}
                w="100%"
                justifyContent="flex-start"
                isActive={asPath === '/my-account/personal-details'}
              >
                Personal Details
              </Button>
            </Link>
            <Link
              passHref
              href="/my-account/applications"
            >
              <Button
                variant="ghost"
                leftIcon={<Icon fontSize="2xl" as={BsCardList} />}
                w="100%"
                justifyContent="flex-start"
                isActive={asPath === '/my-account/applications'}
              >
                Applications
              </Button>
            </Link>
            <Link
              passHref
              href="/my-account/settings"
            >
              <Button
                variant="ghost"
                leftIcon={<Icon fontSize="2xl" as={BsGearFill} />}
                w="100%"
                justifyContent="flex-start"
                isActive={asPath === '/my-account/settings'}
              >
                Settings
              </Button>
            </Link>
            <Button
              leftIcon={<Icon fontSize="2xl" as={BiExit} />}
              w="100%"
              justifyContent="flex-start"
              colorScheme="red"
              onClick={() => {
                setLoadingOn()

                signOut()
                  .then(({
                    data: {
                      signOut
                    },
                  }) => {
                    if (signOut) {
                      dispatch(
                        setCustomerState({
                          isSignedIn: false,
                        }),
                      )

                      push(ALL_ROUTES.HOME)
                    }
                  })
                  .catch()
                  .finally(
                    () => setLoadingOff(),
                  )
              }}
              disabled={isLoading}
              isLoading={isLoading}
            >
                Log out
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}

export default MyAccountSidebar
