import React, { FC, useEffect, useState } from 'react'
import { User } from '@nextui-org/react'
import { InvoicesList } from '../../interfaces/invoices/invoicesList'
import { TbArrowBigRightLinesFilled } from 'react-icons/tb'
import { useRouter } from 'next/router'

interface Props {
  invoices: InvoicesList
  columnKey: React.Key
}

export const RenderCellInvoices: FC<Props> = ({ invoices, columnKey }) => {
  const { push } = useRouter()
  let colorIcon = '#0072F5'

  const date = new Date(invoices.date).toLocaleDateString('es', {
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
          name={`${invoices.contact.name}`}
          style={{ padding: 0 }}
          description={invoices.contact.identification}
        />
      )
    case 'number':
      return <p className="font-medium">{invoices.number}</p>
    case 'document':
      return (
        <div className="container">
          <div className="flex ">
            <p className="font-medium" style={{ textTransform: 'capitalize' }}>
              {invoices.document.name}
            </p>
          </div>
          <div className="flex text-gray-400">
            <p
              style={{
                textTransform: 'capitalize'
              }}
            >
              {invoices.document.code}
            </p>
          </div>
        </div>
      )

    case 'date':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {date}
        </p>
      )

    case 'numeration':
      return (
        <>
          <p className="font-medium">Nombre: {invoices.numeration.name}</p>
          <div className="text-gray-400">
            <p>Resolucion: {invoices.numeration.resolution}</p>
          </div>
        </>
      )
    case 'details':
      return (
        <TbArrowBigRightLinesFilled
          cursor={'pointer'}
          color={colorIcon}
          onClick={() =>
            push(
              `/facturas/${invoices.id}/?apikey=${localStorage.getItem(
                'apikey'
              )}&companyId=${localStorage.getItem('companyId')}`
            )
          }
          size={20}
        />
      )

    default:
  }
}
