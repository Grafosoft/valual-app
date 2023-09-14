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
  Modal
} from '@nextui-org/react'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { BanksList } from '../../../interfaces/banks/banksList'
import { banksColumns } from '@/global/banks/banksColumns'
import { RenderCellBanks } from '../../../layout/banks/RenderCellBanks'
import { BanksHeadersLayout } from '../../../layout/banks/BanksHeader'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { RiAddFill } from 'react-icons/ri'
import CreateAndEditBanks from '../../../components/modal/CreateAndEditBanks'

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
  form: BanksList
  apikey: string | undefined
  companyId: string | undefined
}
const BanksList: NextPage<Props> = ({
  banks,
  apikey,
  companyId,
  color,
  form
}) => {
  const { replace } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { status } = useSession()

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
                  <RenderCellBanks
                    apikey={apikey}
                    companyId={companyId}
                    banks={item}
                    columnKey={columnKey}
                  />
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
        <CreateAndEditBanks form={form} color={color} apikey={apikey} companyId={companyId} method='crear'  />


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
