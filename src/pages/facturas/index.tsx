import valualApi from '@/apis/valualApi'
import { PaginationList } from '../../../components/pagination/PaginationList'
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
import { InvoicesList } from '../../../interfaces/invoices/invoicesList'
import { RenderCellInvoices } from '../../../layout/invoices/RenderCellInvoices'
import { invoicesColumns } from '@/global/invoices/invoicesColumns'
import { InvoicesHeadersLayout } from '../../../layout/invoices/invoicesHeader'



interface Props {
  invoices: InvoicesList[]
  apikey: string | undefined
  companyId: string | undefined
  page: string | undefined
  number: string | undefined
  contactId: string | undefined
}

const InvoicesList: NextPage<Props> = ({
  invoices,
  apikey,
  companyId,
  page,
  number,
  contactId

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
        <title>Facturas</title>
      </Head>
      <InvoicesHeadersLayout
        invoices={invoices}
        apikey={apikey}
        companyId={companyId}
        contactId={contactId}

      />

      <Spacer y={1} />
      <Table
        aria-label="Lista de Facturas"
        style={{ height: 'auto', minWidth: '100%' }}
        isStriped
        shadow="none"
      >
        <TableHeader columns={invoicesColumns}>
          {column => <TableColumn key={column.uid}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={invoices} emptyContent={'No hay datos por mostrar.'}>
          {item => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>
                  <RenderCellInvoices invoices={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationList
        urlBack={`facturas/?companyId=${companyId}&apikey=${apikey}&page=${
          currentPage - 2
        }`}
        urlNext={`facturas/?companyId=${companyId}&apikey=${apikey}&page=${currentPage}`}
        currentPage={currentPage}
        color={'primary'}
      />
    </>
  )
}

export default InvoicesList

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apikey = ctx.query.apikey?.toString() || ''
  const companyId = ctx.query.companyId?.toString() || ''
  const page = ctx.query.page || '0'
  const number = ctx.query.number || ''
  const contactId = ctx.query.contactId || ''

  const response = await valualApi.get<InvoicesList[]>(
    `invoices/?companyId=${companyId}&apikey=${ctx.query.apikey}&page=${page}&number=${number}&contactId=${contactId}`
  )

  if (!response) {
    return {
      notFound: true,
      redirect: '/404'
    }
  }

  console.log(response.data)

  return {
    props: {
      invoices: response.data,
      apikey,
      companyId,
      page,
      number,
      contactId
    }
  }
}
