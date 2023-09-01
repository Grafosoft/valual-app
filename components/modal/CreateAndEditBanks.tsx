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
import { useRouter } from 'next/router'
import { WarehouseList } from '../../interfaces/warehouses/warehousesList'
import { BanksList } from '../../interfaces/banks/banksList'
import { Type } from '@/global/params/paramsBanks'
interface Props {
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
    form: BanksList
  apikey: string | undefined
  companyId: string | undefined
  method: string | undefined
  idput?: number | undefined



}
const CreateAndEditBanks: NextPage<Props> = ({
  apikey,
  companyId,
  color,
  method,
  idput,
  form,
}) => {
  const { replace } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(''|| form?.name)
  const { status } = useSession()
  const [typeList, setTypeList] = useState<Type[]>([])
  const titleText = method === 'crear' ? `Crear Bancos` : `Editar Bancos`
  const [selectedTypeList, setSelectedTypeList]: any = useState(
    new Set([form?.type.name || 'Nombre tipo de banco' ])
  )


  const typebank = useMemo(() => {
    if (form?.type && form.type.name) {
      return form.type.name;
    } else {
      return 'Nombre tipo de banco';
    }
  }, [form]);

  const type = useMemo(
    () =>
    typeList.find(
      element => element.id.toString() === Array.from(selectedTypeList)[0]
    )?.name,
  [typeList, selectedTypeList])

  useEffect(() => {
    if (method === 'editar') {
      if (form?.type.id) {
        setSelectedTypeList(new Set([form.type.id.toString()]));
      } else {
        setSelectedTypeList(new Set<string>());
      }
    }
  }, [method, form]);


   const typeListid = Array.from<string>(selectedTypeList)[0]

   const bodyApi = {
    id: 0,
    name: name,
    type: {
      id: typeListid.toString(),
      name: type
    }
  }

  const handleClick = async () => {
    setIsLoading(true)
    console.log(bodyApi)

    if (method === 'crear') {
      valualApi
        .post(`banks/?companyId=${companyId}&apikey=${apikey}`, bodyApi)
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
          `banks/${idput}/?companyId=${companyId}&apikey=${apikey}`,
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
            if (typeList.length === 0) {
              valualApi
                .get(
                  `banks/params/?apikey=${apikey}&companyId=${companyId}`
                )
                .then(response => {
                  if (response.status === 200) {
                    setTypeList(response.data.types)
                    setIsLoading(false)
                    console.log(typeList)
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
                          <label className="text-gray-500">
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
                            <h2 className="text-gray-500 my-3">
                              Nombre Precio de lista
                            </h2>
                            <Dropdown>
                              <DropdownTrigger>
                                <Button
                                  variant="flat"
                                  className="capitalize w-full "
                                  size="lg"
                                  radius="sm"
                                  color={type !== undefined ? color : 'default'}
                                >
                                  {

                                  type !== undefined
                                    ? type
                                    : type !== undefined || method === 'editar'
                                    ? typebank :
                                     'Nombre tipo de banco'}
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu
                                aria-label="Selección de precio de lista"
                                variant={'flat'}
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedTypeList}
                                onSelectionChange={setSelectedTypeList}
                              >
                                {typeList.length !== 0 ? (
                                  typeList.map(element => (
                                    <DropdownItem
                                    key={(element.id.toString())}
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

export default CreateAndEditBanks

export const getServerSideProps: GetServerSideProps = async ctx => {
  let method = ctx.params?.method || ''
  const apikey = ctx.query.apikey?.toString() || ''
  const companyId = ctx.query.companyId?.toString() || ''

  const response = await valualApi.get<WarehouseList[]>(
    `banks/?companyId=${companyId}&apikey=${ctx.query.apikey}`
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
