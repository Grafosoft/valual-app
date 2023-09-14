import valualApi from '@/apis/valualApi'
import {
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider
} from '@nextui-org/react'
import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState, useMemo, MouseEventHandler } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { NumerationsList } from '../../../../interfaces/numerations/numerationsList'
import { Software, Status } from '../../../../interfaces/params/paramsNumerations'

interface Props {
  form: NumerationsList
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
  const currentDate = new Date(Date.now()).toISOString().substring(0, 10)

  const titleText =
    method === 'crear' ? `Crear Numeracion` : `Editar Numeracion`
  const [name, setName] = useState('' || form.name)
  const [date, setDate] = useState(form.date || currentDate)
  const [startDate, setStartDate] = useState(form.startDate || currentDate)
  const [dueDate, setDueDate] = useState(form.dueDate || currentDate)

  const [authorization, setAuthorization] = useState('' || form.authorization)
  const [prefix, setPrefix] = useState('' || form.prefix)
  const [fromNumber, setFromNumber] = useState('' || form.fromNumber)
  const [toNumber, setToNumber] = useState('' || form.toNumber)
  const [startNumber, setStartNumber] = useState('' || form.startNumber)
  const [technicalKey, setTechnicalKey] = useState('' || form.technicalKey)

  const [paramsstatus, setParamsstatus] = useState<Status[]>([])
  const [selectedparamsstatus, setSelectedParamsstatus]: any = useState(
    new Set(['Estado' || form?.type.name])
  )
  const parstatus = useMemo(
    () =>
      paramsstatus.find(
        element => element.id.toString() === Array.from(selectedparamsstatus)[0]
      )?.name,
    [paramsstatus, selectedparamsstatus]
  )

  const [paramstype, setParamstype] = useState<Software[]>([])
  const [selectedparamstype, setSelectedParamstype]: any = useState(
    new Set(['Tipo' || form?.type.name])
  )
  const partype = useMemo(
    () =>
      paramstype.find(
        element => element.id.toString() === Array.from(selectedparamstype)[0]
      )?.name,
    [paramstype, selectedparamstype]
  )
  const typeid = Array.from<number>(selectedparamstype)[0]

  const [paramssoftware, setParamssoftware] = useState<Software[]>([])
  const [selectedparamssoftware, setSelectedParamssoftware]: any = useState(
    new Set(['Software' || form.software.name])
  )
  const parsoftware = useMemo(
    () =>
     paramssoftware.find(
        element => element.id.toString() === Array.from(selectedparamssoftware)[0]
      )?.name,
    [paramssoftware, selectedparamssoftware]
  )

  const softwareid = Array.from<number>(selectedparamssoftware)[0]

