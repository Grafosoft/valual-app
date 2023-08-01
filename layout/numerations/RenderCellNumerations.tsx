import React, { FC, useEffect, useState } from 'react'

import {
  Chip,
  Spacer,
  User
} from '@nextui-org/react'
import { NumerationsList } from '../../interfaces/numerations/numerationsList'

interface Props {
    Numeration: NumerationsList
  columnKey: React.Key
 
}

export const RenderCellNumerations: FC<Props> = ({
    Numeration,
  columnKey,
  
}) => {

    const createDate = new Date(Numeration.dueDate).toLocaleDateString('es', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
  



  const [apikey, setApikey] = useState('')
  useEffect(() => {
    setApikey(localStorage.getItem('apikey') || '')
  }, [])

  switch (columnKey) {
    case 'name':
      return (
        <User
          avatarProps={{
            src: '',
            radius: 'md',
            name: Numeration.name
          }}
          name={ `${Numeration.name} #${Numeration.currentNumber}` } 
          style={{ padding: 0 }}
           description={Numeration.type.name}
         
        />
      )
      case 'authorization':
        return (
          <p className="font-medium" style={{ fontSize: '15px' }}>
            {Numeration.authorization}   
          </p>
        ) 

        case 'status':
          return (
            <Chip
              variant={'flat'}
              size="sm"
              color={Numeration.status ? 'success' : 'danger'}
            >
              {Numeration.status ? 'activo' : 'inactivo'}
            </Chip>
          )
      case 'currentNumber':
        return (
     
          <div className="flex flex-col">
          <p className="font-medium lowercase" style={{ fontSize: '15px' }}>
            {Numeration.startNumber}   
         
          </p> 
          <Spacer y={1} />
          <p className="text-bold text-tiny text-default-400">
            {Numeration.toNumber}
          </p>
          </div>
        )
       
    case 'software':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {Numeration.software.name}

        </p>
      )
      case 'date':
        return (
          <p className="font-medium" style={{ fontSize: '15px' }}>
            {createDate}   
          </p>
          
          
        )
        
     
   
    default:
      
  }
}