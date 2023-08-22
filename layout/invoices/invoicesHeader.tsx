import { Avatar, AvatarGroup, Button, Input, Spacer } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FC, FormEventHandler, useState } from 'react'
import { TbSearch, TbTrashFilled } from 'react-icons/tb'
import second from '../../public/assets/logo.png'
import { InvoicesList } from '../../interfaces/invoices/invoicesList'

interface Props {
  invoices: InvoicesList[]
  apikey: string | undefined
  companyId: string | undefined
}

export const InvoicesHeadersLayout: FC<Props> = ({
  invoices,
  apikey,
  companyId
}) => {
  const { push } = useRouter()
  const [searchContact, setSearchContact] = useState('')
  const [searchNumber, setSearchNumber] = useState('')

  const limitAvatar = 5

  const handleClean = () => {
    setSearchContact('')
    setSearchNumber('')
    push(`facturas/?companyId=${companyId}&apikey=${apikey}&page=0`)
  }

  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchContact(e.target.value)
  }

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchNumber(e.target.value)
  }
  const handleSubmitcontact: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    push(
      `/facturas?apikey=${apikey}&companyId=${companyId}${
        searchContact !== '' ? `&contactId=${searchContact}` : ''
      }`
    )
  }

  const handleSubmitnumber: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    push(
      `/facturas?apikey=${apikey}&companyId=${companyId}${
        searchNumber !== '' ? `&number=${searchNumber}` : ''
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
        <Avatar src={second.src} style={{ width: '75px', height: '75px' }} />
        <h1 className="text-5xl font-bold">Facturacion</h1>
        <AvatarGroup
          isBordered
          max={5}
          total={
            invoices.length - limitAvatar > 5
              ? invoices.length - limitAvatar
              : undefined
          }
          renderCount={(count: number) => (
            <p className="text-small text-foreground ml-2">+{count}</p>
          )}
        >
          {invoices.map(
            (element, index) =>
              index < limitAvatar && (
                <Avatar
                  key={index}
                  size={'md'}
                  radius="lg"
                  src=""
                  alt={element.contact.name + ' ' + element.contact.name}
                  name={element.contact.name + ' ' + element.contact.name}
                />
              )
          )}
        </AvatarGroup>
      </div>

      <div className="container m-auto pb-10">
        <div className="grid grid-cols-12 justify-between gap-10 ">
          <div className="grid col-span-5 flex-col">
            <form onSubmit={handleSubmitnumber}>
              <Input
                aria-label="Buscar por Numero de factura"
                placeholder="Buscar por Numero de factura"
                onChange={handleNumberChange}
                value={searchNumber}
                startContent={<TbSearch />}
                size="md"
              />
            </form>
          </div>
          <div className="grid col-span-5 flex-col">
            <form onSubmit={handleSubmitcontact}>
              <Input
                aria-label="Buscar por Contacto"
                placeholder="Buscar por Contacto"
                onChange={handleContactChange}
                value={searchContact}
                startContent={<TbSearch />}
                size="md"
              />
            </form>
          </div>

          <div className="flex col-span-2 flex-row justify-end">
            <Button onPress={handleClean} variant={'flat'} color="danger">
              <TbTrashFilled size={20} /> <Spacer x={1} /> Limpiar filtros
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
