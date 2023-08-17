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
import { BanksList } from '../../../interfaces/banks/banksList'
import { banksColumns } from '@/global/banks/banksColumns'
import { RenderCellBanks } from '../../../layout/banks/RenderCellBanks'

interface Props {
  banks: BanksList[]
  apikey: string | undefined
  companyId: string | undefined
}
const BanksList: NextPage<Props> = ({ banks, apikey, companyId }) => {
  return (
    <>
      <Head>
        <title>Bancos</title>
      </Head>

      <Spacer y={1} />
      <Table
        aria-label="Bancos"
        style={{ height: 'auto', minWidth: '100%' }}
        isStriped
        shadow="none"
      >
        <TableHeader columns={banksColumns}>
          {column => <TableColumn key={column.uid}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={banks}>
          {item => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>
                  <RenderCellBanks banks={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default BanksList

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apikey = ctx.query.apikey?.toString() || ''
  const companyId = ctx.query.companyId?.toString() || ''

  const response = await valualApi.get<BanksList[]>(
    `banks/?companyId=${companyId}&apikey=${ctx.query.apikey}`
  )

  if (!response) {
    return {
      notFound: true,
      redirect: '/404'
    }
  }

  return {
    props: {
      banks: response.data,
      apikey,
      companyId
    }
  }
}
