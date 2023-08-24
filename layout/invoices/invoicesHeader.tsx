import {
  Avatar,
  AvatarGroup,
  Button,
  CircularProgress,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FC, FormEventHandler, useState } from 'react'
import { TbSearch, TbTrashFilled } from 'react-icons/tb'
import second from '../../public/assets/logo.png'
import valualApi from '@/apis/valualApi'
import { contactsColumnsModal } from '@/global/contacts/contactsColumnsModal'
import { RenderCellInvoicesContactsModal } from './RenderCellInvoicesContactsModal'

import { InvoicesList } from '../../interfaces/invoices/invoicesList'
import { ContactsList } from '../../interfaces/contacts/contactsList'

interface Props {
  invoices: InvoicesList[]
  apikey: string | undefined
  companyId: string | undefined
  contactId: string | undefined
  contactName: string | undefined
}

export const InvoicesHeadersLayout: FC<Props> = ({
  invoices,
  apikey,
  companyId,
  contactId,
  contactName
}) => {
  const { push } = useRouter()
  const [searchNumber, setSearchNumber] = useState('')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const limitAvatar = 5

  const [contactList, setContactList] = useState<ContactsList[]>([])
  const [isLoadingModal, setIsLoadingModal] = useState(true)
  const [contactSearch, setContactSearch] = useState({
    id: contactId === undefined || contactId === '' ? '' : contactId,
    name: contactName === undefined || contactName === '' ? '' : contactName
  })
  const [searchContact, setSearchContact] = useState('')

  const handleClean = () => {
    setSearchNumber('')
    setContactSearch({ id: '', name: '' })
    setSearchContact('')

    push(`facturas/?companyId=${companyId}&apikey=${apikey}&page=0`)
  }

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchNumber(e.target.value)
  }

  const handleSubmitContact: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    setIsLoadingModal(true)

    valualApi
      .get<ContactsList[]>(
        `/contacts/?companyId=${companyId}&page=0&apikey=${apikey}&name=${searchContact}`
      )
      .then(response => {
        if (response.status === 200) {
          setContactList(response.data)
          setIsLoadingModal(false)
        }
      })
      .catch(error => {
        console.log(error)
      })
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
            <Input
              aria-label="Buscar Tercero"
              readOnly={true}
              placeholder="Buscar tercero"
              onClick={onOpen}
              value={contactSearch.name}
              startContent={<TbSearch />}
              style={{ cursor: 'pointer' }}
              size="md"
            />
            <Modal
              closeButton
              size="5xl"
              scrollBehavior="inside"
              backdrop="blur"
              style={{ width: '1000px' }}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <ModalContent>
                {onClose => {
                  if (contactList.length === 0) {
                    valualApi
                      .get<ContactsList[]>(
                        `/contacts/?companyId=${companyId}&page=0&apikey=${apikey}&name=`
                      )
                      .then(response => {
                        if (response.status === 200) {
                          setContactList(response.data)
                          setIsLoadingModal(false)
                        }
                      })
                      .catch(error => {
                        console.log(error)
                      })
                  }
                  return (
                    <>
                      <ModalHeader>
                        <div className="container">
                          <h2
                            id="modal-title"
                            className="flex justify-center py-5 text-3xl font-bold"
                          >
                            Listado de terceros
                          </h2>
                          <Spacer y={1} />
                          <form onSubmit={handleSubmitContact}>
                            <Input
                              aria-label="Buscar Tercero"
                              placeholder="Buscar Tercero"
                              value={searchContact}
                              width="100%"
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setSearchContact(e.target.value)
                              }
                              startContent={<TbSearch />}
                              size="md"
                            />
                          </form>
                        </div>
                      </ModalHeader>
                      <ModalBody>
                        {isLoadingModal ? (
                          <div
                            className="container"
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignContent: 'center',
                              alignItems: 'center',
                              height: '100%'
                            }}
                          >
                            <CircularProgress size="lg" color={'warning'} />
                          </div>
                        ) : (
                          <Table
                            aria-label="Lista de terceros"
                            style={{ height: 'auto', minWidth: '100%' }}
                            isStriped
                            shadow="none"
                          >
                            <TableHeader columns={contactsColumnsModal}>
                              {column => (
                                <TableColumn key={column.uid} align="start">
                                  {column.name}
                                </TableColumn>
                              )}
                            </TableHeader>
                            <TableBody
                              emptyContent="No hay datos por mostrar."
                              items={contactList}
                            >
                              {item => (
                                <TableRow key={item.id}>
                                  {columnKey => (
                                    <TableCell>
                                      <RenderCellInvoicesContactsModal
                                        contact={item}
                                        columnKey={columnKey}
                                        searchNumber={searchNumber}
                                        urlPath="/facturas"
                                        closeHandler={onClose}
                                        setContactSearch={setContactSearch}
                                      />
                                    </TableCell>
                                  )}
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        )}
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          style={{ width: 'auto' }}
                          variant={'flat'}
                          color="danger"
                          onPress={onClose}
                        >
                          Cerrar
                        </Button>
                      </ModalFooter>
                    </>
                  )
                }}
              </ModalContent>
            </Modal>
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
