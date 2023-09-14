import valualApi from '@/apis/valualApi'
import {
  Button,
  CircularProgress,
  Modal,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from '@nextui-org/react'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { SellersList } from '../../../interfaces/sellers/sellersList'
import { sellersColumns } from '@/global/sellers/sellersColumn'
import { RenderCellSellers } from '../../../layout/sellers/RenderCellSellers'
import { SellersHeadersLayout } from '../../../layout/sellers/SellersHeader'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { RiAddFill } from 'react-icons/ri'
import CreateAndEditSellers from '../../../components/modal/CreateAndEditSellers'

interface Props {
  form: SellersList
  sellers: SellersList[]
  apikey: string | undefined
  companyId: string | undefined
}
const SellersList: NextPage<Props> = ({ sellers, apikey,form, companyId }) => {
  const { status } = useSession()
  const { replace } = useRouter()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)



  useEffect(() => {
    status === 'unauthenticated' && replace('/')
  }, [status, replace])
  return (
    <>
      <Head>
        <title>Vendedores</title>
      </Head>
      <SellersHeadersLayout  sellers={sellers}/>


      <Spacer y={1} />
      <Table
        aria-label="Vendedores"
        style={{ height: 'auto', minWidth: '100%' }}
        isStriped
        shadow="none"
      >
        <TableHeader columns={sellersColumns}>
          {column => <TableColumn key={column.uid}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={sellers}>
          {item => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>
                  <RenderCellSellers apikey={apikey} companyId={companyId} sellers={item} columnKey={columnKey} />
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
        <CreateAndEditSellers form={form}  apikey={apikey} companyId={companyId} method='crear'  />


      </Modal>
    </>
  )
}

export default SellersList

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apikey = ctx.query.apikey?.toString() || ''
  const companyId = ctx.query.companyId?.toString() || ''

  const response = await valualApi.get<SellersList[]>(
    `sellers/?companyId=${companyId}&apikey=${ctx.query.apikey}`
  )

  if (!response) {
    return {
      notFound: true,
      redirect: '/404'
    }
  }

  return {
    props: {
      sellers: response.data,
      apikey,
      companyId
    }
  }
}
