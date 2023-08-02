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
import { TbCheck,TbX ,TbHeart,TbHeartFilled  } from 'react-icons/tb'



interface Props {
  data: ItemsList
 
}

export const ItemsDetailsHeader: FC<Props> = ({ data }) => {
  
const currencyFormat = new Intl.NumberFormat('en-DE')

  return (
    <div
      className="grid grid-cols-12 p-5 gap-5"
      style={{ justifyContent: 'center', minHeight: "92vh" }}
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
              <h4 className="flex text-xl font-medium">Favorito</h4>
                
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
                <h4 className="flex text-xl font-medium pt-2" >
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
                <h4 className="flex text-xl font-medium pt-2">
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
                <h4 className="flex text-xl font-medium pt-2">
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
               
                 <p className=" flex text-xl font-medium pt-2">
              {data.isInventory ? 'Con control de inventario' : 'Sin control de inventario'}
               </p>
                </div>
                <Spacer y={5} />
              

         
          </CardBody>
        </Card>
        <div className="col-span-10 grid grid-rows-12 gap-5">
        <Card className="row-span-1  "> 
      
         
        </Card>
        
        <Card className="row-span-11  ">

        </Card>

 </div>


    
    </div>
    


 
    
       
              


              
              
            
  )
}

