import React, { FC, ReactNode, useState } from 'react'
import {
  TbNumber,
  TbShoppingBag,
  TbUsers,
  TbFiles,
  TbUserDollar,
  TbFileInvoice,
  TbInbox
} from 'react-icons/tb'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { NavbarUser } from '../../components/navbar/Navbar'
import { BsBank } from 'react-icons/bs'
import { MdWarehouse } from 'react-icons/md'
import { Divider } from '@nextui-org/react'
import { SidebarItem, Sidebar } from '../sidebar/Sidebar'

interface Props {
  children: ReactNode
}

export const DashboardLayout: FC<Props> = ({ children }) => {
  const { pathname, query } = useRouter()
  const { status } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dropdownList = [
    <SidebarItem
      key={1}
      icon={<TbNumber size={25} />}
      text="Numeracion"
      urlPath={`/numeracion?apikey=$apikey&companyId=$companyId&page=0`}
      active={pathname.includes('/numeracion') && query.type === '1'}
    />,
    <SidebarItem
      key={2}
      icon={<BsBank size={25} />}
      text="Bancos"
      urlPath={`/bancos?apikey=$apikey&companyId=$companyId&page=0`}
      active={pathname.includes('/bancos') && query.type === '2'}
    />,
    <SidebarItem
      key={3}
      icon={<MdWarehouse size={25} />}
      text="Almacences"
      urlPath={`/almacenes?apikey=$apikey&companyId=$companyId&page=0`}
      active={pathname.includes('/almacenes') && query.type === '3'}
    />,
    <SidebarItem
      key={0}
      icon={<TbUserDollar size={25} />}
      text="Vendedores"
      urlPath={`/vendedores?apikey=$apikey&companyId=$companyId&page=0`}
      active={pathname.includes('/vendedores') && query.type === '0'}
    />
  ]

  return (
    <div className="flex">
      {status === 'authenticated' && (
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
          <SidebarItem
            icon={<TbInbox size={25} />}
            text="Reportes"
            dropdown
            sidebarList={dropdownList}
          />
          <Divider />
          <SidebarItem
            icon={<TbShoppingBag size={25} />}
            text="Productos"
            urlPath={`/catalogo?apikey=$apikey&companyId=$companyId&page=0`}
            active={pathname === '/catalogo'}
          />
          <SidebarItem
            icon={<TbUsers size={25} />}
            text="Clientes"
            urlPath={`/contactos?apikey=$apikey&companyId=$companyId&page=0`}
            active={pathname === '/contactos'}
          />
          <SidebarItem
            icon={<TbFiles size={25} />}
            text="Archivos"
            urlPath={`/archivos?apikey=$apikey&companyId=$companyId&page=0`}
            active={pathname === '/archivos'}
          />
          <SidebarItem
            icon={<TbFileInvoice size={25} />}
            text="Facturas"
            urlPath={`/facturas?apikey=$apikey&companyId=$companyId&page=0`}
            active={pathname === '/facturas'}
          />
        </Sidebar>
      )}

      <div className="w-full">
        {status === 'authenticated' && (
          <NavbarUser onMenuButtonClick={() => setSidebarOpen(prev => !prev)} />
        )}
        {children}
      </div>
    </div>
  )
}
