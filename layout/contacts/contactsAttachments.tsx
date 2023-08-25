import React, { FC } from 'react'
import { Attachment } from '../../interfaces/contacts/contactsDetailsList'
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
import { RenderCellAttachments } from './RenderCellAttachments'
import { contactAttachmentsColumns } from '@/global/contacts/contactsAttachmentsColumns'

interface Props {
  download: Attachment[]
}
export const ContactsAttachments: FC<Props> = ({ download }) => {
  return (
    <>
      <div>
        <CardHeader className="justify-center" style={{ paddingBottom: '0' }}>
          <h2 className="text-4xl   font-medium py-5 pl-5">Archivos</h2>
        </CardHeader>
        <CardBody style={{ paddingTop: '0' }}>
          <Table
            aria-label="Factura"
            style={{ height: 'auto', minWidth: '100%' }}
            isStriped
            shadow="none"
          >
            <TableHeader columns={contactAttachmentsColumns}>
              {column => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={download}>
              {item => (
                <TableRow key={item.id}>
                  {columnKey => (
                    <TableCell>
                      <RenderCellAttachments
                        attach={item}
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
