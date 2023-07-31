import valualApi from '@/apis/valualApi'
import { PaginationList } from '../../../components/pagination/PaginationList'
import { contactsColumns } from '@/global/contacts/contactsColumns'
import { ContactsList } from '../../../interfaces/contacts/contactsList'
import { ContactsHeadersLayout } from '../../../layout/contacts/contactsHeader'
import { RenderCellContacts } from '../../../layout/contacts/RenderCellContacts'
import {
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


interface Props {
  contacts: ContactsList[]
  apikey: string | undefined
  companyId: string | undefined
  page: string | undefined
}

const ContactList: NextPage<Props> = ({
  contacts,
  apikey,
  companyId,
  page
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const { status } = useSession()
  const { replace } = useRouter()

  useEffect(() => {
    setCurrentPage(parseInt(page || '0') + 1)
    status === 'unauthenticated' && replace('/')
  }, [replace, status, page])

  return (
    <>
      <Head>
        <title>Clientes</title>
      </Head>
      <ContactsHeadersLayout
        contacts={contacts}
        apikey={apikey}
        companyId={companyId}
      />
      <Spacer y={1} />
      <Table
        aria-label="Lista de Clientes"
        style={{ height: 'auto', minWidth: '100%' }}
        isStriped
      >
        <TableHeader columns={contactsColumns}>
          {column => <TableColumn key={column.uid}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={contacts}>
          {item => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>
                  <RenderCellContacts contact={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationList
        urlBack={`contactos/?companyId=${companyId}&apikey=${apikey}&page=${
          currentPage - 2
        }`}
        urlNext={`contactos/?companyId=${companyId}&apikey=${apikey}&page=${currentPage}`}
        currentPage={currentPage}
        color={"primary"}

      />
    </>
  )
}

export default ContactList

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apikey = ctx.query.apikey?.toString() || ''
  const companyId = ctx.query.companyId?.toString() || ''
  const name = ctx.query.name?.toString() || ''
  const page = ctx.query.page || '0'

  const response = await valualApi.get<ContactsList[]>(
    `contacts/?companyId=${companyId}&apikey=${ctx.query.apikey}&page=${page}&name=${name}`
  )

  if (!response) {
    return {
      notFound: true,
      redirect: '/404'
    }
  }

  return {
    props: {
      contacts: response.data,
      apikey,
      companyId,
      page
    }
  }
}