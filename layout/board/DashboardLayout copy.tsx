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
import Sidebar, { SidebarItem } from '../sidebar/sidebar copy 2'

interface Props {
  children: ReactNode
}

export const DashboardLayout: FC<Props> = ({ children }) => {
  const { pathname } = useRouter()
  const { status } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false);


 
  return (
  
      
    <div className="flex">
    {status === 'authenticated' && (
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}  >
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
          <SidebarItem
            icon={<TbFiles size={25} />}
            text="Archivos"
            urlPath={`/archivos`}
            active={pathname === '/archivos'}
          />
           <SidebarItem
            icon={<TbUserDollar size={25} />}
            text="Vendedores"
            urlPath={`/vendedores`}
            active={pathname === '/vendedores'}
          />
           <SidebarItem
            icon={<TbFileInvoice size={25} />}
            text="Facturas"
            urlPath={`/facturas`}
            active={pathname === '/facturas'}
          />
          
        </Sidebar>

        
         )}
     
        
   
    
   
      

    <div className="w-full">
        {status === 'authenticated' && <NavbarUser onMenuButtonClick={() => setSidebarOpen((prev) => !prev)}/>}
         {children}
         </div>
        </div>

  )}