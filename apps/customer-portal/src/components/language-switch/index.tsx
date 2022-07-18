import type { FC } from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

const LanguageSwitch: FC = () => {
  const {
    locales, locale, push, pathname,
  } = useRouter()

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        textTransform="uppercase"
      >
        {locale}
      </MenuButton>
      <MenuList
        minW="unset"
        px={2}
      >
        {
          (locales as string[])
            .filter((e) => e !== locale)
            .map((languageOption) => (
              <MenuItem
                key={languageOption}
                onClick={() => push(pathname, pathname, { locale: languageOption })}
                borderRadius="base"
                textTransform="uppercase"
              >
                {languageOption}
              </MenuItem>
            ))
        }
      </MenuList>
    </Menu>
  )
}

export default LanguageSwitch
