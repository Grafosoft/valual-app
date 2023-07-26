import { Switch } from '@nextui-org/react'
import { useTheme  } from 'next-themes'
import React, { FC, useEffect, useState } from 'react'
import { TbMoonFilled, TbSunFilled } from 'react-icons/tb'

export const SwitchTheme: FC = () => {
  const { theme, setTheme } = useTheme()
  const [IsActiveTheme, setIsActiveTheme] = useState(false) 
  
  useEffect(() => {
    setIsActiveTheme(localStorage.getItem('IsActiveTheme') !== 'false')
  
  
  }, [])
  
  

  const handleChage=()=> {

   
    if(theme === 'dark' ){
     
      setTheme('light') 
      setIsActiveTheme(false)
      localStorage.setItem('IsActiveTheme','false')
    }else{
      setTheme('dark')
      setIsActiveTheme(true)
    localStorage.setItem('IsActiveTheme',"true")
    }
  }


  return (
    <Switch
    isSelected={IsActiveTheme} 
    onChange={handleChage}
      size={'lg'}
      color={'primary'}
     endContent={<TbSunFilled  />}
     startContent={<TbMoonFilled  />}

    />
  )
}