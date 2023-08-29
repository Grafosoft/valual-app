import React, { FC, useEffect, useState } from 'react'
import { WarehouseList } from '../../interfaces/warehouses/warehousesList'
import { TbArrowBigRightLinesFilled, TbPencil } from 'react-icons/tb'
import { useRouter } from 'next/router'

interface Props {
  houses: WarehouseList
  columnKey: React.Key
}

export const RenderCellWarehouses: FC<Props> = ({ houses, columnKey }) => {
  const { push } = useRouter()

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
      case 'actions':
        return (
          <TbPencil
          cursor={'pointer'}
          color={'#006FEE'}


          size={20}
        />
        )
    default:
      return (
        <div className="flex flex-row align-center">
          <TbArrowBigRightLinesFilled cursor={'pointer'} size={20} />
        </div>
      )
  }
}
