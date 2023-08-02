import { Avatar, AvatarGroup, Button, Input, Spacer } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FC, FormEventHandler, useState } from 'react'
import { TbSearch, TbTrashFilled } from 'react-icons/tb'
import { ContactsList } from '../../interfaces/contacts/contactsList'
import second from '../../public/assets/logo.png'

interface Props {
  contacts: ContactsList[]
  apikey: string | undefined
  companyId: string | undefined
}

export const ContactsHeadersLayout: FC<Props> = ({
  contacts,
  apikey,
  companyId
}) => {
  const { push } = useRouter()
  const [searchContact, setSearchContact] = useState('')

  const limitAvatar = 5

  const handleClean = () => {
    setSearchContact('')
    push(`contactos/?companyId=${companyId}&apikey=${apikey}&page=0`)
  }



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchContact(e.target.value)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    push(
      `/contactos?apikey=${apikey}&companyId=${companyId}${
        searchContact !== '' ? `&name=${searchContact}` : ''
      }`
    )

    
  }

  return (
    <>
      <div
        className="container py-10"
        style={{
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 'auto',
          alignItems: 'center'
        }}
      >
        <Avatar
        
        src={second.src}
        style={{ width: '75px', height: '75px' }}
      />
        <h1 className="text-5xl font-bold">Clientes</h1>
        <AvatarGroup
          isBordered
          max={5}
          total={
            contacts.length - limitAvatar > 5
              ? contacts.length - limitAvatar
              : undefined
          }
          renderCount={(count: number) => (
            <p className="text-small text-foreground ml-2">+{count}</p>
          )}
        >
          {contacts.map(
            (element, index) =>
              index < limitAvatar && (
                <Avatar
                  key={index}
                  size={'md'}
                  radius="lg"
                  src=""
                  alt={element.commercialName + ' ' + element.firstName}
                  name={element.commercialName + ' ' + element.firstName}
                />
              )
          )}
        </AvatarGroup>
      </div>
      <div className="container m-auto pb-10">
        <div className="grid grid-cols-12 justify-between">
          <div className="grid col-span-8 flex-col">
            <form onSubmit={handleSubmit} style={{ width: '60vw' }}>
              <Input
                aria-label="Buscar Cliente"
                placeholder="Buscar Cliente"
                type="search"
                startContent={<TbSearch />}
                onChange={handleChange}
                value={searchContact}
                width="100%"
                size="lg"
              />
            </form>
          </div>
          <div
            className="flex col-span-4 flex-row"
            style={{
              justifyContent: 'flex-end',
              alignContent: 'center',
              alignItems: 'flex-end'
            }}
          >
            <Button onPress={handleClean} variant={'flat'} color="danger">
              <TbTrashFilled size={20} /> <Spacer x={1} /> Limpiar filtros
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}