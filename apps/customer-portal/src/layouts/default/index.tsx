import { FC, PropsWithChildren, useEffect } from 'react'
import {
  Box,
  Flex,
  Container,
  Button,
  Icon,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider,
  useBoolean,
} from '@chakra-ui/react'
import { BsPersonFill } from 'react-icons/bs'
import { FaTrademark } from 'react-icons/fa'
import Link from 'next/link'
import SingInForm, { FormValues } from 'Forms/sign-in'
import LanguageSwitch from 'Components/language-switch'
import ColorModeSwitch from 'Components/colormode-switch'
import type { ContainerProps } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'Store'
import { selectCustomer, setCustomerState } from 'Store/slices/customer.slice'
import { ALL_ROUTES } from 'Utils/Constants'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { isSignedInQuery } from "GraphQl/queries";
import { refreshTokenMutation, signInMutation } from "GraphQl/mutations";

export interface DefaultLayoutProps {
  containerProps?: ContainerProps;
}

const DefaultLayout: FC<PropsWithChildren<DefaultLayoutProps>> = ({ children, containerProps }) => {
  const router = useRouter()
  const { isSignedIn } = useSelector(selectCustomer)
  const dispatch = useDispatch()
  const [isLoading, { on: setLoadingOn, off: setLoadingOff }] = useBoolean(false)

  const [getIsSignedIn, { data }] = useLazyQuery<{ isSignedIn: boolean }>(isSignedInQuery)
  const [signIn] = useMutation<{ signIn: { isSuccess: boolean } }>(signInMutation)
  const [refreshToken] = useMutation<{ refreshAccessToken: boolean }>(refreshTokenMutation)

  const onSubmit = (values: FormValues) => {
    setLoadingOn()

    signIn({
      variables: {
        email: values.email,
        password: values.password,
      },
    })
      .then(({
        data: {
          signIn: {
            isSuccess
          }
        },
      }) => {
        if (isSuccess) {
          router.push(ALL_ROUTES.MY_ACCOUNT.PERSONAL_DETAILS)
        }
      })
      .finally(() => setLoadingOff())
  }

  useEffect(() => {
    getIsSignedIn()
  }, [getIsSignedIn])

  useEffect(() => {
    if (!data) return

    if (!data.isSignedIn) {
      refreshToken()
        .then((result) => {
          const { data: { refreshAccessToken } } = result

          if (!refreshAccessToken) {
            return
          }

          dispatch(setCustomerState({ isSignedIn: true }))
        })
        .catch((error) => console.error(error))
    }

    dispatch(
      setCustomerState({
        isSignedIn: data.isSignedIn,
      }),
    )
  }, [data, dispatch, refreshToken])

  return (
    <Box
      minH="100vh"
    >
      <Box
        py={4}
        shadow="md"
        mb={6}
      >
        <Container
          maxW={{
            lg: 1400,
          }}
        >
          <Flex>
            <Box
              mr={8}
              _hover={{
                cursor: 'pointer',
              }}
            >
              <Link
                passHref
                href="/"
              >
                <Icon
                  as={FaTrademark}
                  fontSize="4xl"
                />
              </Link>
            </Box>
            <Flex
              gap={4}
              w="100%"
            >
              <Spacer />
              <LanguageSwitch />
              <ColorModeSwitch />
              {
                isSignedIn
                  ? (
                    <Link
                      passHref
                      href={ALL_ROUTES.MY_ACCOUNT.PERSONAL_DETAILS}
                    >
                      <Button
                        variant="ghost"
                      >
                        <Icon
                          as={BsPersonFill}
                          fontSize="3xl"
                        />
                      </Button>
                    </Link>
                  )
                  : (
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          variant="ghost"
                        >
                          <Icon
                            as={BsPersonFill}
                            fontSize="3xl"
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Box>
                          <SingInForm
                            onSubmit={onSubmit}
                            isLoading={isLoading}
                            boxProps={{
                              mt: 4,
                              px: 4,
                            }}
                            initialValues={{
                              email: '',
                              password: '',
                            }}
                          />
                          <Divider
                            my={4}
                          />
                          <Box
                            px={4}
                          >
                            <Link
                              passHref
                              href="/signup"
                            >
                              <Button
                                mb={4}
                                colorScheme="teal"
                                w="100%"
                              >
                                Sign up
                              </Button>
                            </Link>
                          </Box>
                        </Box>
                      </PopoverContent>
                    </Popover>
                  )
              }
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Container
        maxW={{
          lg: 1400,
        }}
        {...containerProps}
      >
        {children}
      </Container>
    </Box>
  )
}

export default DefaultLayout
