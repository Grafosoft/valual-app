import React from 'react'
import { signOut } from 'next-auth/react'
import { Image } from '@nextui-org/react'
import { SwitchTheme } from '../switch/SwitchTheme'
import { TbBellFilled, TbLogout, TbSettingsFilled } from 'react-icons/tb'
import { useRouter } from 'next/router'
import { CgFormatJustify } from 'react-icons/cg'

type Props = {
  onMenuButtonClick(): void;
};

export const NavbarUser = (props: Props) => {
  const { push } = useRouter()
  

  return (
    
    <div className="flex w-full p-5 justify-between">
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <CgFormatJustify className="h-6 w-6" />
      </button>
      
      <Image 
     
      onClick={() => push(`/catalogo?apikey=${localStorage.getItem('apikey')}&companyId=${localStorage.getItem('companyId')}`   
      )
    }
      src="/assets/logo-svg.svg" className=" cursor-pointer h-10" alt="Valual Logo" />
      <div className="flex items-center">
        <SwitchTheme />
        <TbBellFilled
          size={25}
          className="cursor-pointer ml-12 mr-3"
          style={{ color: 'rgb(156 163 175)' }}
        />
        <TbSettingsFilled
          size={25}
          className="cursor-pointer mx-3"
          style={{ color: 'rgb(156 163 175)' }}
          onClick={() => push( `/compania/${localStorage.getItem('companyId')}?apikey=${localStorage.getItem(
            'apikey'
          )}`  )
        }
        />
        <TbLogout
          size={25}
          className="cursor-pointer mx-3"
          color="#f31260"
          onClick={() => {
            signOut()
            localStorage.removeItem('apikey')
            localStorage.removeItem('companyId')
          }}
        />
      </div>
    </div>
  )
}