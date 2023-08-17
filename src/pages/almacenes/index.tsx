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
import { WarehouseList } from '../../../interfaces/warehouses/warehousesList'
import { RenderCellWarehouses } from '../../../layout/warehouses/RenderCellWarehouses'
import { warehousesColumns } from '@/global/warehouses/warehousesColumns'

interface Props {
  houses: WarehouseList[]
  apikey: string | undefined
  companyId: string | undefined
}
const WarehouseList: NextPage<Props> = ({ houses, apikey, companyId }) => {
  return (
    <>
      <Head>
        <title>Almacenes</title>
      </Head>

      <Spacer y={1} />
      <Table
        aria-label="Almacenes"
        style={{ height: 'auto', minWidth: '100%' }}
        isStriped
        shadow="none"
      >
        <TableHeader columns={warehousesColumns}>
          {column => <TableColumn key={column.uid}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={houses}>
          {item => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>
                  <RenderCellWarehouses houses={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default WarehouseList

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apikey = ctx.query.apikey?.toString() || ''
  const companyId = ctx.query.companyId?.toString() || ''

  const response = await valualApi.get<WarehouseList[]>(
    `warehouses/?companyId=${companyId}&apikey=${ctx.query.apikey}`
  )

  if (!response) {
    return {
      notFound: true,
      redirect: '/404'
    }
  }

  return {
    props: {
      houses: response.data,
      apikey,
      companyId
    }
  }
}
