import { NextPage, GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import valualApi from '@/apis/valualApi'

import { InvoicesDetailsList } from '../../../../../interfaces/invoices/invoicesDetailsList'
import { InvoicesDetails } from '../../../../../layout/invoices/InvoicesDetails'



interface Props {
  data: InvoicesDetailsList
  id: string | undefined
  apikey: string | undefined
  companyId: string | undefined
}

const DetailsInvoices: NextPage<Props> = ({ data, id, apikey }) => {
  const { status } = useSession()
  const { replace } = useRouter()

  useEffect(() => {
    status === 'unauthenticated' && replace('/')
  }, [status, replace])

  return (
    <>
      <Head>
        <title>{data.company.name}</title>
      </Head>
      <InvoicesDetails data={data} />

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  let id = ctx.params?.id || ''
  const apikey = ctx.query.apikey?.toString() || ''
  const companyId = ctx.query.companyId || '0'

  const response = await valualApi.get<InvoicesDetailsList>(
    `invoices/${id}/?companyId=${companyId}&apikey=${ctx.query.apikey}`
  )


  if (!response) {
    return {
      notFound: true,
      redirect: '/404'
    }
  }

  return {
    props: {
      data: response.data,
      apikey,
      id,
      companyId: ctx.query?.companyId
    }
  }
}
export default DetailsInvoices
