import React, { FC, useEffect, useState } from 'react'
import {
  User
} from '@nextui-org/react'
import { InvoicesList } from '../../interfaces/invoices/invoicesList'
import { TbArrowBigRightLinesFilled } from 'react-icons/tb'
import { useRouter } from 'next/router'

interface Props {
    invoices: InvoicesList
  columnKey: React.Key
 
}

export const RenderCellInvoices: FC<Props> = ({
    invoices,
  columnKey,
  
}) => {
    const { push } = useRouter()
    let colorIcon = '#0072F5'

    const date = new Date(invoices.date).toLocaleDateString('es', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      

    const dueDate = new Date(invoices.dueDate).toLocaleDateString('es', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      const createDate = new Date(invoices.createDate).toLocaleDateString('es', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
  



  const [apikey, setApikey] = useState('')
  useEffect(() => {
    setApikey(localStorage.getItem('apikey') || '')
  }, [])

  switch (columnKey) {
    case 'contact':
      return (
        <User
          avatarProps={{
            src: '',
            radius: 'md',
            name: invoices.contact.name
          }}
          name={ `${invoices.contact.name}` } 
          style={{ padding: 0 }}
           description={invoices.contact.identification}
        />
      )
      case 'status':
        return (
          <p className="font-medium">
            {invoices.status}
          </p>
        )

      case 'date':
        return (
          <p className="font-medium" style={{ fontSize: '15px' }}>
            {date}   
          </p>
        )
        case 'dueDate':
        return (
          <p className="font-medium" style={{ fontSize: '15px' }}>
            {dueDate}   
          </p>
        )
      case 'createDate':
        return (
          <p className="font-medium" style={{ fontSize: '15px' }}>
            {createDate}   
          </p>
        )
        case 'details':
          return (
            <TbArrowBigRightLinesFilled
              cursor={'pointer'}
              color={colorIcon}     
              onClick={() => push(`/contactos/?apikey=${localStorage.getItem(
                'apikey'
              )}&companyId=${localStorage.getItem('companyId')}`)}
              size={20}
            />
          )
        
    default:
      
  }
}