import React, { FC, useEffect, useState } from 'react'

import { Chip, Spacer, User } from '@nextui-org/react'
import { NumerationsList } from '../../interfaces/numerations/numerationsList'

interface Props {
  numeration: NumerationsList
  columnKey: React.Key
}

export const RenderCellNumerations: FC<Props> = ({ numeration, columnKey }) => {
  const createDate = new Date(numeration.dueDate).toLocaleDateString('es', {
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
            name: numeration.name
          }}
          name={`${numeration.name} #${numeration.currentNumber}`}
          style={{ padding: 0 }}
          description={numeration.type.name}
        />
      )
    case 'authorization':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {numeration.authorization}
        </p>
      )

    case 'status':
      return (
        <Chip
          radius="sm"
          variant={'flat'}
          size="sm"
          color={numeration.status ? 'success' : 'danger'}
        >
          {numeration.status ? 'activo' : 'inactivo'}
        </Chip>
      )
    case 'currentNumber':
      return (
        <div className="flex flex-col">
          <p className="font-medium lowercase" style={{ fontSize: '15px' }}>
            {numeration.startNumber}
          </p>
          <Spacer y={1} />
          <p className="text-bold text-tiny text-default-400">
            {numeration.toNumber}
          </p>
        </div>
      )

    case 'software':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {numeration.software.name}
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
