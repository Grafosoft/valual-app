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
import { invoicesResponseColumns } from '@/global/invoices/invoicesResponseColumns'
import { RenderCellResponseInvoices } from './RenderCellResponseInvoices'
import { Response } from '../../interfaces/invoices/invoicesDetailsList'

interface Props {
  download: Response
}

export const InvoicesResponse: FC<Props> = ({ download }) => {
  return (
    <>
      <div>
        <CardHeader className="justify-center" style={{ paddingBottom: '0' }}>
          <h2 className="text-4xl font-medium py-5 pl-5">Respuesta</h2>
        </CardHeader>
        <CardBody style={{ paddingTop: '0' }}>
          <Table
            aria-label="Factura"
            style={{ height: 'auto', minWidth: '100%' }}
            isStriped
            shadow="none"
          >
            <TableHeader columns={invoicesResponseColumns}>
              {column => (
                <TableColumn key={column.uid} align="start">
                  {' '}
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody>
              <TableRow>
                {columnKey => (
                  <TableCell>
                    <RenderCellResponseInvoices
                      response={download}
                      columnKey={columnKey}
                    />
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </CardBody>
      </div>
    </>
  )
}
