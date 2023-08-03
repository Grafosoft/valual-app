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
import { TbCheck,TbX ,TbHeart,TbHeartFilled  ,TbReceiptTax,TbMoneybag } from 'react-icons/tb'



interface Props {
  data: ItemsList
 
}


export const ItemsDetailsHeader: FC<Props> = ({ data }) => {
  
const currencyFormat = new Intl.NumberFormat('en-DE')


  return (
    <div
      className="grid grid-rows-12 p-5 gap-5"
      style={{  minWidth: '80vh' }}
      
    >
    
      <Card className="row-span-1">
      <div className="flex p-5 items-center">
        
      <Button color="success" size="sm" endContent={''}>
        Take a photo
      </Button>    </div>
      </Card>

      <div
      className="grid grid-cols-12 row-span-11  gap-5"
      style={{ justifyContent: 'center'}}
    >
        <Card className="col-span-2 ">
          <CardHeader style={{ padding: '0' }}>
            <div
              className="container"
              style={{
                backgroundImage: `linear-gradient(#0070F0, white)`,
                height: '150px',
                padding: '0',
                opacity: '0.3',
                minWidth: '100%',
                margin: '0'
              }}
            ></div>

        <Avatar
              isBordered
              alt={data.name}
              showFallback
              fallback={<MdOutlineInventory2 className=" w-12 h-12 text-default-500"  size={800} />}
              style={{
                borderRadius: '40px',
                width: '125px',
                height: '125px',
                position: 'absolute',
                left: '80px',
                right: '0',
                top: '70px'
              }}
              src={data.image}
            />
            
          </CardHeader>

          <CardBody style={{}}>
          <Spacer y={20} />
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

        <Card className="col-span-10 ">
        <Spacer y={10} />
        <div       
              style={{ justifyContent: 'space-between' }}
            >
              <div
              className='text-center'
              >
               <h1 className="text-5xl font-bold py-2">{data.name}</h1>
                <h3 className="text-2xl font-bold pt-2 ">{data.group.name}</h3>
                  </div>

                  <div  className="grid grid-cols-2 p-5 ">    
                <div className="grid-row-1">
                  <h1 className="text-3xl font-bold py-2">Precios</h1>          
                        <div className="flex items-center">            
                        <p className="py-2 text-gray-400">Costo</p>
                     <p className="font-medium py-2 pl-5 " style={{ textTransform: 'capitalize' }}>
                    {currencyFormat.format(data.costPrice)}
                     </p></div>
                  
                 
                  <div className=" flex items-center">
                <p className="py-2 text-gray-400">Ultimo Precio</p>
                     <p className="font-medium py-2 pl-5" style={{ textTransform: 'capitalize' }}>
                     {currencyFormat.format(data.lastcostPrice)}
                    </p></div>
               
                  
                  <div className="flex items-center">
                  <p className="py-2 text-gray-400">Venta</p>
                    <p className="font-medium py-2 pl-5" style={{ textTransform: 'capitalize' }}>
                  {currencyFormat.format(data.salePrice)}
                </p></div>        </div>
                
                <div className="grid-row-2">
                <h1 className="text-3xl font-bold py-2">Codigos</h1>

                <div className="flex items-center">
                  <p className="py-2 text-gray-400">Codigo</p>
                    <p className="font-medium py-2 pl-5" >
                  {data.code}
                </p></div>  

                <div className="flex items-center">
                  <p className="py-2 text-gray-400">Codigo de barras</p>
                    <p className="font-medium py-2 pl-5" >
                  {data.barcode}
                </p></div> 

                <h1 className="text-3xl font-bold py-2">WooCommerce</h1>

                <div className="flex items-center">
                  <p className="py-2 text-gray-400">Codigo WOO</p>
                    <p className="font-medium py-2 pl-5" style={{ textTransform: 'capitalize' }}>
                  {(data.wooCode)}
                </p></div>  
                </div>
                </div>
                <div className="grid grid-cols-2 p-5">

                <div className="grid-row-1">
                <h1 className="text-3xl font-bold py-2 ">Impuesto</h1>

                <div className="flex items-center ">
                  <TbMoneybag  size={20} color="#17c964"/>  

                   <p className="font-medium  " >
                   Impuesto en la bolsa   
                      </p>   
                    <p className="font-medium py-2 pl-2  " >
                      {data.bagtaxPrice}%
                      </p>
             </div>
                <div className="flex items-center ">
                  <TbReceiptTax  size={20} color="#17c964"/>       

                      <p className="font-medium py-2 " >
                      {data.tax.name}
                      </p>
             </div>
             <div className="flex items-center ">
                      <p className="font-medium py-2 " >
                     Porcentaje {data.tax.value}%
                    </p></div>
                    </div>
             </div>
        
             <div
              className='text-center'
              >
 
                  </div>

                 {
                  data.observations!==''&& (
                <div className="container" style={{ padding: '0 25px' }}>
                <blockquote className="bg-gray-100 dark:bg-transparent p-5 rounded-2xl">
                  {data.observations}
                </blockquote>
              </div>
                  )
                 }
         

              
              </div>
        </Card>
        
    </div>
    </div>
              
  )
}

