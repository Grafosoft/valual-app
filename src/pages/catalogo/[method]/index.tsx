import valualApi from '@/apis/valualApi'
import {
  Button,
  Input,
  Textarea,
  Switch,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState, useMemo, MouseEventHandler } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ItemsList } from '../../../../interfaces/items/itemsList'
import Head from 'next/head'
import { TbMoneybag } from 'react-icons/tb'
import { Group, Tax } from '@/global/params/paramsItems'
interface Props {
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
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
  form,
  color
}) => {
  const { replace } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { status: statusSession } = useSession()
  const titleText = method === 'crear' ? `Crear Articulo` : `Editar Articulo`
  const [name, setName] = useState('' || form?.name)
  const [code, setCode] = useState('' || form?.code)
  const [barcode, setBarcode] = useState('' || form?.barcode)
  const [wooCode, setWooCode] = useState('' || form?.wooCode)
  const [salePrice, setSalePrice] = useState(0 || form?.salePrice)
  const [costPrice, setCostPrice] = useState('' || form?.costPrice)
  const [lastcostPrice, setLastcostPrice] = useState('' || form?.lastcostPrice)
  const [bagtaxPrice, setBagtaxPrice] = useState('' || form?.bagtaxPrice)
  const [observations, setObservations] = useState('' || form?.observations)
  const [isInventory, setisInventory] = useState('' || form?.isInventory)
  const [isFavorite, setisFavorite] = useState('' || form?.isFavorite)
  const [isAiu, setisAiu] = useState('' || form?.isAiu)
  const [isActive, setisActive] = useState('' || form?.isActive)
  const [paramsgroups, setParamsgroups] = useState<Group[]>([])
  const [selectedparamsgroups, setSelectedParamsgroups]: any = useState(
    new Set(['Grupos' || form?.group.name  ])
  )

  const group = useMemo(() => {
    if (form?.group && form.group.name) {
      return form.group.name
    } else {
      return 'Grupos'
    }
  }, [form])
  const pargroup = useMemo(
    () =>
      paramsgroups.find(
        element => element.id.toString() === Array.from(selectedparamsgroups)[0]
      )?.name,
    [paramsgroups, selectedparamsgroups]
  )
  const groupid = Array.from<number>(selectedparamsgroups)[0]

  const [paramsTaxs, setParamsTaxs] = useState<Tax[]>([])
  const [selectedParamsTaxs, setSelectedParamsTaxs]: any = useState(
    new Set(['Impusto' || form?.tax.name  ])
  )

  const tax = useMemo(() => {
    if (form?.tax && form.tax.name) {
      return form.tax.name
    } else {
      return 'Impuesto'
    }
  }, [form])

  const partax = useMemo(
    () =>
      paramsTaxs.find(
        element => element.id.toString() === Array.from(selectedParamsTaxs)[0]
      )?.name,
    [paramsTaxs, selectedParamsTaxs]
  )
  const taxListid = Array.from<number>(selectedParamsTaxs)[0]

  const bodyApi = {
    id: 0,
    name,
    code,
    barcode,
    wooCode,
    salePrice,
    costPrice:parseInt(costPrice.toString()) ,
    lastcostPrice:parseInt(lastcostPrice.toString()) ,
    bagtaxPrice: parseInt(bagtaxPrice.toString()),
    observations,
    isInventory,
    isFavorite,
    isAiu,
    isActive,
    group: {
      id: parseInt(groupid.toString()),
      name: pargroup
    },
    tax: {
      id: parseInt(taxListid.toString()),
      name: partax
    }
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    setIsLoading(true)
    console.log(bodyApi)
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
    if (method === 'editar') {
      if (form?.group.id) {
        setSelectedParamsgroups(new Set([form.group.id.toString()]))
      } else {
        setSelectedParamsgroups(new Set<string>())
      }
    }
    if (method === 'editar') {
      if (form?.tax.id) {
        setSelectedParamsTaxs(new Set([form.tax.id.toString()]))
      } else {
        setSelectedParamsTaxs(new Set<string>())
      }
    }
    if (paramsgroups.length === 0) {
      valualApi
        .get(`items/params/?apikey=${apikey}&companyId=${companyId}`)
        .then(response => {
          if (response.status === 200) {
            setParamsgroups(response.data.groups)
            setIsLoading(false)
            console.log(paramsgroups)
          }
        })
        .catch(error => console.log(error))
    }

    if (paramsTaxs.length === 0) {
      valualApi
        .get(`items/params/?apikey=${apikey}&companyId=${companyId}`)
        .then(response => {
          if (response.status === 200) {
            setParamsTaxs(response.data.taxes)
            setIsLoading(false)
            console.log(paramsTaxs)
          }
        })
        .catch(error => console.log(error))
    }
  }, [method, form, statusSession, replace, paramsgroups, paramsTaxs])

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
          <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
            <div>
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
          </div>
        </div>
        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div>
            <label htmlFor="location" className="text-gray-500">
              Código de barras
            </label>
            <Input
              id="barcode"
              size="lg"
              radius="sm"
              className="mt-2"
              value={barcode}
              onValueChange={setBarcode}
            />
          </div>
          <div>
            <label htmlFor="code" className="text-gray-500">
              Código Woo
            </label>
            <Input
              id="wooCode"
              size="lg"
              radius="sm"
              className="mt-2"
              value={wooCode}
              onValueChange={setWooCode}
            />
          </div>
        </div>
        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div>
            <label htmlFor="location" className="text-gray-500">
              Precio de Venta
            </label>
            <Input
              type="text"
              id="salePrice"
              size="lg"
              radius="sm"
              className="mt-2"
              value={salePrice}
              onValueChange={setSalePrice}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
          </div>
          <div>
            <label htmlFor="code" className="text-gray-500">
              Precio de Coste
            </label>
            <Input
              id="costPrice"
              size="lg"
              radius="sm"
              className="mt-2"
              value={costPrice}
              onValueChange={setCostPrice}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
          </div>
        </div>

        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div>
            <label htmlFor="location" className="text-gray-500">
              Ultimo Coste Precio
            </label>
            <Input
              id="lastcostPrice"
              size="lg"
              radius="sm"
              className="mt-2"
              value={lastcostPrice}
              onValueChange={setLastcostPrice}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
          </div>
          <div>
            <label htmlFor="location" className="text-gray-500">
              Impuesto en la bolsa
            </label>
            <Input
              id="bagtaxPrice"
              size="lg"
              radius="sm"
              className="mt-2"
              value={bagtaxPrice}
              onValueChange={setBagtaxPrice}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">
                    <TbMoneybag />
                  </span>
                </div>
              }
            />
          </div>
        </div>
        <div className="container my-5">
          <label htmlFor="description" className="text-gray-500">
            Observación
          </label>
          <Textarea
            id="observations"
            size="lg"
            radius="sm"
            className="mt-2"
            value={observations}
            onValueChange={setObservations}
          />
        </div>
        <div className="container my-5 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
          <div className="grid ">
            <label className="text-gray-500">Control de Inventario</label>
            <Switch
            id="isInventory"
              className="mt-2"
              isSelected={isInventory}
              onValueChange={setisInventory}
            />
          </div>
          <div className="grid ">
            <label className="text-gray-500">Favortio</label>
            <Switch
            id="isFavorite"

              className="mt-2"
              isSelected={isFavorite}
              onValueChange={setisFavorite}
            />
          </div>
          <div className="grid ">
            <label className="text-gray-500">AIU</label>
            <Switch
            id="isAiu"

              className="mt-2"
              isSelected={isAiu}
              onValueChange={setisAiu}
            />
          </div>
          <div className="grid ">
            <label className="text-gray-500">Estado</label>
            <Switch
            id="isActive"

              className="mt-2"
              isSelected={isActive}
              onValueChange={setisActive}
            />
          </div>
        </div>
        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div>
            <h2 className="text-gray-500 my-3">Grupo</h2>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  className="capitalize w-full"
                  size="lg"
                  radius="sm"
                  color={pargroup !== undefined ? color : 'default'}
                >
                  {pargroup !== undefined
                    ? pargroup
                    : pargroup !== undefined || method === 'editar'
                    ? group
                    : 'Grupo'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Selección de grupo"
                variant={'flat'}
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedparamsgroups}
                onSelectionChange={setSelectedParamsgroups}
              >
                {paramsgroups.length !== 0 ? (
                  paramsgroups.map(element => (
                    <DropdownItem key={element.id.toString()}>
                      {element.name}
                    </DropdownItem>
                  ))
                ) : (
                  <DropdownItem>NAME</DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>

          <div>
            <h2 className="text-gray-500 my-3">Impuesto</h2>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  className="capitalize w-full"
                  size="lg"
                  radius="sm"
                  color={partax !== undefined ? color : 'default'}
                >
                  {partax !== undefined
                    ? partax
                    : partax !== undefined || method === 'editar'
                    ? tax
                    : 'Impuesto'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Selección Impuesto"
                variant={'flat'}
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedParamsTaxs}
                onSelectionChange={setSelectedParamsTaxs}
              >
                {paramsTaxs.length !== 0 ? (
                  paramsTaxs.map(element => (
                    <DropdownItem key={element.id.toString()}>
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

      <div className="mb-5 p-5 w-full flex justify-center">
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