  const bodyApi = {
    id: 0,
    name,
    date,
    authorization,
    startDate,
    dueDate,
    prefix,
    technicalKey,
    fromNumber: parseInt(fromNumber?.toString()),
    toNumber:parseInt(toNumber?.toString()),
    startNumber:parseInt(startNumber?.toString()),
    status: parstatus,
    type: {
        id:typeid ,
        name:partype
        },
        software: {
            id: softwareid,
            name:parsoftware
            }

  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    setIsLoading(true)
    console.log(bodyApi)

    if (method === 'crear') {
      valualApi
        .post(`numerations/?companyId=${companyId}&apikey=${apikey}`, bodyApi)
        .then(response => {
          if (response.status === 200) {
            setIsLoading(false)
            window.location.replace(
              `/numeracion?companyId=${companyId}&apikey=${apikey}`
            )
          }
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      valualApi
        .put(
          `numerations/${id}?companyId=${companyId}&apikey=${apikey}`,
          bodyApi
        )
        .then(response => {
          if (response.status === 200) {
            setIsLoading(false)
            window.location.replace(
              `/numeracion?companyId=${companyId}&apikey=${apikey}`
            )
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  useEffect(() => {
    if (statusSession === 'unauthenticated') {
      replace('/')
      return
    }

    const fetchData = async () => {
      try {
        const response = await valualApi.get(
          `numerations/params/?apikey=${apikey}&companyId=${companyId}`
        )
        if (response.status === 200) {
          const responseData = response.data

          setIsLoading(false)

          if (method === 'editar') {
            const { type, status, software } = form

            setSelectedParamsstatus(
              status ? new Set([status]) : new Set<string>()
            )

            setSelectedParamstype(
              type?.id ? new Set([type.id.toString()]) : new Set<string>()
            )

            setSelectedParamssoftware(
              software?.id
                ? new Set([software.id.toString()])
                : new Set<string>()
            )
          }

          if (paramsstatus.length === 0) setParamsstatus(responseData.status)

          if (paramstype.length === 0) setParamstype(responseData.types)

          if (paramssoftware.length === 0)
            setParamssoftware(responseData.softwares)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [method, form, statusSession, replace])

  return (
    <>
      <Head>
        <title>{titleText}</title>
      </Head>
      <div className="container my-5 lg:my-8 m-auto">
        <h1 className="text-5xl font-bold text-center p-5">{titleText}</h1>
      </div>

      <div className="container px-5 lg:px-10 m-auto">
        <div className="container m-auto">
          <h2 className="text-xl lg:text-2xl mb-5 font-semibold">
            Datos Generales
          </h2>
          <div className="container my-5 ">
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
          </div>
        </div>
        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div>
            <label htmlFor="authorization" className="text-gray-500">
              Autorizacion
            </label>
            <Input
              id="authorization"
              size="lg"
              radius="sm"
              className="mt-2"
              value={authorization}
              onValueChange={setAuthorization}
            />
          </div>
          <div>
            <label htmlFor="prefix" className="text-gray-500">
              Prefijo
            </label>
            <Input
              id="prefix"
              size="lg"
              radius="sm"
              className="mt-2"
              value={prefix}
              onValueChange={setPrefix}
            />
          </div>
       </div>
       <div className="container my-5 ">
          <div>
            <label htmlFor="technicalKey" className="text-gray-500">
            Clave tecnica
            </label>
            <Input
              id="prefix"
              size="lg"
              radius="sm"
              className="mt-2"
              value={technicalKey}
              onValueChange={setTechnicalKey}
            />
          </div>
          </div>


        <Divider />
        <div className="pt-5"></div>
        <h2 className="text-xl lg:text-2xl mb-5 font-semibold">Periodo</h2>
        <div className="container my-5 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
          <div>
            <label htmlFor="date" className="text-gray-500">
            Fecha
            </label>
            <Input
              id="date"
              size="lg"
              radius="sm"
              type="date"
              className="mt-2"
              value={date}
              onValueChange={setDate}
            />
          </div>
          <div>
            <label htmlFor="startDate" className="text-gray-500">
              Fecha de Inicio
            </label>
            <Input
              id="startDate"
              size="lg"
              radius="sm"
              type="date"
              className="mt-2"
              value={startDate}
              onValueChange={setStartDate}
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="text-gray-500">
              Fecha de Vencimiento
            </label>
            <Input
              id="dueDate"
              size="lg"
              radius="sm"
              type="date"
              className="mt-2"
              value={dueDate}
              onValueChange={setDueDate}
            />
          </div>
        </div>

        <Divider />
        <div className="pt-5"></div>
        <h2 className="text-xl lg:text-2xl mb-5 font-semibold">Rango</h2>
        <div className="container my-5">
          <div>
            <label htmlFor="startNumber" className="text-gray-500">
              Número Inicial
            </label>
            <Input
              type="number"
              id="startNumber"
              size="lg"
              radius="sm"
              className="mt-2"
              value={startNumber}
              onValueChange={setStartNumber}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
          </div>
        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div>
            <label htmlFor="fromNumber" className="text-gray-500">
              Número desde
            </label>
            <Input
              type="number"
              id="fromNumber"
              size="lg"
              radius="sm"
              className="mt-2"
              value={fromNumber}
              onValueChange={setFromNumber}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
          </div>
          <div>
            <label htmlFor="toNumber" className="text-gray-500">
              Número Hasta
            </label>
            <Input
              type="number"
              id="toNumber"
              size="lg"
              radius="sm"
              className="mt-2"
              value={toNumber}
              onValueChange={setToNumber}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
          </div>
        </div>

        </div>
        <Divider />
        <div className="pt-5"></div>
        <h2 className="text-xl lg:text-2xl mb-5 font-semibold">Opciones</h2>
        <div className="container my-5 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">

        <div>
            <label className="text-gray-500 ">
              Estado
            </label>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  className="capitalize w-full mt-2"
                  size="lg"
                  radius="sm"
                  color={
                    parstatus === 'Activa'
                      ? 'success'
                      : parstatus === 'Vencida'
                      ? 'warning'
                      : parstatus === 'Inactiva'
                      ? 'danger'
                      : parstatus === 'Prueba'
                      ? 'primary'
                      : 'default'
                  }

                >
                  {parstatus !== undefined
                    ? parstatus
                    : parstatus !== undefined || method === 'editar'
                    ? parstatus
                    : 'Estado'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Selección de Tipo"
                variant={'flat'}
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedparamsstatus}
                onSelectionChange={setSelectedParamsstatus}
              >
                {paramsstatus.length !== 0 ? (
                  paramsstatus.map(element => (
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
            <label className="text-gray-500 ">
              Tipo
            </label>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  className="capitalize w-full mt-2"
                  size="lg"
                  radius="sm"
                >
                  {partype !== undefined
                    ? partype
                    : partype !== undefined || method === 'editar'
                    ? partype
                    : 'Tipo'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Selección de Tipo"
                variant={'flat'}
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedparamstype}
                onSelectionChange={setSelectedParamstype}
              >
                {paramstype.length !== 0 ? (
                  paramstype.map(element => (
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
            <label className="text-gray-500 ">
              Software
            </label>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  className="capitalize w-full mt-2"
                  size="lg"
                  radius="sm"
                >
                  {parsoftware !== undefined
                    ? parsoftware
                    : parsoftware !== undefined || method === 'editar'
                    ? parsoftware
                    : 'Software'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Selección de software"
                variant={'flat'}
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedparamssoftware}
                onSelectionChange={setSelectedParamssoftware}
              >
                {paramssoftware.length !== 0 ? (
                  paramssoftware.map(element => (
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
    const response = await valualApi.get<NumerationsList>(
      `numerations/${id}/?companyId=${companyId}&apikey=${apikey}`
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
