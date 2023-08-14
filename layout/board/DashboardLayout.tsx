import React, { FC, ReactNode, useEffect } from 'react'
import {
  TbBuilding,
  TbNumber,
  TbShoppingBag,
  TbUsers
} from 'react-icons/tb'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { NavbarUser } from '../../components/navbar/Navbar'
import { Sidebar, SidebarItem } from '../sidebar/sidebar'
import { BsBank } from 'react-icons/bs'
import { MdWarehouse } from 'react-icons/md'

interface Props {
  children: ReactNode
}

export const DashboardLayout: FC<Props> = ({ children }) => {
  const { pathname } = useRouter()
  const { status } = useSession()

 
  return (
    <div className="flex">
      {status === 'authenticated' && (
        <Sidebar>
          <SidebarItem
            icon={<TbShoppingBag size={25} />}
            text="Productos"
            urlPath={`/catalogo`}
            active={pathname===('/catalogo')}
            
          />
          
          <SidebarItem
            icon={<TbUsers size={25} />}
            text="Clientes"
            urlPath={`/contactos`}
            active={pathname === '/contactos'}
          />
          <SidebarItem
            icon={<TbNumber size={25} />}
            text="Numeracion"
            urlPath={`/numeracion`}
            active={pathname === '/numeracion'}
          />
           <SidebarItem
            icon={<MdWarehouse size={25} />}
            text="Almacences"
            urlPath={`/almacenes`}
            active={pathname === '/almacenes'}
          />
           <SidebarItem
            icon={<BsBank size={25} />}
            text="Bancos"
            urlPath={`/bancos`}
            active={pathname === '/bancos'}
          />
        </Sidebar>
      )}
      <div className="w-full">
        {status === 'authenticated' && <NavbarUser />}
        {children}
      </div>
    </div>
  )
}