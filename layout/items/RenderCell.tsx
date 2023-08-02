import React, { FC, useEffect, useState } from 'react'
import {    
  TbArrowBigRightLinesFilled,
} from 'react-icons/tb'
import {
  Chip,
  User
} from '@nextui-org/react'
import { useRouter } from 'next/router'
import { ItemsList } from '../../interfaces/items/itemsList'

interface Props {
  user: ItemsList
  columnKey: React.Key
 
}

export const RenderCell: FC<Props> = ({
  user,
  columnKey,
  
}) => {
  const currencyFormat = new Intl.NumberFormat('en-DE')
  const { push } = useRouter()

  

 

  let colorIcon = '#0072F5'


  const [apikey, setApikey] = useState('')
  useEffect(() => {
    setApikey(localStorage.getItem('apikey') || '')
  }, [])

  switch (columnKey) {
    case 'name':
      return (
        <User
          avatarProps={{
            src: user.image || '',
            radius: 'md',
            name: user.name
          }}
          name={user.name}
          style={{ padding: 0 }}
           description={user.group.name}
         
        />
      )

      case 'isInventory':
        return (
          <p className="font-medium"
            
          >
            {user.isInventory ? 'Control de inventario' : 'Sin control de inventario'}
          </p>
        )
        case 'isActive':
        return (
          <Chip
          radius="sm"
            variant={'flat'}
            size="sm"
            color={user.isActive ? 'success' : 'danger'}
          >
            {user.isActive ? 'activo' : 'inactivo'}
          </Chip>
        )
        
    case 'salePrice':
    return (
      <div className="container">
        <div className="flex justify-end">
          <p className="font-medium" style={{ textTransform: 'capitalize' }}>
            COP {currencyFormat.format(user.salePrice)}
          </p>
        </div>
        <div className="flex justify-end text-gray-400">
          <p
            style={{
              textTransform: 'capitalize'
            }}
          >
            {user.salePrice}
          </p>
        </div>
      </div>
    )
    case 'costPrice':
    return (
      <div className="container">
        <div className="flex justify-end">
          <p className="font-medium" style={{ textTransform: 'capitalize' }}>
            COP {currencyFormat.format(user.costPrice)}
          </p>
        </div>
        <div className="flex justify-end text-gray-400">
          <p
            style={{
              textTransform: 'capitalize'
            }}
          >
            {user.costPrice}
          </p>
        </div>
      </div>
    )
  

       
            case 'tax':
              return (
                <div className="container">
                  <div className="flex justify-end">
                    <p className="font-medium" style={{ textTransform: 'capitalize' }}>
                      COP {currencyFormat.format(user.tax.value)}
                    </p>
                  </div>
                  <div className="flex justify-end text-gray-400">
                    <p
                      style={{
                        textTransform: 'capitalize'
                      }}
                    >
                      {user.tax.name}
                    </p>
                  </div>
                </div>
              )
 
   
  
    case 'details':
      return (
        <TbArrowBigRightLinesFilled
          cursor={'pointer'}
          color={colorIcon}
          onClick={() => push(`/catalogo/${user.id}/?apikey=${localStorage.getItem(
            'apikey'
          )}&companyId=${localStorage.getItem('companyId')}`)}
          size={20}
        />
      )
    default:
      return (
        <div className="flex flex-row align-center">
          <TbArrowBigRightLinesFilled
            color={colorIcon}
            cursor={'pointer'}
            size={20}
          />
        </div>
      )
  }
}