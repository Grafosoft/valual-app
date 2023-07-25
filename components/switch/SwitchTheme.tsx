import { Switch } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'
import React, { FC, useEffect, useState } from 'react'
import { TbMoonFilled, TbSunFilled } from 'react-icons/tb'

export const SwitchTheme: FC = () => {
  const { theme, setTheme } = useNextTheme()
  const [isactive, setisactive] = useState() 
  
  // useEffect(() => {
  //   setisactive(localStorage.getItem('blanco') || '')
  
  
  // }, [])
  
  

  const handleClick=()=> {

   
    if(theme === 'dark' ){
      localStorage.setItem('blanco','false')
      setTheme('light')
    }else{
      localStorage.setItem('blanco',"true")
  setTheme('dark')
    
    }
  }


  return (
    <Switch
    isSelected={isactive} 
    onChange={handleClick}
      size={'lg'}
      color={'primary'}
     endContent={<TbSunFilled  />}
     startContent={<TbMoonFilled  />}

    />
  )
}