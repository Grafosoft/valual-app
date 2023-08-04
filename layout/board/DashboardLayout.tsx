import React, { FC, ReactNode, useEffect } from 'react'
import {
  TbCalendarDollar,
  TbNumber,
  TbShoppingBag,
  TbUsers
} from 'react-icons/tb'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { NavbarUser } from '../../components/navbar/Navbar'
import { Sidebar, SidebarItem } from '../sidebar/sidebar'

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
            icon={<TbCalendarDollar size={25} />}
            text="Suscripción"
            urlPath={`/suscripcion`}
            active={
              pathname.includes('/suscripcion') || pathname.includes('/pagos')
            }
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
        </Sidebar>
      )}
      <div className="w-full">
        {status === 'authenticated' && <NavbarUser />}
        {children}
      </div>
    </div>
  )
}