import valualApi from '@/apis/valualApi'
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
import Head from 'next/head'
import React from 'react'
import { SellersList } from '../../../interfaces/sellers/sellersList'
import { sellersColumns } from '@/global/sellers/sellersColumn'
import { RenderCellSellers } from '../../../layout/sellers/RenderCellSellers'

interface Props {
  sellers: SellersList[]
  apikey: string | undefined
  companyId: string | undefined
}
const SellersList: NextPage<Props> = ({ sellers, apikey, companyId }) => {
  return (
    <>
      <Head>
        <title>Vendedores</title>
      </Head>

      <Spacer y={1} />
      <Table
        aria-label="Vendedores"
        style={{ height: 'auto', minWidth: '100%' }}
        isStriped
        shadow="none"
      >
        <TableHeader columns={sellersColumns}>
          {column => <TableColumn key={column.uid}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={sellers}>
          {item => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>
                  <RenderCellSellers sellers={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default SellersList

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apikey = ctx.query.apikey?.toString() || ''
  const companyId = ctx.query.companyId?.toString() || ''

  const response = await valualApi.get<SellersList[]>(
    `sellers/?companyId=${companyId}&apikey=${ctx.query.apikey}`
  )

  if (!response) {
    return {
      notFound: true,
      redirect: '/404'
    }
  }

  return {
    props: {
      sellers: response.data,
      apikey,
      companyId
    }
  }
}
