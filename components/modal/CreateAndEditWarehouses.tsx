import valualApi from '@/apis/valualApi'
import {
  Button,
  ModalBody,
  ModalContent,
  ModalHeader,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  ModalFooter
} from '@nextui-org/react'
import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { Pricelist } from '@/global/params/paramswarehouses'
import { useRouter } from 'next/router'
import { WarehouseList } from '../../interfaces/warehouses/warehousesList'
interface Props {
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
    form: WarehouseList
  apikey: string | undefined
  companyId: string | undefined
  method: string | undefined
  namepricelist?: string | undefined
  idput?: number | undefined



}
const CreateAndEditWarehouses: NextPage<Props> = ({
  apikey,
  companyId,
  color,
  method,
  idput,
  form,
  namepricelist
}) => {
  const { replace } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(''|| form?.name)
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
          `warehouses/${idput}/?companyId=${companyId}&apikey=${apikey}`,
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
                                  {

                                  list !== undefined
                                    ? list
                                    : list !== undefined || method === 'editar'
                                    ? namepricelist :
                                     'Nombre precio de lista'}
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

    </>
  )
}

export default CreateAndEditWarehouses

export const getServerSideProps: GetServerSideProps = async ctx => {
  let method = ctx.params?.method || ''
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

  if(method === 'crear'){
    return {
      props: {
        form: {},
        apikey,
        companyId,
        method,
      }
    }

  }else{
    return {
      props: {
        form: response.data,
        apikey,
        companyId,
        method,
      }
    }

  }


}
