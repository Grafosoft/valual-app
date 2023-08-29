import valualApi from '@/apis/valualApi'
import {
  Button,
  CircularProgress,
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
  ModalFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody} from '@nextui-org/react'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState,useMemo } from 'react'
import { BanksList } from '../../../interfaces/banks/banksList'
import { banksColumns } from '@/global/banks/banksColumns'
import { RenderCellBanks } from '../../../layout/banks/RenderCellBanks'
import { BanksHeadersLayout } from '../../../layout/banks/BanksHeader'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Type } from '@/global/params/paramsBanks'
import { RiAddFill } from 'react-icons/ri'

interface Props {
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
  banks: BanksList[]
  apikey: string | undefined
  companyId: string | undefined
}
const BanksList: NextPage<Props> = ({ banks, apikey, companyId, color }) => {
  const { replace } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [name, setName] = useState()
  const { status } = useSession()
  const [typeList, setTypeList] = useState<Type[]>([])

  const [selectedTypeList, setSelectedTypeList]: any = useState(
    new Set(['Nombre tipo de banco'])
  )
  const type = useMemo(
    () =>
      typeList.find(
        element => element.id.toString() === Array.from(selectedTypeList)[0]
      )?.name,
    [typeList, selectedTypeList]
  )
  const priceListid = Array.from<string>(selectedTypeList)[0]

  const bodyApi = {
    id: 0,
    name: name,
    type: {
      id: priceListid.toString(),
      name: type
    }
  }
  const handleClick = async () => {
    setIsLoading(true)
    console.log(bodyApi)
    console.log(priceListid)

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
  }


  useEffect(() => {
    status === 'unauthenticated' && replace('/')
  }, [status, replace])

  return (
    <>
      <Head>
        <title>Bancos</title>
      </Head>
      <BanksHeadersLayout banks={banks} />
      <Spacer y={1} />
      <Table
        aria-label="Bancos"
        style={{ height: 'auto', minWidth: '100%' }}
        isStriped
        shadow="none"
      >
        <TableHeader columns={banksColumns}>
          {column => <TableColumn key={column.uid}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={banks}>
          {item => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>
                  <RenderCellBanks banks={item} columnKey={columnKey} />
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
        aria-label="Crear bancos"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
      >
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
                      Crear Bancos
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
                              Nombre tipo de banco
                            </label>
                            <Dropdown>
                              <DropdownTrigger>
                                <Button
                                  variant="flat"
                                  className="capitalize w-full"
                                  size="lg"
                                  radius="sm"
                                  color={type !== undefined ? color : 'default'}
                                >
                                  {type !== undefined
                                    ? type
                                    : 'Nombre tipo de banco'}
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu
                                aria-label="Selección de tipo de banco"
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
      </Modal>

    </>
  )
}

export default BanksList

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apikey = ctx.query.apikey?.toString() || ''
  const companyId = ctx.query.companyId?.toString() || ''

  const response = await valualApi.get<BanksList[]>(
    `banks/?companyId=${companyId}&apikey=${ctx.query.apikey}`
  )

  if (!response) {
    return {
      notFound: true,
      redirect: '/404'
    }
  }

  return {
    props: {
      banks: response.data,
      apikey,
      companyId
    }
  }
}
