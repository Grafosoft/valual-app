import React, { FC, useEffect, useState } from 'react'
import { SellersList } from '../../interfaces/sellers/sellersList'


interface Props {
  sellers: SellersList
  columnKey: React.Key
 
}

export const RenderCellSellers: FC<Props> = ({
    sellers,
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
                {sellers.name}
      
              </p>
            )
          
      
  }
}