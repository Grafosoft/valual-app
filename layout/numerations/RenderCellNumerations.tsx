import React, { FC, useEffect, useState } from 'react'
import {    
  TbArrowBigRightLinesFilled,
} from 'react-icons/tb'

import {
  Chip,
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
            src: '',
            radius: 'md',
            name: Numeration.name
          }}
          name={Numeration.name}
          style={{ padding: 0 }}
           description={Numeration.type.name}
         
        />
      )
        
      case 'date':
        return (
          <p className="font-medium" style={{ fontSize: '15px' }}>
            {createDate}   
          </p>
          
          
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

       
    case 'software':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {Numeration.software.name}

        </p>
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