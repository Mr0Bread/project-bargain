import type { NextPage, GetStaticProps } from 'next'
import {
  Center,
  Box,
  SimpleGrid,
  Divider,
  Button,
  VStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home: NextPage<{
  categories: {
    Href: string;
    Title: string;
    children: {
      FullHref: string;
      Href: string;
      Title: string;
    }[]
  }[]
}> = ({ categories }) => {
  const cardBg = useColorModeValue('teal.300', 'cyan.900')
  const buttonHoverBg = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')

  return (
    <Center>
      <SimpleGrid
        columns={{
          sm: 2,
          md: 4,
        }}
        spacing={4}
      >
        {
          categories
            .map(({ Href: href, Title, children }) => (
              <Box
                shadow="md"
                py={4}
                borderRadius="base"
                key={href}
                bg={cardBg}
              >
                <Center
                  px={4}
                >
                  <Link
                    passHref
                    href={`/category${href}`}
                  >
                    <Button
                      variant="ghost"
                      rightIcon={<Icon as={FaChevronRight} />}
                      w="100%"
                      justifyContent="space-between"
                      fontSize="2xl"
                      _hover={{
                        bgColor: buttonHoverBg,
                      }}
                    >
                      {Title}
                    </Button>
                  </Link>
                </Center>
                <Divider
                  my={4}
                />
                <VStack
                  px={4}
                  alignItems="flex-start"
                >
                  {
                    children
                      .map(({
                        FullHref,
                        Title: ChildTitle,
                      }) => (
                        <Link
                          passHref
                          href={`/category${FullHref}`}
                          key={FullHref}
                        >
                          <Button
                            variant="ghost"
                            w="100%"
                            justifyContent="space-between"
                            rightIcon={<Icon as={FaChevronRight} />}
                            _hover={{
                              bgColor: buttonHoverBg,
                            }}
                          >
                            {ChildTitle}
                          </Button>
                        </Link>
                      ))
                  }
                </VStack>
              </Box>
            ))
        }
      </SimpleGrid>
    </Center>
  )
}

// const homepageCategoriesQuery = gql`
//     query Query {
//     homepageCategories {
//       Href
//       Title
//       children {
//         FullHref
//         Href
//         Title
//       }
//     }
//   }
// `

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // const {
  //   data: {
  //     homepageCategories: categories,
  //   },
  // } = await client.query({
  //   query: homepageCategoriesQuery,
  //   fetchPolicy: 'network-only',
  // })

  return {
    props: {
      categories: [],
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

export default Home
