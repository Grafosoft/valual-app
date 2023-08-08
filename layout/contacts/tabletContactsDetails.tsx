import React, { FC } from 'react'
import { contactsDetailsColumns } from '@/global/contacts/contactsDetailsColumns'
import { RenderCellContactsDetails } from './RenderCellContactsDetails'
import { Contact } from '../../interfaces/contacts/contactsDetailsList'
import { Card, CardBody, CardHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'



interface Props {
    table: Contact[]
   
  }
export const TabletContactsDetails: FC<Props> = ({ table }) => {
return(
    <>



<Card>
<CardHeader style={{ paddingBottom: '0' }}>
  <h2 className="text-4xl  font-medium py-5 pl-5">Contactos</h2>
</CardHeader>
<CardBody style={{ paddingTop: '0' }}>
<Table
aria-label="Factura"
style={{ height: 'auto', minWidth: '100%' }}
isStriped shadow="none"
>
<TableHeader columns={contactsDetailsColumns}>
  {column => <TableColumn key={column.uid}>{column.name}</TableColumn>}
</TableHeader>
<TableBody items={table}>
  {item => (
    <TableRow key={item.id}>
      {columnKey => (
        <TableCell>
          <RenderCellContactsDetails cont={item} columnKey={columnKey} />
        </TableCell>
      )}
    </TableRow>
  )}
</TableBody>
</Table>

  </CardBody>
  </Card>
    </>
)}
