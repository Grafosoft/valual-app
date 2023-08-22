import { NextPage, GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import valualApi from '@/apis/valualApi'
import { CompaniesDetailsList } from '../../../../interfaces/companies/companiesDetailsList'
import { ContactsDetails } from '../../../../layout/companies/CompaniesDetails'

interface Props {
  data: CompaniesDetailsList
  apikey: string | undefined
  companyId: string | undefined
}

const DetailsCompanies: NextPage<Props> = ({ data, apikey }) => {
  const { status } = useSession()
  const { replace } = useRouter()

  useEffect(() => {
    status === 'unauthenticated' && replace('/')
  }, [status, replace])

  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>
      <ContactsDetails data={data} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apikey = ctx.query.apikey?.toString() || ''
  let id = ctx.params?.id || ''

  const response = await valualApi.get<CompaniesDetailsList>(
    `companies/${id}/?&apikey=${ctx.query.apikey}`
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
      id
    }
  }
}
export default DetailsCompanies
