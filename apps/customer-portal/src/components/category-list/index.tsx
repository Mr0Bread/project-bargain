import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Input,
  Wrap,
  WrapItem,
  Button,
} from '@chakra-ui/react'
import Link from 'next/link'
import type { FC } from 'react'
import { Category } from 'Types/category'

export interface CategoryListProps {
  Title: string;
  categoryList: Category[];
}

const CategoryList: FC<CategoryListProps> = ({
  Title,
  categoryList,
}) => (
  <Box>
    <Heading
      textTransform="uppercase"
      size="lg"
      mb={8}
      color="cyan.200"
    >
      {Title}
    </Heading>
    <Accordion
      allowToggle
    >
      <AccordionItem
        border="none"
      >
        <AccordionButton
          ps={0}
          borderRadius="base"
        >
          <Heading
            as="h3"
            size="md"
            textTransform="uppercase"
            me={6}
          >
                        Filters
          </Heading>
          <AccordionIcon
            fontSize="3xl"
          />
        </AccordionButton>
        <AccordionPanel>
                    Filters
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Box
      mt={4}
    >
      <Input
        placeholder="Search for what you need"
        maxW={{
          lg: '360px',
        }}
      />
      <Wrap
        mt={5}
        spacing={3}
        direction="column"
      >
        {
          categoryList
            .map(({ fullHref: href, Title: title }) => (
              <WrapItem>
                <Link
                  passHref
                  href={href}
                >
                  <Button
                    variant="outline"
                  >
                    {title}
                    <Box
                      ms={2}
                      color="gray.500"
                    >
                      100
                    </Box>
                  </Button>
                </Link>
              </WrapItem>
            ))
        }
      </Wrap>
    </Box>
  </Box>
)

export default CategoryList
