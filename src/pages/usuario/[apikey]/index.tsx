import { NextPage, GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import valualApi from '@/apis/valualApi'
import { UserList } from '../../../../interfaces/user/userList'
import { UsersDetails } from '../../../../layout/users/UsersDetails'

interface Props {
  data: UserList
  apikeyUrl: string | undefined
  apikey: string | undefined
}

const DetailsUser: NextPage<Props> = ({ data, apikey }) => {
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
      <UsersDetails data={data} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apikeyUrl = ctx.query.apikeyUrl?.toString() || ''

  let apikey = ctx.params?.apikey || ''

  const response = await valualApi.get<UserList>(
    `users/${apikey}?&apikey=${ctx.query.apikeyUrl}`
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
      apikeyUrl,
      apikey
    }
  }
}
export default DetailsUser
