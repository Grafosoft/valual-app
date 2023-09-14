import valualApi from '@/apis/valualApi'
import {
  Button,
  ModalBody,
  ModalContent,
  ModalHeader,
  Input,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react'
import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { WarehouseList } from '../../interfaces/warehouses/warehousesList'
import { SellersList } from '../../interfaces/sellers/sellersList'
interface Props {
  form: SellersList
  apikey: string | undefined
  companyId: string | undefined
  method: string | undefined
  idput?: number | undefined
}
const CreateAndEditSellers: NextPage<Props> = ({
  apikey,
  companyId,
  method,
  idput,
  form
}) => {
  const { replace } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('' || form?.name)
  const { onClose } = useDisclosure()

  const { status } = useSession()
  const titleText = method === 'crear' ? `Crear Vendedores` : `Editar Vendedores`

  const bodyApi = {
    id: 0,
    name
  }

  const handleClick = async () => {
    setIsLoading(true)
    console.log(bodyApi)

    if (method === 'crear') {
      valualApi
        .post(`sellers/?companyId=${companyId}&apikey=${apikey}`, bodyApi)
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
          `sellers/${idput}/?companyId=${companyId}&apikey=${apikey}`,
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
        <ModalHeader>
          <div className="container my-5 lg:my-8 m-auto">
            <h1 className="text-5xl font-bold text-center">{titleText}</h1>
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
                  <label className="text-gray-500">Nombre</label>
                  <Input
                    id="name"
                    size="lg"
                    radius="sm"
                    className="mt-2"
                    value={name}
                    onValueChange={setName}
                  />
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
                setIsLoading(false)
              }}
              onClose={onClose}
            >
              Guardar
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default CreateAndEditSellers

export const getServerSideProps: GetServerSideProps = async ctx => {
  let method = ctx.params?.method || ''
  const apikey = ctx.query.apikey?.toString() || ''
  const companyId = ctx.query.companyId?.toString() || ''

  const response = await valualApi.get<WarehouseList[]>(
    `sellers/?companyId=${companyId}&apikey=${ctx.query.apikey}`
  )

  if (!response) {
    return {
      notFound: true,
      redirect: '/404'
    }
  }

  if (method === 'crear') {
    return {
      props: {
        form: {},
        apikey,
        companyId,
        method
      }
    }
  } else {
    return {
      props: {
        form: response.data,
        apikey,
        companyId,
        method
      }
    }
  }
}
