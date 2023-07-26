import { GetServerSideProps, NextPage } from "next"
import { ItemsList } from "../../../interfaces/items/itemsList"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useEffect } from 'react'
import valualApi from "@/apis/valualApi"
import Head from "next/head"
import { CatalHeaderLayout } from "../../../layout/items/itemsHeader"


interface Props {
    subs: ItemsList[]
    apikey: string | undefined
  }
  
  const CatalogueList : NextPage<Props> = ({ subs, apikey }) => {
    const { status } = useSession()
    const { replace } = useRouter()
  
    useEffect(() => {
      status === 'unauthenticated' && replace('/')
    }, [status])

return (
  <>
    <Head>
      <title>Catologo

      </title>
    </Head>
    <CatalHeaderLayout subs={subs}  apikey={apikey} />

    <h1></h1>
    </>
    )

  }
  

    export const getServerSideProps: GetServerSideProps = async ctx => {
       
        const name = ctx.query.name || ''
      
       
      
        const response = await valualApi.get<ItemsList>(
          `items/?companyId=2&apikey=${ctx.query.apikey}&page=0&name=${name}`
        )
      
            console.log(response.data)

        if (!response ) {
          return { notFound: true, redirect: '/404' }
        }
      
        return {
          props: {
            subs: response.data,
            
            apikey: ctx.query?.apikey
          }
        }
    }
    

export default CatalogueList
