import React, { FC } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Spacer,
  User,
  Avatar
} from '@nextui-org/react'
import { ItemsList } from '../../interfaces/items/itemsList'
import { AiFillHeart,AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineInventory2 } from 'react-icons/md'



interface Props {
  data: ItemsList
 
}

export const ItemsDetailsHeader: FC<Props> = ({ data }) => {
  
const currencyFormat = new Intl.NumberFormat('en-DE')

  return (
    <div
      className="grid  p-5"
      style={{ justifyContent: 'center' }}
    >
      <div >
        <Card>
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
                left: '40px',
                right: '0',
                top: '70px'
              }}

              src={data.image}
            />
          </CardHeader>
          <CardBody>
            <Spacer y={10} />
            <div
              className="grid grid-cols-12"
              style={{ justifyContent: 'space-between' }}
            >
              <div
                className="col-span-8"
                style={{ paddingLeft: '30px', flexDirection: 'column' }}
              >
               <h1 className="text-5xl font-bold py-2">{data.name}</h1>
                <h3 className="text-2xl font-bold pt-2 ">{data.group.name}</h3>

                
                

                
                <h4 className="flex text-xl font-medium pt-2">
                  Estado
                  <Chip
                    radius="sm"
                    variant={'flat'}
                    style={{ marginLeft: '20px' }}
                    color={data.isActive ? 'success' : 'danger'}
                   
                  >
                    {data.isActive ? 'Activo' : 'Inactivo'}
                    
                  </Chip>
                </h4>
                

                <div className="text-gray-400 pt-2">
                <p className="font-medium" style={{ textTransform: 'capitalize' }}>
                 Precio de costo COP {currencyFormat.format(data.costPrice)}
                </p>

                <p className="font-medium" style={{ textTransform: 'capitalize' }}>
                Ultimo precio de costo COP {currencyFormat.format(data.lastcostPrice)}
                </p>
                
                <p className="font-medium" style={{ textTransform: 'capitalize' }}>
                Precio de venta COP {currencyFormat.format(data.salePrice)}
                </p>

                </div>
                
              </div>
              
       
              


              <div
                className="col-span-4"
                style={{
                  paddingRight: '30px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignContent: 'center',
                  alignItems: 'flex-end'
                }}
              >   
               
              
              <h4 className="flex text-xl font-medium">Favorito
                 <Chip
                 
                    variant={'flat'}
                    style={{ marginLeft: '20px' }}
                    color={data.isFavorite ? 'danger' : 'danger'}
                    size="lg"
                    radius="sm"
                  > 

                    {data.isFavorite ?  <AiFillHeart className=" w-10 h-10 "/> :  <AiOutlineHeart className=" w-10 h-10 "/>}
                    
                  </Chip>
                    </h4>
              </div>
              
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

