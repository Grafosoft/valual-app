import valualApi from '@/apis/valualApi'
import {
  Button,
  Input,
  Textarea,
  Switch,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider
} from '@nextui-org/react'
import { ContactsDetailsList } from '../../../../interfaces/contacts/contactsDetailsList'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useMemo, MouseEventHandler } from 'react'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { AccountType ,IdentificationType} from '@/global/params/paramsContacts'


interface Props {
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
  form: ContactsDetailsList
  apikey: string | undefined
  companyId: string | undefined
  method: string | undefined
  id?: string | undefined
}
const ContactsCreatePage: NextPage<Props> = ({
  apikey,
  companyId,
  method,
  id,
  form,
  color
}) => {
  const titleText = method === 'crear' ? `Crear Tercero` : `Editar Tercero`
  const currentDate = new Date(Date.now()).toISOString().substring(0, 10)

  const { replace } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { status: statusSession } = useSession()

  const [paramstype, setParamstype] = useState<AccountType[]>([])
  const [selectedparamstype, setSelectedParamstype]: any = useState(
    new Set(['Tipo' || form?.type])
  )
  const type = useMemo(() => {
    if (form?.type ) {
      return form.type
    } else {
      return 'Tipo'
    }
  }, [form])
  const partype = useMemo(
    () =>
    paramstype.find(
        element => element.id.toString() === Array.from(selectedparamstype)[0]
      )?.name,
    [paramstype, selectedparamstype]
  )
  const [identification, setIdentification] = useState('' || form.identification)
  const [commercialName, setCommercialName] = useState('' || form.commercialName)
  const [firstName, setFirstName] = useState('' || form.firstName)
  const [middleName, setMiddleName] = useState('' || form.middleName)
  const [firstSurname, setFirstSurname] = useState('' || form.firstSurname)
  const [secondSurname, setSecondSurname] = useState('' || form.secondSurname)
  const [email, setEmail] = useState('' || form.email)
  const [phone, setPhone] = useState('' || form.phone)
  const [adress, setAdress] = useState('' || form.adress)
  const [observations, setObservations] = useState('' || form.observations)
  const [commercialCode, setCommercialCode] = useState('' || form.commercialCode)
  const [birthDate, setBirthDate] = useState(currentDate || form.birthDate)
  const [createDate, setCreateDate] = useState(currentDate || form.createDate?.substring(0, 10))
  const [postalCode, setPostalCode] = useState('' || form.postalCode)
  const [isTaxResident, setIsTaxResident] = useState('' || form.isTaxResident)
  const [isActive, setisActive] = useState('' || form.isActive)

  const [paramsidentificationType, setParamsidentificationType] = useState<IdentificationType[]>([])
  const [selectedidentificationType, setSelectedIdentificationType]: any = useState(
    new Set(['Tipo de Identificacion' || form?.identificationType.name])
  )
  const identificationType = useMemo(() => {
    if (form?.type ) {
      return form.type
    } else {
      return 'Tipo'
    }
  }, [form])
  const paridentificationType = useMemo(
    () =>
    paramsidentificationType.find(
        element => element.id.toString() === Array.from(selectedidentificationType)[0]
      )?.name,
    [paramsidentificationType, selectedidentificationType]
  )
  const identificationTypeid = Array.from<number>(selectedidentificationType)[0]




  const [website, setWebsite] = useState('' || form.media?.website)
  const [linkedin, setLinkedin] = useState('' || form.media?.linkedin)
  const [facebook, setFacebook] = useState('' || form.media?.facebook)
  const [instagram, setInstagram] = useState('' || form.media?.instagram)



  const [whatsapp, setWhatsapp] = useState('' || form.communication?.whatsapp)



  const bodyApi = {
    id: 0,
    type:partype,
    identification,
    commercialName,
    firstName,
    middleName,
    firstSurname,
    secondSurname,
    email,
    phone,
    adress,
    observations,
    commercialCode,
    birthDate,
    createDate,
    postalCode,
    isTaxResident,
    isActive,
    identificationType:{
      id:identificationTypeid,
      name:paridentificationType,
    },
    city:{
    },
    tax:{
    },
    activity:{

    },
    bank:{

    },
    priceList:{

    }
  }
  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    setIsLoading(true)
    console.log(bodyApi)
    if (method === 'crear') {
      valualApi
        .post(`contacts/?companyId=${companyId}&apikey=${apikey}`, bodyApi)
        .then(response => {
          if (response.status === 200) {
            setIsLoading(false)
              window.location.replace(`/contactos?companyId=${companyId}&apikey=${apikey}`)
          }
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      // valualApi
      //   .put(`contacts/${id}?companyId=${companyId}&apikey=${apikey}`, bodyApi)
      //   .then(response => {
      //     if (response.status === 200) {
      //       setIsLoading(false)
      //       window.location.replace(`/contactos/detalles/${id}/?companyId=${companyId}&apikey=${apikey}`)
      //       console.log(response.data)

      //     }
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    }
  }

  useEffect(() => {
    statusSession === 'unauthenticated' && replace('/')
    if (method === 'editar') {
      if (form.type) {
        setSelectedParamstype(new Set([form.type]))
      } else {
        setSelectedParamstype(new Set<string>())
      }
    }
    if (paramstype.length === 0) {
      valualApi
        .get(`contacts/params/?apikey=${apikey}&companyId=${companyId}`)
        .then(response => {
          if (response.status === 200) {
            setParamstype(response.data.types)
            setIsLoading(false)
            console.log(paramstype)
          }
        })
        .catch(error => console.log(error))
    }
    if (method === 'editar') {
      if (form.identificationType.id) {
        setSelectedIdentificationType(new Set([form.identificationType.id.toString()]))
      } else {
        setSelectedIdentificationType(new Set<string>())
      }
    }
    if (paramsidentificationType.length === 0) {
      valualApi
        .get(`contacts/params/?apikey=${apikey}&companyId=${companyId}`)
        .then(response => {
          if (response.status === 200) {
            setParamsidentificationType(response.data.identificationTypes)
            setIsLoading(false)
            console.log(paramsidentificationType)
          }
        })
        .catch(error => console.log(error))
    }
  }, [method, form, statusSession, replace])





  return(
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
            Informacion
          </h2>
          <div className="container my-5 ">
            <div>
              <label htmlFor="commercialName" className="text-gray-500">
                Nombre Commercial
              </label>
              <Input
                id="commercialName"
                size="lg"
                radius="sm"
                className="mt-2"
                value={commercialName}
                onValueChange={setCommercialName}
              />
            </div>
            <div >
            <h2 className="text-gray-500 my-3">Tipo de Tercero</h2>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  className="capitalize w-full"
                  size="lg"
                  radius="sm"
                  color={partype !== undefined ? color : 'default'}
                >
                  {partype !== undefined
                    ? partype
                    : partype !== undefined || method === 'editar'
                    ? type
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
          </div>
        </div>
        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <div>
          <label className="text-gray-500 ">Tipo de Identificacion Tercero</label>
            <Dropdown>
              <DropdownTrigger>
                <Button

                  variant="flat"
                  className="capitalize w-full mt-2"
                  size="lg"
                  radius="sm"
                  color={identificationType !== undefined ? color : 'default'}
                >
                  {paridentificationType !== undefined
                    ? paridentificationType
                    : paridentificationType !== undefined || method === 'editar'
                    ? identificationType
                    : 'Tipo Identificacion'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Selección de Tipo"
                variant={'flat'}
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedidentificationType}
                onSelectionChange={setSelectedIdentificationType}
              >
                {paramsidentificationType.length !== 0 ? (
                  paramsidentificationType.map(element => (
                    <DropdownItem key={element.id.toString()}>
                      {element.name}
                    </DropdownItem>
                  ))
                ) : (
                  <DropdownItem>NAME</DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown></div>

        <div>
            <label htmlFor="identification" className="text-gray-500">
              Identificacion
            </label>
            <Input
              id="identification"
              size="lg"
              radius="sm"
              className="mt-2"
              value={identification}
              onValueChange={setIdentification}
            />
          </div>
        </div>

        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">

        <div>
            <label htmlFor="firstName" className="text-gray-500">
              Primer Nombre
            </label>
            <Input
              id="firstName"
              size="lg"
              radius="sm"
              className="mt-2"
              value={firstName}
              onValueChange={setFirstName}
            />
          </div>
          <div>
            <label htmlFor="middleName" className="text-gray-500">
              Segundo nombre
            </label>
            <Input
              id="middleName"
              size="lg"
              radius="sm"
              className="mt-2"
              value={middleName}
              onValueChange={setMiddleName}
            />
          </div>
        </div>
        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <div>
            <label htmlFor="firstSurname" className="text-gray-500">
              Primer Apellido
            </label>
            <Input
              id="firstSurname"
              size="lg"
              radius="sm"
              className="mt-2"
              value={firstSurname}
              onValueChange={setFirstSurname}
            />
          </div>
          <div>
            <label htmlFor="secondSurname" className="text-gray-500">
              Segundo Apellido
            </label>
            <Input
              id="secondSurname"
              size="lg"
              radius="sm"
              className="mt-2"
              value={secondSurname}
              onValueChange={setSecondSurname}
            />
          </div>
        </div>
        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <div>
            <label htmlFor="firstSurname" className="text-gray-500">
              Primer Apellido
            </label>
            <Input
              id="firstSurname"
              size="lg"
              radius="sm"
              className="mt-2"
              value={firstSurname}
              onValueChange={setFirstSurname}
            />
          </div>
          <div>
            <label htmlFor="secondSurname" className="text-gray-500">
              Segundo Apellido
            </label>
            <Input
              id="secondSurname"
              size="lg"
              radius="sm"
              className="mt-2"
              value={secondSurname}
              onValueChange={setSecondSurname}
            />
          </div>
        </div>



        <Divider />
        <div className="pt-5"></div>

        <h2 className="text-xl lg:text-2xl mb-5 font-semibold">
            Datos Generales
          </h2>
        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <div>
            <label htmlFor="email" className="text-gray-500">
             Email
            </label>
            <Input
              id="email"
              size="lg"
              radius="sm"
              className="mt-2"
              value={email}
              onValueChange={setEmail}
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-gray-500">
             Telefono
            </label>
            <Input
              id="phone"
              size="lg"
              radius="sm"
              className="mt-2"
              value={phone}
              onValueChange={setPhone}
            />
          </div>
        </div>

        <div className="container my-5">
          <label htmlFor="observations" className="text-gray-500">
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

        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <div>
            <label htmlFor="adress" className="text-gray-500">
             Direccion
            </label>
            <Input
              id="email"
              size="lg"
              radius="sm"
              className="mt-2"
              value={adress}
              onValueChange={setAdress}
            />
          </div>
          <div>
            <label htmlFor="commercialCode" className="text-gray-500">
             Codigo Comercial
            </label>
            <Input
              id="commercialCode"
              size="lg"
              radius="sm"
              className="mt-2"
              value={commercialCode}
              onValueChange={setCommercialCode}
            />
          </div>
        </div>
        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
            <div>
              <label htmlFor="birthDate" className="text-gray-500">
                Fecha de nacimiento
              </label>
              <Input
                id="birthDate"
                size="lg"
                radius="sm"
                type="date"
                className="mt-2"
                value={birthDate}
                onValueChange={setBirthDate}
              />
            </div>
            <div>
              <label htmlFor="createDate" className="text-gray-500">
                Fecha de Creaciom
              </label>
              <Input
                id="createDate"
                size="lg"
                radius="sm"
                type="date"
                className="mt-2"
                value={createDate}
                onValueChange={setCreateDate}
              />
            </div>
            </div>
        <Divider />
        <div className="pt-5"></div>


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
export default ContactsCreatePage

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
    const response = await valualApi.get<ContactsDetailsList>(
      `contacts/${id}/?companyId=${companyId}&apikey=${apikey}`
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
