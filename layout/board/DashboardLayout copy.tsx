import React, { FC, ReactNode, useState } from 'react'
import {
  TbNumber,
  TbShoppingBag,
  TbUsers,
  TbFiles,
  TbUserDollar,
  TbFileInvoice
} from 'react-icons/tb'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { NavbarUser } from '../../components/navbar/Navbar'

import { BsBank } from 'react-icons/bs'
import { MdWarehouse } from 'react-icons/md'
import Sidebar from '../sidebar/sidebar copy 2'

interface Props {
  children: ReactNode
}

export const DashboardLayout: FC<Props> = ({ children }) => {
  const { pathname } = useRouter()
  const { status } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false);


 
  return (
  
      <div className="grid min-h-screen grid-rows-header bg-zinc-100">

        {status === 'authenticated' && <NavbarUser onMenuButtonClick={() => setSidebarOpen((prev) => !prev)}/>}
      


     
     <div className="  ">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />


        {children}
      
      

    </div>
     </div>

  
  )
}