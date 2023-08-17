import React, { FC, useEffect, useState } from 'react'
import { TbArrowBigRightLinesFilled } from 'react-icons/tb'
import { BanksList } from '../../interfaces/banks/banksList'

interface Props {
  banks: BanksList
  columnKey: React.Key
}

export const RenderCellBanks: FC<Props> = ({ banks, columnKey }) => {
  const [apikey, setApikey] = useState('')
  useEffect(() => {
    setApikey(localStorage.getItem('apikey') || '')
  }, [])

  switch (columnKey) {
    case 'name':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {banks.name}
        </p>
      )
    case 'type':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {banks.type.name}
        </p>
      )
    default:
      return (
        <div className="flex flex-row align-center">
          <TbArrowBigRightLinesFilled cursor={'pointer'} size={20} />
        </div>
      )
  }
}
