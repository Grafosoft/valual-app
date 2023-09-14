import React, { FC, useEffect, useState } from 'react'
import { TbArrowBigRightLinesFilled, TbPencil } from 'react-icons/tb'
import { Chip, Spacer, User } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { ContactsList } from '../../interfaces/contacts/contactsList'

interface Props {
  contact: ContactsList
  columnKey: React.Key
}

export const RenderCellContacts: FC<Props> = ({ contact, columnKey }) => {
  const { push } = useRouter()

  let colorIcon = '#0072F5'

  const [apikey, setApikey] = useState('')
  useEffect(() => {
    setApikey(localStorage.getItem('apikey') || '')
  }, [])

  switch (columnKey) {
    case 'commercialName':
      return (
        <User
          avatarProps={{
            src: '',
            radius: 'md',
            name: contact.commercialName
          }}
          name={contact.commercialName}
          style={{ padding: 0 }}
          description={contact.type}
        />
      )
    case 'isActive':
      return (
        <Chip
          radius="sm"
          variant={'flat'}
          size="sm"
          color={contact.isActive ? 'success' : 'danger'}
        >
          {contact.isActive ? 'activo' : 'inactivo'}
        </Chip>
      )

    case 'identification':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {contact.identificationType.code} {contact.identification}
        </p>
      )
    case 'city':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {contact.city.name}
        </p>
      )
    case 'email':
      return (
        <div className="flex flex-col">
          <p className="font-medium lowercase" style={{ fontSize: '15px' }}>
            {contact.email}
          </p>
          <Spacer y={1} />
          <p className="text-bold text-tiny text-default-400">
            {contact.phone}
          </p>
        </div>
      )
    case 'details':
      return (
        <div className="flex">
        <TbPencil
          cursor={'pointer'}
          color={colorIcon}
          onClick={() =>
            push(
              `/contactos/editar?id=${contact.id}&apikey=${localStorage.getItem(
                'apikey'
              )}&companyId=${localStorage.getItem('companyId')}`
            )
          }
          size={20}
        />
        <Spacer x={8} />
        <TbArrowBigRightLinesFilled
          cursor={'pointer'}
          color={colorIcon}
          onClick={() =>
            push(
              `/contactos/detalles/${contact.id}/?apikey=${localStorage.getItem(
                'apikey'
              )}&companyId=${localStorage.getItem('companyId')}`
            )
          }
          size={20}
        />
        </div>
      )

    default:
      return (
        <div className="flex flex-row align-center">
          <TbArrowBigRightLinesFilled
            color={colorIcon}
            cursor={'pointer'}
            size={20}
          />
        </div>
      )
  }
}
