import valualApi from '@/apis/valualApi'
import { PaginationList } from '../../../components/pagination/PaginationList'
import {
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FilesList } from '../../../interfaces/files/filesList'
import { FilesHeaderLayout } from '../../../layout/files/FilesHeader'
import { filesColumns } from '@/global/files/filesColumns'
import { RenderCellFiles } from '../../../layout/files/RenderCellFiles'

interface Props {
  files: FilesList[]
  apikey: string | undefined
  companyId: string | undefined
  page: string | undefined
}

const FilesList: NextPage<Props> = ({ files, apikey, companyId, page }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const { status } = useSession()
  const { replace } = useRouter()

  useEffect(() => {
    setCurrentPage(parseInt(page || '0') + 1)
    status === 'unauthenticated' && replace('/')
  }, [replace, status, page])

  return (
    <>
      <Head>
        <title>Archivos</title>
      </Head>
      <FilesHeaderLayout files={files} apikey={apikey} companyId={companyId} />
      <Spacer y={1} />
      <Table
        aria-label="Lista de Clientes"
        style={{ height: 'auto', minWidth: '100%' }}
        isStriped
        shadow="none"
      >
        <TableHeader columns={filesColumns}>
          {column => <TableColumn key={column.uid}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={files} emptyContent={'No hay datos por mostrar.'}>
          {item => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>
                  <RenderCellFiles files={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationList
        urlBack={`archivos/?companyId=${companyId}&apikey=${apikey}&page=${
          currentPage - 2
        }`}
        urlNext={`archivos/?companyId=${companyId}&apikey=${apikey}&page=${currentPage}`}
        currentPage={currentPage}
        color={'primary'}
      />
    </>
  )
}

export default FilesList

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apikey = ctx.query.apikey?.toString() || ''
  const companyId = ctx.query.companyId?.toString() || ''
  const name = ctx.query.name?.toString() || ''
  const page = ctx.query.page || '0'

  const response = await valualApi.get<FilesList[]>(
    `files/?companyId=${companyId}&apikey=${ctx.query.apikey}&page=${page}&name=${name}`
  )

  if (!response) {
    return {
      notFound: true,
      redirect: '/404'
    }
  }

  return {
    props: {
      files: response.data,
      apikey,
      companyId,
      page
    }
  }
}
