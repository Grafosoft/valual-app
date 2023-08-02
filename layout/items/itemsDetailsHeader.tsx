import React, { FC } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Spacer,
  User,
  Avatar,
  Switch
} from '@nextui-org/react'
import { ItemsList } from '../../interfaces/items/itemsList'
import { MdOutlineInventory2 } from 'react-icons/md'
import { TbCheck,TbX ,TbHeart,TbHeartFilled ,TbBrandCashapp ,TbReceiptTax } from 'react-icons/tb'



interface Props {
  data: ItemsList
 
}

export const ItemsDetailsHeader: FC<Props> = ({ data }) => {
  
const currencyFormat = new Intl.NumberFormat('en-DE')

  return (
    <div
      className="grid grid-rows-12 p-5 gap-5"
      style={{ minHeight: "92vh" }}
    >
    
      <Card className="row-span-1"></Card>
  
      
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
                  <div  className="grid grid-cols-2 p-5 gap-5">
               
                  <Card >   
                        <div className="flex">
                    <TbBrandCashapp className=" w-20 h-20 text-default-500"   color="#17c964"/>       
                 
                    
                     <p className="text-2xl font-bold py-7 " style={{ textTransform: 'capitalize' }}>
                     Precio de costo COP {currencyFormat.format(data.costPrice)}
                     </p></div>
                  </Card>
                  <Card >
                  <div className=" justify-center items-center p-5">
                    <TbBrandCashapp className=" w-10 h-10 text-default-500"   color="#17c964"/>     
                     <p className="text-2xl font-bold " style={{ textTransform: 'capitalize' }}>
                     Ultimo precio de costo COP {currencyFormat.format(data.lastcostPrice)}
                    </p></div>
                  </Card>
                  <Card >
                  <div className="flex">
                    <TbBrandCashapp className=" w-20 h-20 text-default-500"   color="#17c964"/> 
                    <p className="text-2xl font-bold py-7" style={{ textTransform: 'capitalize' }}>
                Precio de venta COP {currencyFormat.format(data.salePrice)}
                </p></div>

                  </Card>
                  <Card >
                  <TbReceiptTax className=" w-20 h-20 text-default-500"  size={800} color="#17c964"/>       

                      <p className="font-medium" style={{ textTransform: 'capitalize' }}>
                      {data.tax.name}
                      </p>
                  </Card>
             

               

               
                
                
              
              
               
                </div>

        
              
              </div>

              


        </Card>
    </div>
 
    </div>
                
              
            
  )
}

