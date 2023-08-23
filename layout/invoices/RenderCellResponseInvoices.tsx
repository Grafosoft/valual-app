import React, { FC } from 'react'
import { PrinterModal } from '../../components/tbDots/Printer'
import { Response } from '../../interfaces/invoices/invoicesDetailsList'


interface Props {
  response: Response
  columnKey: React.Key
}

export const RenderCellResponseInvoices: FC<Props> = ({
  response,
  columnKey
}) => {
  const date = new Date(response.date).toLocaleDateString('es', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  switch (columnKey) {
    case 'user':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {response.user}
        </p>
      )
      case 'cufe':
        return (
          <p className="font-medium" style={{ fontSize: '15px' }}>
            {response.cufe}
          </p>
        )
        case 'message':
        return (
          <p className="font-medium" style={{ fontSize: '15px' }}>
            {response.message}
          </p>
        )
    case 'date':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {date}
        </p>
      )
      case 'actions':
        return (
          <PrinterModal
            text={`Mensaje ${response.message}`}
            url={response.pdfUrl}
            description={date}
          />


        )


  }
}
