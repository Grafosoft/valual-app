import valualApi from '@/apis/valualApi'
import { Button, Input } from '@nextui-org/react'
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
  id?: string | undefined
}
const ItemsCreatePage: NextPage<Props> = ({
  apikey,
  companyId,
  method,
  id,
  form
}) => {
  const { replace } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { status: statusSession } = useSession()
  const titleText = method === 'crear' ? `Crear Articulo` : `Editar Articulo`



  const [name, setName] = useState('' || form?.name)
  const [code, setCode] = useState('' || form?.code)
  const [barcode, setBarcode] = useState('' || form?.barcode)
  const [wooCode, setWooCode] = useState('' || form?.wooCode)


  const [salePrice, setSalePrice] = useState<number | string>('' || form?.salePrice)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Eliminar puntos y comas del valor para obtener el número sin formato
    const cleanedValue = inputValue.replace(/[.,]/g, '');

    // Convertir a número y actualizar el estado
    setSalePrice(cleanedValue !== '' ? parseInt(cleanedValue, 10) : '');

    // No necesitamos formatear el valor aquí
  };

  const formattedValue = typeof salePrice === 'number'
    ? salePrice.toLocaleString('en-DE')
    : salePrice;



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
        .put(`items/${id}?companyId=${companyId}&apikey=${apikey}`, bodyApi)
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
    statusSession === 'unauthenticated' && replace('/')
  }, [statusSession, replace])

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

        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div>
            <label htmlFor="code" className="text-gray-500">
              Código
            </label>
            <Input
              id="code"
              size="lg"
              radius="sm"
              className="mt-2"
              value={code}
              onValueChange={setCode}
            />
          </div>
          <div>
            <label htmlFor="location" className="text-gray-500">
              Código de barras
            </label>
            <Input
              id="location"
              size="lg"
              radius="sm"
              className="mt-2"
              value={barcode}
              onValueChange={setBarcode}
            />
          </div>
        </div>
        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div>
            <label htmlFor="code" className="text-gray-500">
              Código Woo
            </label>
            <Input
              id="code"
              size="lg"
              radius="sm"
              className="mt-2"
              value={wooCode}
              onValueChange={setWooCode}
            />
          </div>
          <div>
            <label htmlFor="location" className="text-gray-500">
              Precio de Venta
            </label>
            <Input
              type="text"
              size="lg"
              radius="sm"
              className="mt-2"
              value={formattedValue}
              onChange={handleInputChange}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>}
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
  let isMethodValid = true
  const apikey = ctx.query.apikey?.toString() || ''
  const companyId = ctx.query.companyId || ''
  const id = ctx.query.id?.toString() || ''

  if (method !== 'crear' && method !== 'editar') {
    method = 'crear'
    isMethodValid = false
  }

  if (method === 'editar') {
    const response = await valualApi.get<ItemsList>(
      `items/${id}/?companyId=${companyId}&apikey=${apikey}`
    )

    if (!response || !isMethodValid) {
      return {
        notFound: true,
        redirect: '/404'
      }
    } else {
      return {
        props: {
          form: response.data,
          apikey,
          companyId,
          method,
          id
        }
      }
    }
  }

  return {
    props: {
      form: {},
      apikey,
      companyId,
      method
    }
  }
}
