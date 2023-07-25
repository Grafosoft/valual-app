import { Switch } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'
import React, { FC } from 'react'
import { TbMoonFilled, TbSunFilled } from 'react-icons/tb'

export const SwitchTheme: FC = () => {
  const { theme, setTheme } = useNextTheme()
  

  return (
    <Switch
      onChange={() => (theme === 'dark' ? setTheme('light'): setTheme('dark') )}
      size={'lg'}
      color={'primary'}
     endContent={<TbSunFilled  />}
     startContent={<TbMoonFilled  />}

    />
  )
}
