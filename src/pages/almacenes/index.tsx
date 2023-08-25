import valualApi from '@/apis/valualApi'
import {
  Button,
  CircularProgress,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
  Input
} from '@nextui-org/react'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import { WarehouseList } from '../../../interfaces/warehouses/warehousesList';
import { RenderCellWarehouses } from '../../../layout/warehouses/RenderCellWarehouses'
import { warehousesColumns } from '@/global/warehouses/warehousesColumns'
import { WarehouseHeadersLayout } from '../../../layout/warehouses/WarehousesHeader'
import { RiAddFill } from 'react-icons/ri'
import { data } from 'autoprefixer'
import { useRouter } from 'next/router'



interface Props {
  houses: WarehouseList[]
  apikey: string | undefined
  companyId: string | undefined
}
const WarehouseList: NextPage<Props> = ({ houses, apikey, companyId }) => {
  const { replace } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [name, setName] = useState()
 const [priceList, setPriceList] = useState()

 const handleClickHome = () => {
  replace(`/almacenes/?companyId=${companyId}&apikey=${apikey}`)
  onClose()
}





  return (
    <>
      <Head>
        <title>Almacenes</title>
      </Head>
      <WarehouseHeadersLayout houses={houses}/>

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
        onPress={ onOpen}

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
        size="full"
        aria-label="Crear almacenes"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      >

        <ModalContent>
        <ModalHeader>
          <div className="container my-5 lg:my-8 m-auto">
        <h1 className="text-5xl font-bold text-center">Crear Almacen</h1>
      </div>
        </ModalHeader>


        <ModalBody>
 <div className="container px-5 lg:px-10 m-auto">
        <div className="container m-auto">
          <h2 className="text-xl lg:text-2xl mb-5 font-semibold">
            Datos Generales
          </h2>
          <div className="container my-5">
            <label htmlFor="title" className="text-gray-500">
              Nombre
            </label>
            <Input
              id="name"
              size="lg"
              radius="sm"
              className="mt-2"
              value={name}
              onValueChange={setName}
            />

            </div>
            <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
            <div>
              <label htmlFor="code" className="text-gray-500">
              Nombre Precio de lista
              </label>
              <Input
                id="code"
                size="lg"
                radius="sm"
                className="mt-2"
                value={priceList}
                onValueChange={setPriceList}
              />
            </div>
            </div>
            </div>
            <div className="my-10 flex justify-center">
            <Button
              size="lg"
              className="text-white"
              type="submit"
              color="warning"
              style={{ width: '300px' }}
              onClick={handleClickHome}



            >
              Guardar
            </Button>
          </div>
            </div>

          </ModalBody>
        </ModalContent>
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
      companyId
    }
  }
}
