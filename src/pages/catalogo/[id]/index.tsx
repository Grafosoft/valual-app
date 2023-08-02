import { NextPage, GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { ItemsList } from '../../../../interfaces/items/itemsList'
import { ItemsDetailsHeader } from '../../../../layout/items/itemsDetailsHeader'
import valualApi from '@/apis/valualApi'

interface Props {
    data: ItemsList
    id: string | undefined
    apikey: string | undefined
    companyId: string | undefined

  }

  const Init: NextPage<Props> = ({ data, id, apikey }) => {
    const { status } = useSession()
    const { replace } = useRouter()
  
    useEffect(() => {
      status === 'unauthenticated' && replace('/')
    }, [status, replace])

    return(
        <>
        <Head>
          <title>{data.name}</title>
        </Head>
        <ItemsDetailsHeader data={data} />
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ctx => {
    let id = ctx.params?.id || ''
    const apikey = ctx.query.apikey?.toString() || ''
        const companyId = ctx.query.companyId || '0'

  
 
    const response = await valualApi.get<ItemsList>(
        `items/${id}/?companyId=${companyId}&apikey=${ctx.query.apikey}`
    )
  
    console.log( `items/${id}/?companyId=${companyId}&apikey=${ctx.query.apikey}`)
    if (!response ) {
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
        companyId: ctx.query?.companyId, 

      }
    }
  }
  export default Init