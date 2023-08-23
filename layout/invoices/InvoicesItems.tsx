import React, { FC } from 'react'
import {
  CardBody,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { ItemElement } from '../../interfaces/invoices/invoicesDetailsList'
import { invoicesItemsColumns } from '@/global/invoices/invoicesItemsColumns'
import { RenderCellItemsInvoices } from './RenderCellItemsInvoices';

interface Props {
  items: ItemElement[]
}
export const InvoicesItems: FC<Props> = ({ items }) => {
  return (
    <>
      <div>
        <CardHeader className="justify-center" style={{ paddingBottom: '0' }}>
          <h2 className="text-4xl  font-medium py-5 pl-5">Items</h2>
        </CardHeader>
        <CardBody style={{ paddingTop: '0' }}>
          <Table
            aria-label="Factura"
            style={{ height: 'auto', minWidth: '100%' }}
            isStriped
            shadow="none"
          >
            <TableHeader columns={invoicesItemsColumns}>
              {column => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={items}>
              {item => (
                <TableRow key={item.id}>
                  {columnKey => (
                    <TableCell>
                      <RenderCellItemsInvoices
                        items={item}
                        columnKey={columnKey}
                      />
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </div>
    </>
  )
}
