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
  Divider,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Spacer,
  CircularProgress
} from '@nextui-org/react'
import { ContactsDetailsList } from '../../../../interfaces/contacts/contactsDetailsList'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, {
  useEffect,
  useState,
  useMemo,
  MouseEventHandler,
  FormEventHandler,
  ChangeEvent
} from 'react'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { AccountType, IdentificationType } from '@/global/params/paramsContacts'
import { CityList } from '../../../../interfaces/city/cityList'
import { FaCity } from 'react-icons/fa'
import { TbSearch } from 'react-icons/tb'
import { cityColumns } from '@/global/city/cityColumns'
import { RenderCellCity } from '../../../../layout/city/RenderCellCity'

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

  const partype = useMemo(
    () =>
      paramstype.find(
        element => element.id.toString() === Array.from(selectedparamstype)[0]
      )?.name,
    [paramstype, selectedparamstype]
  )
  const [identification, setIdentification] = useState(
    '' || form.identification
  )
  const [commercialName, setCommercialName] = useState(
    '' || form.commercialName
  )
  const [firstName, setFirstName] = useState('' || form.firstName)
  const [middleName, setMiddleName] = useState('' || form.middleName)
  const [firstSurname, setFirstSurname] = useState('' || form.firstSurname)
  const [secondSurname, setSecondSurname] = useState('' || form.secondSurname)
  const [email, setEmail] = useState('' || form.email)
  const [phone, setPhone] = useState('' || form.phone)
  const [adress, setAdress] = useState('' || form.adress)
  const [observations, setObservations] = useState('' || form.observations)
  const [commercialCode, setCommercialCode] = useState(
    '' || form.commercialCode
  )
  const [birthDate, setBirthDate] = useState(currentDate || form.birthDate)
  const [createDate, setCreateDate] = useState(
    currentDate || form.createDate?.substring(0, 10)
  )
  const [postalCode, setPostalCode] = useState('' || form.postalCode)
  const [isTaxResident, setIsTaxResident] = useState('' || form.isTaxResident)
  const [isActive, setIsActive] = useState('' || form.isActive)

  const [paramsidentificationType, setParamsidentificationType] = useState<
    IdentificationType[]
  >([])
  const [selectedidentificationType, setSelectedIdentificationType]: any =
    useState(
      new Set(['Tipo de Identificacion' || form?.identificationType.name])
    )

  const paridentificationType = useMemo(
    () =>
      paramsidentificationType.find(
        element =>
          element.id.toString() === Array.from(selectedidentificationType)[0]
      )?.name,
    [paramsidentificationType, selectedidentificationType]
  )
  const identificationTypeid = Array.from<number>(selectedidentificationType)[0]
  const [cityList, setCityList] = useState<CityList[]>([])
  const {
    isOpen: isOpenCity,
    onOpen: onOpenCity,
    onOpenChange: onOpenChangeCity
  } = useDisclosure()
  const [isLoadingModalCity, setIsLoadingModalCity] = useState(true)
  const [citySearch, setCitySearch] = useState({
    id: '' || form.city?.id.toString(),
    code: '' || form.city?.code,
    name: '' || form.city?.name
  })
  const [searchCity, setSearchCity] = useState('')

  const handleSubmitCity: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    setIsLoadingModalCity(true)

    valualApi
      .get<CityList[]>(
        `settings/cities/?page=0&apikey=${apikey}&name=${searchCity}`
      )
      .then(response => {
        if (response.status === 200) {
          setCityList(response.data)
          setIsLoadingModalCity(false)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const [paramsperson, setParamsperson] = useState<AccountType[]>([])
  const [selectedparamsperson, setSelectedParamsperson]: any = useState(
    new Set(['Persona' || form?.tax.person])
  )
  const parperson = useMemo(
    () =>
      paramsperson.find(
        element => element.id.toString() === Array.from(selectedparamsperson)[0]
      )?.name,
    [paramsperson, selectedparamsperson]
  )

  const [paramsregime, setParamsregime] = useState<AccountType[]>([])
  const [selectedparamsregime, setSelectedParamsregime]: any = useState(
    new Set(['Regimen' || form?.tax.regime])
  )
  const parregime = useMemo(
    () =>
      paramsregime.find(
        element => element.id.toString() === Array.from(selectedparamsregime)[0]
      )?.name,
    [paramsregime, selectedparamsregime]
  )


  const [paramsresponsibility, setParamsresponsibility] = useState<AccountType[]>([])
  const [selectedparamsresponsibility, setSelectedParamsresponsibility]: any = useState(
    new Set(['Responsabilidad' || form?.tax.responsibility])
  )
  const parresponsibility = useMemo(
    () =>
    paramsresponsibility.find(
        element => element.id.toString() === Array.from(selectedparamsresponsibility)[0]
      )?.name,
    [paramsresponsibility, selectedparamsresponsibility]
  )

  const [paramsbank, setParamsbank] = useState<AccountType[]>([])
  const [selectedparamsbank, setSelectedParamsbank]: any = useState(
    new Set(['Tipo de Cuenta' || form?.bank.type])
  )
  const parbank= useMemo(
    () =>
    paramsbank.find(
        element => element.id.toString() === Array.from(selectedparamsbank)[0]
      )?.name,
    [paramsbank, selectedparamsbank]
  )



  const [website, setWebsite] = useState('' || form.media?.website)
  const [linkedin, setLinkedin] = useState('' || form.media?.linkedin)
  const [facebook, setFacebook] = useState('' || form.media?.facebook)
  const [instagram, setInstagram] = useState('' || form.media?.instagram)
  const [whatsapp, setWhatsapp] = useState('' || form.communication?.whatsapp)

  const bodyApi = {
    id: 0,
    type: partype,
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
    identificationType: {
      id: identificationTypeid,
      name: paridentificationType
    },
    city: {
      id: parseInt(citySearch.id?.toString()),
      code: citySearch.code,
      name: citySearch.name
    },
    tax: {
      person:parperson,
      regime:parregime,
      responsibility:parresponsibility

    },
    activity: {},
    bank: {},
    priceList: {}
  }
  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    setIsLoading(true)
    console.log(bodyApi)
    if (method === 'crear') {
      // valualApi
      //   .post(`contacts/?companyId=${companyId}&apikey=${apikey}`, bodyApi)
      //   .then(response => {
      //     if (response.status === 200) {
      //       setIsLoading(false)
      //       window.location.replace(
      //         `/contactos?companyId=${companyId}&apikey=${apikey}`
      //       )
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
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
    if (statusSession === 'unauthenticated') {
      replace('/');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await valualApi.get(`contacts/params/?apikey=${apikey}&companyId=${companyId}`);
        if (response.status === 200) {
          const responseData = response.data;

          setIsLoading(false);

          if (method === 'editar') {
            const { type, identificationType, tax,bank } = form;

            setSelectedParamstype(type ? new Set([type]) : new Set<string>());
            setSelectedIdentificationType(
              identificationType?.id ? new Set([identificationType.id.toString()]) : new Set<string>()
            );
            setSelectedParamsperson(tax?.person ? new Set([tax.person]) : new Set<string>());
            setSelectedParamsregime(tax?.regime ? new Set([tax.regime]) : new Set<string>());
            setSelectedParamsresponsibility(tax?.responsibility ? new Set([tax.responsibility]) : new Set<string>());
            setSelectedParamsbank(bank?.type ? new Set([bank.type]) : new Set<string>());


          }

          if (paramstype.length === 0) setParamstype(responseData.types);
          if (paramsidentificationType.length === 0) setParamsidentificationType(responseData.identificationTypes);
          if (paramsperson.length === 0) setParamsperson(responseData.persons);
          if (paramsregime.length === 0) setParamsregime(responseData.regimes);
          if (paramsresponsibility.length === 0) setParamsresponsibility(responseData.responsibilities);
          if (paramsbank.length === 0) setParamsresponsibility(responseData.accountTypes);


        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [method, form, statusSession, replace]);




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
            <div>
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
          </div>
        </div>
        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div>
            <label className="text-gray-500 ">
              Tipo de Identificacion Tercero
            </label>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  className="capitalize w-full mt-2"
                  size="lg"
                  radius="sm"
                  color={paridentificationType !== undefined ? color : 'default'}
                >
                  {paridentificationType !== undefined
                    ? paridentificationType
                    : paridentificationType !== undefined || method === 'editar'
                    ? paridentificationType
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
            </Dropdown>
          </div>

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
        <div className="container my-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div>
            <h2 className="text-gray-500">Ciudad</h2>
            <Input
              aria-label="Buscar ciudad"
              readOnly={true}
              placeholder="Buscar ciudad"
              onClick={onOpenCity}
              value={citySearch.name}
              startContent={<FaCity />}
              style={{ cursor: 'pointer' }}
              size="lg"
              className="mt-2"
              radius="sm"
            />
            <Modal
              closeButton
              size="5xl"
              scrollBehavior="inside"
              backdrop="blur"
              style={{ width: '1000px' }}
              isOpen={isOpenCity}
              onOpenChange={onOpenChangeCity}
            >
              <ModalContent>
                {onClose => {
                  if (cityList.length === 0) {
                    valualApi
                      .get<CityList[]>(
                        `/settings/cities?page=0&apikey=${apikey}&name=`
                      )
                      .then(response => {
                        if (response.status === 200) {
                          setCityList(response.data)
                          setIsLoadingModalCity(false)
                        }
                      })
                      .catch(error => {
                        console.log(error)
                      })
                  }

                  return (
                    <>
                      <ModalHeader>
                        <div className="container">
                          <h2
                            id="modal-title"
                            className="flex justify-center py-5 text-3xl font-bold"
                          >
                            Listado de Ciudad
                          </h2>
                          <Spacer y={1} />
                          <form onSubmit={handleSubmitCity}>
                            <Input
                              aria-label="Buscar ciudad"
                              placeholder="Buscar ciudad"
                              value={searchCity}
                              width="100%"
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setSearchCity(e.target.value)
                              }
                              startContent={<TbSearch />}
                              size="md"
                            />
                          </form>
                        </div>
                      </ModalHeader>
                      <ModalBody>
                        {isLoadingModalCity ? (
                          <div
                            className="container"
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignContent: 'center',
                              alignItems: 'center',
                              height: '100%'
                            }}
                          >
                            <CircularProgress size="lg" color={'warning'} />
                          </div>
                        ) : (
                          <Table
                            aria-label="Lista de terceros"
                            style={{ height: 'auto', minWidth: '100%' }}
                            isStriped
                            shadow="none"
                          >
                            <TableHeader columns={cityColumns}>
                              {column => (
                                <TableColumn key={column.uid} align="start">
                                  {column.name}
                                </TableColumn>
                              )}
                            </TableHeader>
                            <TableBody
                              emptyContent="No hay datos por mostrar."
                              items={cityList}
                            >
                              {item => (
                                <TableRow key={item.id}>
                                  {columnKey => (
                                    <TableCell>
                                      <RenderCellCity
                                        searchCity={''}
                                        city={item}
                                        columnKey={columnKey}
                                        urlPath="form"
                                        closeHandler={onClose}
                                        setCitySearch={setCitySearch}
                                      />
                                    </TableCell>
                                  )}
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        )}
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          style={{ width: 'auto' }}
                          variant={'flat'}
                          color="danger"
                          onPress={onClose}
                        >
                          Cerrar
                        </Button>
                      </ModalFooter>
                    </>
                  )
                }}
              </ModalContent>
            </Modal>
          </div>
          <div>
            <label className="text-gray-500">Codigo postal</label>
            <Input
              id="postalCode"
              size="lg"
              radius="sm"
              className="mt-2"
              value={postalCode}
              onValueChange={setPostalCode}
            />
          </div>
        </div>

        <Divider />
        <div className="pt-5"></div>
        <h2 className="text-xl lg:text-2xl mb-5 font-semibold">
          Impuesto
        </h2>
        <div className="container my-5 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
        <div>
            <label className="text-gray-500 ">
              Persona
            </label>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  className="capitalize w-full mt-2"
                  size="lg"
                  radius="sm"
                  color={parperson !== undefined ? color : 'default'}
                >
                  {parperson !== undefined
                    ? parperson
                    : parperson !== undefined || method === 'editar'
                    ? parperson
                    : 'Persona'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Selección de Tipo"
                variant={'flat'}
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedparamsperson}
                onSelectionChange={setSelectedParamsperson}
              >
                {paramsperson.length !== 0 ? (
                  paramsperson.map(element => (
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
              Régimen
            </label>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  className="capitalize w-full mt-2"
                  size="lg"
                  radius="sm"
                  color={parregime !== undefined ? color : 'default'}
                >
                  {parregime !== undefined
                    ? parregime
                    : parregime !== undefined || method === 'editar'
                    ? parregime
                    : 'Régimen'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Selección de Tipo"
                variant={'flat'}
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedparamsregime}
                onSelectionChange={setSelectedParamsregime}
              >
                {paramsregime.length !== 0 ? (
                  paramsregime.map(element => (
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
              Responsabilidad
            </label>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  className="capitalize w-full mt-2"
                  size="lg"
                  radius="sm"
                  color={parresponsibility !== undefined ? color : 'default'}
                >
                  {parresponsibility !== undefined
                    ? parresponsibility
                    : parresponsibility !== undefined || method === 'editar'
                    ? parresponsibility
                    : 'Responsabilidad'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Selección de responsabilidad"
                variant={'flat'}
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedparamsresponsibility}
                onSelectionChange={setSelectedParamsresponsibility}
              >
                {paramsresponsibility.length !== 0 ? (
                  paramsresponsibility.map(element => (
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

        <Divider />
        <div className="pt-5"></div>
        <h2 className="text-xl lg:text-2xl mb-5 font-semibold ">
          Opciones
        </h2>

        <div className="container my-5 grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-10">
          <div className="md:col-start-1 md:col-span-4">
          <label className="text-gray-500 ">
              Tipo de banco
            </label>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  className="capitalize w-full mt-2"
                  size="lg"
                  radius="sm"
                  color={parbank !== undefined ? color : 'default'}
                >
                  {parbank !== undefined
                    ? parbank
                    : parbank !== undefined || method === 'editar'
                    ? parbank
                    : 'Tipo de banco'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Selección de Tipo"
                variant={'flat'}
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedparamsbank}
                onSelectionChange={setSelectedParamsbank}
              >
                {paramsbank.length !== 0 ? (
                  paramsbank.map(element => (
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

        <div className="grid  ">
            <label className="text-gray-500 my-3">Tiene impuesto</label>
            <Switch
              size="lg"
              id="isTaxResident"
              className="mt-2"
              isSelected={isTaxResident}
              onValueChange={setIsTaxResident}
            />
          </div>



          </div>

        <div className="container my-5 grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-10">
          <div className="md:col-start-1 md:col-span-4"></div>
            <div className="grid   ">
            <label className="text-gray-500 my-3">Estado</label>
            <Switch
              size="lg"
              id="isActive"
              className="mt-2"
              isSelected={isActive}
              onValueChange={setIsActive}
            />
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
