import React, { FC, useEffect, useState } from 'react'
import { WarehouseList } from '../../interfaces/warehouses/warehousesList'
import { TbArrowBigRightLinesFilled } from 'react-icons/tb'


interface Props {
  houses: WarehouseList
  columnKey: React.Key
 
}

export const RenderCellWarehouses: FC<Props> = ({
    houses,
  columnKey,
  
}) => {
 

  const [apikey, setApikey] = useState('')
  useEffect(() => {
    setApikey(localStorage.getItem('apikey') || '')
  }, [])

  switch (columnKey) {
   
        
    case 'name':
       
            return (
              <p className="font-medium" style={{ fontSize: '15px' }}>
                {houses.name}
      
              </p>
            )
            case 'priceList':
            return (
              <p className="font-medium" style={{ fontSize: '15px' }}>
                {houses.priceList.name}
      
              </p>
            )
            default:
              return (
                <div className="flex flex-row align-center">
                  <TbArrowBigRightLinesFilled
                   
                    cursor={'pointer'}
                    size={20}
                  />
                </div>
              )
      
  }
}