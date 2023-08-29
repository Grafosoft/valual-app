import valualApi from '@/apis/valualApi'
import {
  Button,
  CircularProgress,
  Modal,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from '@nextui-org/react'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState, useMemo } from 'react'
import { WarehouseList } from '../../../interfaces/warehouses/warehousesList'
import { RenderCellWarehouses } from '../../../layout/warehouses/RenderCellWarehouses'
import { warehousesColumns } from '@/global/warehouses/warehousesColumns'
import { WarehouseHeadersLayout } from '../../../layout/warehouses/WarehousesHeader'
import { RiAddFill } from 'react-icons/ri'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import CreateAndEditWarehouses from '../../../components/modal/CreateAndEditWarehouses'

interface Props {
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
  houses: WarehouseList[]
  apikey: string | undefined
  companyId: string | undefined
  method: string | undefined
  id?: string | undefined
}
const WarehouseList: NextPage<Props> = ({
  houses,
  apikey,
  companyId,
  color,
  method= 'crear',
  id = '0'
}) => {
  const { replace } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { status } = useSession()





  useEffect(() => {
    status === 'unauthenticated' && replace('/')
  }, [status, replace])

  return (
    <>
      <Head>
        <title>Almacenes</title>
      </Head>
      <WarehouseHeadersLayout houses={houses} />

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
                  <RenderCellWarehouses apikey={apikey} companyId={companyId} houses={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Button
        isIconOnly
        color={'primary'}
        variant="shadow"
        style={{
          width: '60px',
          height: '60px',
          position: 'fixed',
          right: '2em',
          bottom: '2em'
        }}
        isDisabled={isLoading}
        onPress={onOpen}
      >
        {isLoading ? (
          <CircularProgress
            size="md"
            classNames={{
              indicator: 'stroke-white',
              track: 'stroke-white/25'
            }}
          />
        ) : (
          <RiAddFill size={25} color="white" />
        )}
      </Button>

      <Modal
        closeButton
        backdrop="blur"
        aria-label="Crear almacenes"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
      >
        <CreateAndEditWarehouses color={color} apikey={apikey} companyId={companyId} method={method}  />

      </Modal>
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
      companyId,
    }
  }
}
