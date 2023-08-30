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
import React, { useEffect, useState, useMemo, MouseEventHandler } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ItemsList } from '../../../../interfaces/items/itemsList'
import Head from 'next/head'
interface Props {
  form: ItemsList
  apikey: string | undefined
  companyId: string | undefined
  method: string | undefined
  idput?: number | undefined
}
const ItemsCreatePage: NextPage<Props> = ({
  apikey,
  companyId,
  method,
  idput,
  form
}) => {
  const { replace } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { status } = useSession()
  const titleText = method === 'crear' ? `Crear Articulo` : `Editar Articulo`

  const [name, setName] = useState('' || form?.name)
  const [code, setCode] = useState('' || form?.code)
  const [barcode, setBarcode] = useState('' || form?.barcode)
  const [wooCode, setWooCode] = useState('' || form?.wooCode)
  const [salePrice, setSalePrice] = useState('' || form?.salePrice)
  const [costPrice, setCostPrice] = useState('' || form?.costPrice)
  const [lastcostPrice, setLastcostPrice] = useState('' || form?.lastcostPrice)
  const [bagtaxPrice, setBagtaxPrice] = useState('' || form?.bagtaxPrice)
  const [observations, setObservations] = useState('' || form?.observations)

  const bodyApi = {
    id: 0,
    name: name,
    code: code,
    barcode: barcode,
    wooCode: wooCode,
    salePrice: salePrice,
    costPrice: costPrice,
    lastcostPrice: lastcostPrice,
    bagtaxPrice: bagtaxPrice,
    observations: observations,
    isInventory: false,
    isFavorite: false,
    isAiu: false,
    isActive: true
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    setIsLoading(true)

    if (method === 'crear') {
      valualApi
        .post(`items/?companyId=${companyId}&apikey=${apikey}`, bodyApi)
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
        .put(`items/${idput}/?companyId=${companyId}&apikey=${apikey}`, bodyApi)
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
        <title>{titleText}</title>
      </Head>
      <div className="container my-5 lg:my-8 m-auto">
        <h1 className="text-5xl font-bold text-center">{titleText}</h1>
      </div>

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
        </div>
      </div>

      <div className="mb-5 w-full flex justify-center">
        <Button
          size="lg"
          className="text-white"
          type="submit"
          color="primary"
          style={{ width: '300px' }}
          isLoading={isLoading}
          onClick={handleClick}
        >
          Guardar
        </Button>
      </div>
    </>
  )
}

export default ItemsCreatePage

export const getServerSideProps: GetServerSideProps = async ctx => {
  let method = ctx.params?.method || ''
  const apikey = ctx.query.apikey?.toString() || ''
  const companyId = ctx.query.companyId?.toString() || ''

  const response = await valualApi.get<ItemsList[]>(
    `warehouses/?companyId=${companyId}&apikey=${ctx.query.apikey}`
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
