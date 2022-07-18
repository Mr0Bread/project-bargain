import {
  useColorMode,
  Button,
  Icon,
} from '@chakra-ui/react'
import type { FC } from 'react'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'

const ColorModeSwitch: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button
      variant="ghost"
      onClick={toggleColorMode}
    >
      <Icon
        as={colorMode === 'light' ? BsFillMoonFill : BsFillSunFill}
      />
    </Button>
  )
}

export default ColorModeSwitch
