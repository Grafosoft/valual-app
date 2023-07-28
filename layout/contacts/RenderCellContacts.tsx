import React, { FC, useEffect, useState } from 'react'
import {    
  TbArrowBigRightLinesFilled,
} from 'react-icons/tb'

import {
  Chip,
  User
} from '@nextui-org/react'
import { useRouter } from 'next/router'
import { ContactsList } from '../../interfaces/contacts/contactsList'

interface Props {
    contact: ContactsList
  columnKey: React.Key
 
}

export const RenderCell: FC<Props> = ({
    contact,
  columnKey,
  
}) => {
  const { push } = useRouter()

  

 

  let colorIcon = '#0072F5'


  const [apikey, setApikey] = useState('')
  useEffect(() => {
    setApikey(localStorage.getItem('apikey') || '')
  }, [])

  switch (columnKey) {
    case 'name':
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
          {contact.identificationType.code}   {contact.identification} 
        </p>
      )
    case 'city':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {contact.email}

        </p>
      )
        
      case 'contact':
        return (
          <p className="font-medium" style={{ fontSize: '15px' }}>
            {contact.identificationType.code}   
            description={contact.phone}
          </p>
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