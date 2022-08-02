import { gql } from '@apollo/client'
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { client } from 'src/graphql/client'
import {
  Box,
  Heading,
  Grid,
  GridItem,
  VStack,
  Flex,
  Icon,
  Button,
} from '@chakra-ui/react'
import type { Category } from 'Types/category'
import CategoryList from 'Components/category-list'
import { BsFillBookmarkFill } from 'react-icons/bs'

export interface CategoryPageProps {
  Title: string;
  view: Category['view'];
  categoryList?: Category[];
}

const CategoryPage: NextPage<CategoryPageProps> = ({
  Title,
  view,
  categoryList,
}) => {
  if (view === 'category_list' && categoryList) {
    return (
      <CategoryList
        Title={Title}
        categoryList={categoryList}
      />
    )
  }

  return (
    <Box>
      <Heading
        textTransform="uppercase"
        size="lg"
        mb={8}
        color="cyan.200"
      >
        Category Title
      </Heading>
      <Grid
        templateColumns="25% auto 15%"
        columnGap={10}
      >
        <GridItem>
          Filter Sidebar
        </GridItem>
        <GridItem>
          <VStack
            spacing={8}
          >
            <Box
              w="100%"
              shadow="md"
              p={4}
            >
              <Grid
                columnGap={4}
                templateColumns="25% auto"
              >
                <GridItem>
                  <Box
                    h="100%"
                    bgColor="cyan.900"
                  >
                    Image
                  </Box>
                </GridItem>
                <GridItem>
                  <Flex
                    direction="column"
                  >
                    <Flex
                      justifyContent="space-between"
                      alignItems="baseline"
                    >
                      <Heading
                        as="h4"
                        size="md"
                      >
                        Mercedes S500
                      </Heading>
                      <Button
                        variant="ghost"
                      >
                        <Icon
                          as={BsFillBookmarkFill}
                        />
                      </Button>
                    </Flex>
                    <Box>
                      Price
                    </Box>
                  </Flex>
                </GridItem>
              </Grid>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  )
}

export const getStaticProps: GetStaticProps<unknown, { slug: string[] }> = async (
  { params },
) => {
  if (!params) {
    return {
      props: {},
      revalidate: 10,
    }
  }

  const categoryQuery = gql`
    query Category($fullHref: [String!]!) {
      category(fullHref: $fullHref) {
        Title
        view
      }
    }
  `

  const {
    data: {
      category: {
        Title,
        view,
      },
    },
  } = await client.query<{
    category: {
      Title: string;
      view: Category['view'];
    }
  }>({
    query: categoryQuery,
    fetchPolicy: 'network-only',
    variables: {
      fullHref: params.slug.map((e) => `/${e}`),
    },
  })

  if (view === 'category_list') {
    const categoryListQuery = gql`
      query CategoryList($fullHref: [String!]!) {
        categoryList(fullHref: $fullHref) {
          Title
          fullHref
        }
      }
    `

    const {
      data: {
        categoryList,
      },
    } = await client.query<{
      categoryList: {
        Title: string;
        fullHref: string;
      }[]
    }>({
      query: categoryListQuery,
      fetchPolicy: 'network-only',
      variables: {
        fullHref: params.slug.map((e) => `/${e}`),
      },
    })

    return {
      props: {
        Title,
        categoryList,
        view,
      },
      revalidate: 10,
    }
  }

  return {
    props: {},
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string[] }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default CategoryPage
