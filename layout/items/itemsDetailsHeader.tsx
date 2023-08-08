import React, { FC } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Spacer,
  Avatar,
  Switch,
  Button
} from '@nextui-org/react'
import { ItemsList } from '../../interfaces/items/itemsList'
import { MdOutlineInventory2 } from 'react-icons/md'
import { TbCheck,TbX ,TbHeart,TbHeartFilled ,TbEdit,TbList,TbArrowBackUp } from 'react-icons/tb'



interface Props {
  data: ItemsList
 
}


export const ItemsDetailsHeader: FC<Props> = ({ data }) => {
  
const currencyFormat = new Intl.NumberFormat('en-DE')


  return (

      <>
    <div
      className=" p-5 gap-5 "     
    >
    
      <Card   style={{justifyContent:'center', height:'70px' }}>
    
        <div style={{justifyContent:' space-between', display:'flex'}}>
          <div >
      <Button variant="light"  className='ml-10 mr-3' color="primary" size="md" startContent={<
        TbEdit/>}>
        Editar
      </Button>
      
      <Button variant="light" className="mx-3" color="primary" size="md" startContent={<
        TbList/>}>
        Ver movimientos
      </Button>    
     
      <Button variant="light" className="mx-3" color="primary" size="md"  startContent={<
        MdOutlineInventory2/>}>
     Inventario
      </Button> </div>
      
      <Button variant="flat" className="mx-10" color="warning" size="md" startContent={<
        TbArrowBackUp/>}>
        Volver
      </Button>
      </div>
      </Card>
      <Spacer y={5} />
      <div
      className="grid grid-cols-12 row-span-9  gap-5"
      style={{ justifyContent: 'center'}}
    >
        <Card className="col-span-3 ">
          <CardHeader style={{ padding: '0' }}>
            <div
              className="pt-10 container"
              style={{
                backgroundImage: `linear-gradient(#0070F0, white)`,
                height: '150px',
                opacity: '0.3',
                minWidth: '100%',
                margin: '0',
                display:'flex',
                justifyContent: 'center'
              }}
            >
          <Avatar
              isBordered
              alt={data.name}
              showFallback
              fallback={<MdOutlineInventory2 className=" w-12 h-12 text-default-500"  />}
              style={{
                borderRadius: '40px',
                width: '125px',
                height: '125px',
              
              }}
              src={data.image}
            />

            </div>

       
            
          </CardHeader>

          <CardBody >
          <Spacer y={5} />
            <div className="flex justify-between w-auto">
              <h4 className="flex text-lg font-medium">Favorito</h4>         
              <Switch
                color="danger"
                isSelected={data.isFavorite} 
                thumbIcon={({ isSelected }: {isSelected: boolean}) =>
                isSelected ? (
                  <TbHeartFilled  />
                ) : (
                  <TbHeart  />
                )
                }
            >        
               </Switch>
                    </div>

                    <Spacer y={5} />
                <div className="flex justify-between w-auto">
                <h4 className="flex text-lg font-medium pt-2" >
                  Estado
                </h4>
                <Switch isSelected={data.isActive} 
                color="success"
                thumbIcon={({ isSelected }: {isSelected: boolean}) =>
                isSelected ? (
                  <TbCheck  />
                ) : (
                  <TbX  />
                )
                }
            > 
               </Switch>
                </div>

                <Spacer y={5} />       
                 <div className="flex justify-between w-auto">
                <h4 className="flex text-lg font-medium pt-2">
                 AIU
                 </h4>
                 <Switch isSelected={data.isAiu} 
                color="success"
                thumbIcon={({ isSelected }: {isSelected: boolean}) =>
                isSelected ? (
                  <TbCheck  />
                ) : (
                  <TbX  />
                )
                }
            >
               </Switch>
                </div>

                <Spacer y={5} />
                 <div className="flex justify-between w-auto">
                <h4 className="flex text-lg font-medium pt-2">
                 Inventario
                 </h4>
                 <Switch isSelected={data.isInventory} 
                color="success"
                thumbIcon={({ isSelected }: {isSelected: boolean}) =>
                isSelected ? (
                  <TbCheck  />
                ) : (
                  <TbX  />
                )
                }
            >
               </Switch>
                </div>

                <Spacer y={5} />
                <div className="flex justify-between w-auto">
                 <p className=" flex text-lg font-medium pt-2">
              {data.isInventory ? 'Con control de inventario' : 'Sin control de inventario'}
               </p>
                </div>
                <Spacer y={5} />
          </CardBody>
          
        </Card>

        <Card className="col-span-9 ">

          <div className="text-center py-10 " >
             <h1 className="text-5xl font-bold  ">{data.name}</h1>
             <h3 className="text-2xl font-medium  pt-5">{data.group.name}</h3>               
               </div> 
        
              <div  className="grid grid-cols-2  px-5 gap-5" > 
              <div className="grid-row-1 "  >              
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Costo</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4 " style={{ textTransform: 'capitalize' }}> {currencyFormat.format(data.costPrice)}</h3>
               </div>
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Ultimo Precio</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4 " style={{ textTransform: 'capitalize' }}> {currencyFormat.format(data.lastcostPrice)}</h3>
               </div>
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Venta</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4  " style={{ textTransform: 'capitalize' }}> {currencyFormat.format(data.salePrice)}</h3>
               </div>
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Codigo</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4  " style={{ textTransform: 'capitalize' }}>  {data.code}</h3>
               </div>
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Codigo de barras</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4 " style={{ textTransform: 'capitalize' }}>  {data.barcode}</h3>
               </div>   
                  
                 </div>
                
                <div className="grid-row-2">

                <div className="grid grid-cols-4 gap-3" >
                  <p className="text-gray-400 text-right">Codigo del WOOCOMMERCE</p>
                    <p className="font-medium text-left col-start-2 col-end-4 " >
                  {data.wooCode}
                </p></div> 

                <div className="grid grid-cols-4 gap-3" >
                  <p className="text-gray-400 text-right"> Impuesto en la bolsa </p>
                    <p className="font-medium text-left col-start-2 col-end-4 " >
                  {data.bagtaxPrice}
                </p></div> 

                <div className="grid grid-cols-4 gap-3" >
                  <p className="text-gray-400 text-right"> Nombre</p>
                    <p className="font-medium text-left col-start-2 col-end-4 " >
                  {data.tax.name}
                </p></div> 

                <div className="grid grid-cols-4 gap-3" >
                  <p className="text-gray-400 text-right"> Porcentaje</p>
                    <p className="font-medium text-left col-start-2 col-end-4 " >
                  {data.tax.value}%
                </p></div> 

                
                </div>
                </div>            
             
                 {
                  data.observations!==''&& (
                <div className="container p-10" >
                <blockquote className="bg-gray-100 dark:bg-transparent p-5 rounded-2xl">
                  {data.observations}
                  
                </blockquote>
              </div>
                  )
                 }

             
        </Card>
        
    </div>
    </div>
    
    </>
              
  )
}

