import { User } from '@nextui-org/react'
import React, { FC } from 'react'
import { Contact } from '../../interfaces/contacts/contactsDetailsList'

interface Props {
  cont: Contact
  columnKey: React.Key
}
export const RenderCellContactsDetails: FC<Props> = ({ cont, columnKey }) => {
  switch (columnKey) {
    case 'name':
      return (
        <User
          avatarProps={{
            radius: 'md',
            name: cont.name || ''
          }}
          name={cont.name}
          style={{ padding: 0 }}
          description={cont.email}
        />
      )
    case 'rol':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {cont.rol}
        </p>
      )
    case 'phone':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {cont.phone}
        </p>
      )
    case 'observations':
      return (
        <p
          className="font-medium"
          style={{ fontSize: '15px', textTransform: 'capitalize' }}
        >
          {cont.observations}
        </p>
      )

    default:
      return (
        <p
          className="font-medium"
          style={{ fontSize: '15px', textTransform: 'capitalize' }}
        >
          {cont.rol}
        </p>
      )
  }
}
