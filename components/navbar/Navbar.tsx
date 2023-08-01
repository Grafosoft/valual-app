import React from 'react'
import { Dropdown, Image, Spacer, User, DropdownTrigger, DropdownMenu, DropdownItem, Link, Button } from '@nextui-org/react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SwitchTheme } from '../switch/SwitchTheme'
import {
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenu,
    NavbarMenuItem
    
  } from "@nextui-org/navbar";
  import {
    BsChevronDown
  } from 'react-icons/bs'

export const NavbarLogin = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()
  const collapseItems = ['Opciones', 'Numeracion', 'Suscripción', 'Clientes']



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
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<BsChevronDown/>}
                size="lg"
                radius="md"
                variant="light"
              >
                
                  Opciones
                
              
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: 'gap-4'
              }}
            >
              <DropdownItem
                size="lg"
                key={'Numeracion'}
                onClick={() =>
                  push(
                    `/numeracion?apikey=${localStorage.getItem(
                      'apikey'
                    )}&companyId=${localStorage.getItem('companyId')}`
                  )
                }
              >  
              Numeracion
              </DropdownItem>
              </DropdownMenu>
    </Dropdown>
  </NavbarContent>
  )}
      
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
{status === 'authenticated' && (
        <NavbarMenu>
          {collapseItems.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link
                className="w-full"
                color={'warning'}
                style={{ minWidth: '100%', fontSize: '20px' }}
                href="#"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
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
