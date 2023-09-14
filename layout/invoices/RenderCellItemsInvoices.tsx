import React, { FC } from 'react'
import { ItemElement } from '../../interfaces/invoices/invoicesDetailsList'
import { Chip } from '@nextui-org/react'

interface Props {
  items: ItemElement
  columnKey: React.Key
}

export const RenderCellItemsInvoices: FC<Props> = ({ items, columnKey }) => {
  const currencyFormat = new Intl.NumberFormat('en-DE')

  switch (columnKey) {
    case 'item':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {items.item.name} {items.item.code}
        </p>
      )
    case 'quantity':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {items.quantity}
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
          className="py-5 xl:p-0"
        >
          {items.isRemission ? 'remisionado' : 'No remisionado'}
        </Chip>
      )

    case 'attorney':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {items.attorney.name}
        </p>
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
    case 'value':
      return (
        <>
          <p className="font-medium" style={{ fontSize: '15px' }}>
            VALOR: {currencyFormat.format(items.value)}
          </p>
          <div className="text-gray-400">
            <p>PRECIO: {currencyFormat.format(items.price)}</p>
          </div>
        </>
      )

    case 'discountAmount':
      return (
        <>
          <p className="text-gray-400">DESCUENTO: {items.discountAmount}</p>
          <div className="text-gray-400">
            <p>TOTAL: {currencyFormat.format(items.totalAmount)}</p>
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
            <p>
              {items.tax.value} {items.tax.percentage}
            </p>
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
  }
}
