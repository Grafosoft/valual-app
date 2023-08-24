import { truncateText } from '@/utils/truncateText'
import { Chip, User } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { TbArrowRight } from 'react-icons/tb'
import { ContactsList } from '../../interfaces/contacts/contactsList'


interface Props {
  contact: ContactsList
  columnKey: React.Key
  searchNumber: string | undefined
  urlPath: string | undefined
  closeHandler: () => void
  setContactSearch: (inititalState: { id: string; name: string }) => void

}

export const RenderCellInvoicesContactsModal: FC<Props> = ({
  contact,
  columnKey,
  searchNumber,
  urlPath,
  closeHandler,
  setContactSearch
}) => {
  const { push } = useRouter()
  const fullName = `${contact.firstName} ${contact.middleName} ${contact.firstSurname} ${contact.secondSurname}`


  switch (columnKey) {
    case 'commercialName':
      return (
        <User
          avatarProps={{
            src: '',
            radius: 'md',
            name: `${contact.commercialName} ${fullName}`
          }}
          name={truncateText(`${contact.commercialName} ${fullName}`, 50)}
          style={{ padding: 0 }}
          description={`${contact.identification}`}
        />
      )

    case 'identification':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {contact.identification}
        </p>
      )

    case 'email':
      return (
        <p
          className="font-medium"
          style={{ fontSize: '15px', textTransform: 'capitalize' }}
        >
          {contact.email}
        </p>
      )
    case 'action':
      return (
        <div className="grid align-center">
          <TbArrowRight
            cursor={'pointer'}
            onClick={() => {
              setContactSearch({
                id: contact.id.toString(),
                name: `${contact.commercialName} ${fullName}`
              })
              closeHandler()
              urlPath !== 'form' &&
                push(
                  `${urlPath}?apikey=${localStorage.getItem(
                    'apikey'
                  )}&companyId=${localStorage.getItem('companyId')}${
                    searchNumber !== '' ? `&number=${searchNumber}` : ''
                  }${
                    contact.id.toString() !== ''
                      ? `&contactId=${contact.id}`
                      : ''
                  }`
                )
            }}
            size={20}
          />
        </div>
      )

    default:
      return (
        <b style={{ fontSize: '15px', textTransform: 'capitalize' }}>
          {contact.commercialName}
        </b>
      )
  }
}