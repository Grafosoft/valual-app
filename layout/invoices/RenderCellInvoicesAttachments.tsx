import React, { FC } from 'react'

import { Attachment } from '../../interfaces/invoices/invoicesDetailsList'
import { PrinterModal } from '../../components/tbDots/printer'



interface Props {
  attach: Attachment
  columnKey: React.Key
}

export const RenderCellInvoicesAttachments: FC<Props> = ({
  attach,
  columnKey
}) => {
  const createDate = new Date(attach.date).toLocaleDateString('es', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  switch (columnKey) {
    case 'name':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {attach.name}
        </p>
      )
    case 'date':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {createDate}
        </p>
      )
    case 'actions':
      return (
        <PrinterModal
          text={`Nombre ${attach.name}`}
          url={attach.url}
          description={'Fecha ' + createDate}
        />
      )

    default:
      return (
        <p
          className="font-medium"
          style={{ fontSize: '15px', textTransform: 'capitalize' }}
        >
          {attach.name}
        </p>
      )
  }
}
