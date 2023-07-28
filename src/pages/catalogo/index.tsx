import { GetServerSideProps, NextPage } from "next"
import { ItemsList } from "../../../interfaces/items/itemsList"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useEffect } from 'react'
import valualApi from "@/apis/valualApi"
import Head from "next/head"

import { CatalHeaderLayout } from "../../../layout/items/itemsHeader"
import {  Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { columns } from "@/global/items/itemsColumns"
import { RenderCell } from "../../../layout/items/RenderCell"
import { PaginationList } from "../../../components/pagination/PaginationList"



interface Props {
  items: ItemsList[]
    apikey: string | undefined
    companyId: string | undefined
    page: string | undefined


  } 


  
  const CatalogueList : NextPage<Props> = ({ items,  apikey, companyId ,page }) => {

    const [currentPage, setCurrentPage] = React.useState(0)
    const { data , status } = useSession()
    const { replace  } = useRouter()

    useEffect(() => {
      setCurrentPage(parseInt(page || '0') + 1)
      status === 'unauthenticated' && replace('/')
    }, [status, replace, page])

    useEffect(() => {
      if (!localStorage.getItem('apikey')) {
        localStorage.setItem('apikey', data?.user.apikey || '')
      }
  
      if (!localStorage.getItem('companyId')) {
        localStorage.setItem('companyId', data?.user.companyId?.toString() || '')
      }
    }, [data?.user.apikey, data?.user.companyId])
    let firstName = ''
  
    const dataWord = data?.user.name?.split(' ') || 'Usuario'
    firstName = dataWord[0]

  
   
return (
  <>
    <Head>  
      <title>Catologo

      </title>
    </Head>
    <CatalHeaderLayout items={items}  apikey={apikey}  companyId={companyId}/>
<Table
        aria-label="Lista de Productos"
        style={{ height: 'auto', minWidth: '100%' }}
        isStriped
      >
        <TableHeader columns={columns}>
          {column => (
            <TableColumn
              key={column.uid}

            >
          <p style={{textAlign: column.uid === 'costPrice' || column.uid === 'salePrice' || column.uid === 'tax'  ? 'right' : 'left' }}> {column.name} </p>    
          
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent={'No hay datos por mostrar.'}>
          {item => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>
                  <RenderCell
                    user={item}
                    columnKey={columnKey}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationList
        urlBack={`catalogo/?companyId=${companyId}&apikey=${apikey}&page=${
          currentPage - 2
        }`}
        urlNext={`catalogo/?companyId=${companyId}&apikey=${apikey}&page=${currentPage}`}
        currentPage={currentPage}
        color={"primary"}
      />
    </>
  )
}

   
  
  

    export const getServerSideProps: GetServerSideProps = async ctx => {
       
        const name = ctx.query.name || ''
        const page = ctx.query.page || '0'
        const companyId = ctx.query.page || '0'
      
      
       
      
        const response = await valualApi.get<ItemsList>(
          `items/?companyId=${companyId}&apikey=${ctx.query.apikey}&page=${page}&name=${name}`
        )
      
            console.log(response.data)

        if (!response ) {
          return { notFound: true, redirect: '/404' }
        }
      
        return {
          props: {
            items: response.data,
            apikey: ctx.query?.apikey,  
            companyId: ctx.query?.companyId, 
             page

          }
        }
    }
    

export default CatalogueList
