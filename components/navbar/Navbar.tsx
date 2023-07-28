import React from 'react'
import { Dropdown, Image, Spacer, User, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
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
 
    <Navbar   isBordered  > 
  
      <NavbarBrand>
        {status === 'authenticated' && (
          <>
            
            <Spacer x={1} />
          </>
        )}
        <Image
          onClick={() => push(`/catalogo?apikey=${session?.user.apikey}&companyId=${session?.user.companyId} `)}
          src="/assets/valualfon.png"
          alt="Logo"
          style={{ cursor: 'pointer' ,
        width:"250px"}}
          
          
        />
      </NavbarBrand>
      {/* {status === 'authenticated' && (
        <NavbarContent
          activeColor="warning"
          variant="highlight"
          hideIn={'md'}
          enableCursorHighlight
        >
          <Dropdown isBordered>
            <Dropdown.Button
              auto
              light
              css={{
                dflex: 'center'
              }}
              ripple={false}
            >
              <Navbar.Link>CRM</Navbar.Link>
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="ACME features"
              css={{
                $$dropdownMenuWidth: '340px',
                $$dropdownItemHeight: '70px',
                '& .nextui-dropdown-item': {
                  py: '$4',
                  // dropdown item left icon
                  svg: {
                    color: '$warning',
                    mr: '$4'
                  },
                  // dropdown item title
                  '& .nextui-dropdown-item-content': {
                    w: '100%',
                    fontWeight: '$semibold'
                  }
                }
              }}
            >
              <Dropdown.Item
                key={'Actividad'}
                showFullDescription
                description="lorem ipsum"
                icon={<TbAccessible size={25} />}
              >
                Actividad
              </Dropdown.Item>
              <Dropdown.Item
                key={'Soporte'}
                showFullDescription
                description="lorem ipsum"
                icon={<TbShieldHalf size={25} />}
              >
                Soporte
              </Dropdown.Item>
              <Dropdown.Item
                key={'Solicitud'}
                showFullDescription
                description="lorem ipsum"
                icon={<TbFlag size={25} />}
              >
                Solicitud
              </Dropdown.Item>
              <Dropdown.Item
                key={'Mercadeo'}
                showFullDescription
                description="lorem ipsum"
                icon={<TbShoppingBag size={25} />}
              >
                Mercadeo
              </Dropdown.Item>
              <Dropdown.Item
                key={'Servicio al cliente'}
                showFullDescription
                description="lorem ipsum"
                icon={<TbUser size={25} />}
              >
                Historial del cliente
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Navbar.Link
            onClick={() =>
              push(
                `/facturacion?apikey=${localStorage.getItem(
                  'apikey'
                )}&companyId=${localStorage.getItem('companyId')}`
              )
            }
            isActive={pathname === '/facturacion'}
          >
            Facturación
          </Navbar.Link>
          <Navbar.Link
            onClick={() => push('/suscripcion')}
            isActive={pathname === '/suscripcion'}
          >
            Suscripción
          </Navbar.Link>
          <Navbar.Link
            onClick={() =>
              push(
                `/clientes?apikey=${localStorage.getItem(
                  'apikey'
                )}&companyId=${localStorage.getItem('companyId')}`
              )
            }
            isActive={pathname === '/clientes'}
          >
            Clientes
          </Navbar.Link>
          <Navbar.Link
            onClick={() => push(`/respuestas`)}
            isActive={pathname === '/respuestas'}
          >
            DIAN
          </Navbar.Link>
        </NavbarContent>
      )}
      {status === 'authenticated' && (
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem key={index} activeColor={'warning'}>
              <Link
                color={'inherit'}
                css={{ minWidth: '100%', fontSize: '20px' }}
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      )} */}
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
