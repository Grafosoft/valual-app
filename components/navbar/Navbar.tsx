import React from 'react'
import { Dropdown, Image, Spacer, User, DropdownTrigger, DropdownMenu, DropdownItem, Link } from '@nextui-org/react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SwitchTheme } from '../switch/SwitchTheme'
import {
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
  } from "@nextui-org/navbar";

export const NavbarLogin = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()



  return (
    <Navbar  isBordered  > 
      <NavbarBrand>
        {status === 'authenticated' && (
          <>
            
            <Spacer x={1} />
          </>
        )}
        <Image
          onClick={() => push(`/catalogo?apikey=${localStorage.getItem('apikey')}&companyId=${localStorage.getItem('companyId')}`
                  
                 
          )
        }
          src="/assets/valualfon.png"
          alt="Logo"
          style={{ cursor: 'pointer' ,
        width:"250px"}}
          
          
        />
      </NavbarBrand>
      
      {status === 'authenticated' && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link
              color="foreground"
              onClick={() =>
                push(
                  `/catalogo?apikey=${localStorage.getItem(
                    'apikey'
                  )}&companyId=${localStorage.getItem('companyId')}`
                  
                 
                )
              }
            >
              Productos
              
            </Link>
          </NavbarItem>
            <NavbarItem>
            <Link
              color="foreground"
              onClick={() =>
                push(
                  `/contactos?apikey=${localStorage.getItem(
                    'apikey'
                  )}&companyId=${localStorage.getItem('companyId')}`
                  
                 
                )
              }
            >
              Clientes
              
            </Link>
          </NavbarItem>
          
          </NavbarContent>
      
          
          )}

            

      <Spacer x={10} />
      <NavbarContent justify="end" >
        <SwitchTheme />
        {status === 'authenticated' && (
          <Dropdown placement="bottom-end">
            <NavbarItem>
              <DropdownTrigger>
                <User
                  
                
                 avatarProps={{
                    radius: "lg",
                    size:'md',
                    src: session?.user.image || '',
                    name: session?.user.name
                 }}
                  as="button"          
                  name={`${session?.user.name}`}
                  description={`${session?.user.email}`}
                />
              </DropdownTrigger>
            </NavbarItem>
            < DropdownMenu
              aria-label="Menú del usuario"
              color="warning"
              onAction={actionKey => {
                if (actionKey === 'logout') {
                  localStorage.removeItem('apikey')
                  localStorage.removeItem('companyId')
                  signOut()
                }
              }}
            >
              <DropdownItem key={'logout'} color="primary">
                Cerrar sesión
              </DropdownItem >
            </ DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </Navbar> 
  )
}
