import React, { FC } from 'react'
import { ItemElement } from '../../interfaces/invoices/invoicesDetailsList'
import { Chip } from '@nextui-org/react'

interface Props {
  items: ItemElement
  columnKey: React.Key
}

export const RenderCellItemsInvoices: FC<Props> = ({ items, columnKey }) => {
  switch (columnKey) {
    case 'quantity':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {items.quantity}
        </p>
      )
    case 'value':
      return (
        <>
          <p className="font-medium" style={{ fontSize: '15px' }}>
            VALOR: {items.value}
          </p>
          <div className="text-gray-400">
            <p>PRECIO: {items.price}</p>
          </div>
        </>
      )
    case 'prepaid':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {items.prepaid}
        </p>
      )
    case 'discount':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {items.discount}
        </p>
      )
    case 'description':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {items.description}
        </p>
      )
    case 'isRemission':
      return (
        <Chip
          radius="sm"
          variant={'flat'}
          size="sm"
          color={items.isRemission ? 'success' : 'danger'}
        >
          {items.isRemission ? 'activo' : 'inactivo'}
        </Chip>
      )
    case 'discountAmount':
      return (
        <>
          <p className="text-gray-400">
           DESCUENTO: {items.discountAmount}
          </p>
          <div className="text-gray-400">
            <p>TOTAL: {items.totalAmount}</p>
          </div>
        </>
      )
      case 'item':
        return (
          <>
            <p className="font-medium" style={{ fontSize: '15px' }}>
              NOMBRE: {items.item.name}
            </p>
            <div className="text-gray-400">
              <p>CODIGO: {items.item.code}</p>
            </div>
          </>
        )
        case 'tax':
          return (
            <>
              <p className="font-medium" style={{ fontSize: '15px' }}>
                 {items.tax.name}
              </p>
              <div className="text-gray-400">
                <p>{items.tax.value} {items.tax.percentage}</p>
              </div>
            </>
          )
      case 'retention':
        return (
          <>
            <p className="text-gray-400">
              PROCENTAJE: {items.retention.percentage}
            </p>
            <div className="text-gray-400">
              <p>PROCENTAJE ICA: {items.retention.percentageIca}</p>
            </div>
            <div className="text-gray-400">
              <p>PROCENTAJE IVA: {items.retention.percentageIva}</p>
            </div>
          </>
        )
        case 'attorney':
          return (
            <p className="font-medium" style={{ fontSize: '15px' }}>
              {items.attorney.name}
            </p>
          )
  }
}
