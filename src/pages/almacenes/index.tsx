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
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  ModalFooter
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
import { Pricelist } from '@/global/params/paramswarehouses'

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
  method,
  id = '0'
}) => {
  const { replace } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [name, setName] = useState()
  const { status } = useSession()
  const [priceList, setPriceList] = useState<Pricelist[]>([])
  const titleText = method === 'crear' ? `Crear Almacenes` : `Editar Almacenes`

  const [selectedPriceList, setSelectedPriceList]: any = useState(
    new Set(['Nombre precio de lista'])
  )
  const list = useMemo(
    () =>
      priceList.find(
        element => element.id.toString() === Array.from(selectedPriceList)[0]
      )?.name,
    [priceList, selectedPriceList]
  )
  const priceListid = Array.from<number>(selectedPriceList)[0]

  const bodyApi = {
    id: 0,
    name: name,
    priceList: {
      id: parseInt(priceListid.toString()),
      name: list
    }
  }

  const handleClick = async () => {
    setIsLoading(true)
    console.log(bodyApi)
    if (method === 'crear') {
      valualApi
        .post(`warehouses/?companyId=${companyId}&apikey=${apikey}`, bodyApi)
        .then(response => {
          if (response.status === 200) {
            setIsLoading(false)
            window.location.replace('')
          }
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      valualApi
        .put(
          `warehouses/${id}/?companyId=${companyId}&apikey=${apikey}`,
          bodyApi
        )
        .then(response => {
          if (response.status === 200) {
            setIsLoading(false)
            window.location.replace('')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

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
        <ModalContent>
          {onClose => {
            if (priceList.length === 0) {
              valualApi
                .get(
                  `warehouses/params/?apikey=${apikey}&companyId=${companyId}`
                )
                .then(response => {
                  if (response.status === 200) {
                    setPriceList(response.data.pricelists)
                    setIsLoading(false)
                    console.log(priceList)
                  }
                })
                .catch(error => console.log(error))
            }

            return (
              <>
                <ModalHeader>
                  <div className="container my-5 lg:my-8 m-auto">
                    <h1 className="text-5xl font-bold text-center">
                      {titleText}
                    </h1>
                  </div>
                </ModalHeader>

                <ModalBody>
                  <>
                    <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
                      <div className="w-full">
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
                        <div className="container my-5 ">
                          <div>
                            <label htmlFor="code" className="text-gray-500">
                              Nombre Precio de lista
                            </label>
                            <Dropdown>
                              <DropdownTrigger>
                                <Button
                                  variant="flat"
                                  className="capitalize w-full"
                                  size="lg"
                                  radius="sm"
                                  color={list !== undefined ? color : 'default'}
                                >
                                  {list !== undefined
                                    ? list
                                    : 'Nombre precio de lista'}
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu
                                aria-label="Selección de precio de lista"
                                variant={'flat'}
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedPriceList}
                                onSelectionChange={setSelectedPriceList}
                              >
                                {priceList.length !== 0 ? (
                                  priceList.map(element => (
                                    <DropdownItem
                                      key={parseInt(element.id.toString())}
                                    >
                                      {element.name}
                                    </DropdownItem>
                                  ))
                                ) : (
                                  <DropdownItem>NAME</DropdownItem>
                                )}
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </ModalBody>

                <ModalFooter>
                  <div className="mb-5 w-full flex justify-center">
                    <Button
                      size="lg"
                      className="text-white"
                      type="submit"
                      color="primary"
                      style={{ width: '300px' }}
                      isLoading={isLoading}
                      onPress={() => {
                        handleClick()
                        onClose()
                        setIsLoading(false)
                      }}
                    >
                      Guardar
                    </Button>
                  </div>
                </ModalFooter>
              </>
            )
          }}
        </ModalContent>
      </Modal>
    </>
  )
}

export default WarehouseList

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apikey = ctx.query.apikey?.toString() || ''
  const companyId = ctx.query.companyId?.toString() || ''
  let method = ctx.params?.method || ''
  let isMethodValid = true
  const id = ctx.query.id?.toString() || ''

  if (method !== 'crear' && method !== 'editar') {
    method = 'crear'
    isMethodValid = false
  }

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
      method
    }
  }
}
