import { GetServerSideProps, NextPage } from "next"
import { ItemsList } from "../../../interfaces/items/itemsList"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useEffect } from 'react'
import valualApi from "@/apis/valualApi"
import Head from "next/head"

import { CatalHeaderLayout } from "../../../layout/items/itemsHeader"
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { columns } from "@/global/items/itemsColumns"
import { RenderCell } from "../../../layout/items/RenderCell"
import { PaginationList } from "../../../components/pagination/PaginationList"



interface Props {
    subs: ItemsList[]
    apikey: string | undefined
    page: string | undefined

  } 


  
  const CatalogueList : NextPage<Props> = ({ subs, apikey,page }) => {

    const [currentPage, setCurrentPage] = React.useState(0)
    const { status } = useSession()
    const { replace ,push } = useRouter()

    useEffect(() => {
      setCurrentPage(parseInt(page || '0') + 1)
      status === 'unauthenticated' && replace('/')
    }, [status, replace, page])

  
   
return (
  <>
    <Head>  
      <title>Catologo

      </title>
    </Head>
    <CatalHeaderLayout subs={subs}  apikey={apikey} />
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
        <TableBody items={subs} emptyContent={'No hay datos por mostrar.'}>
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
        urlBack={`catalogo/?companyId=2&apikey=${apikey}&page=${
          currentPage - 2
        }`}
        urlNext={`catalogo/?companyId=2&apikey=${apikey}&page=${currentPage}`}
        currentPage={currentPage}
        color={"primary"}
      />
    </>
  )
}

   
  
  

    export const getServerSideProps: GetServerSideProps = async ctx => {
       
        const name = ctx.query.name || ''
        const page = ctx.query.page || '0'
      
       
      
        const response = await valualApi.get<ItemsList>(
          `items/?companyId=2&apikey=${ctx.query.apikey}&page=${page}&name=${name}`
        )
      
            console.log(response.data)

        if (!response ) {
          return { notFound: true, redirect: '/404' }
        }
      
        return {
          props: {
            subs: response.data,
            apikey: ctx.query?.apikey,     
             page

          }
        }
    }
    

export default CatalogueList
