import React, { FC, useEffect, useState } from 'react'
import { Chip, Spacer, User } from '@nextui-org/react'
import { NumerationsList } from '../../interfaces/numerations/numerationsList'
import { TbArrowBigRightLinesFilled, TbPencil } from 'react-icons/tb'
import { useRouter } from 'next/router'

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
  let colorIcon = '#0072F5'
  const { push } = useRouter()

  const [apikeys, setApikey] = useState('')
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
      case 'details':
        return (
            <>
        <div className="flex">

            <TbPencil
              cursor={'pointer'}
              color={colorIcon}
              onClick={() =>
                push(
                  `/numeracion/editar?id=${numeration.id}&apikey=${localStorage.getItem(
                    'apikey'
                  )}&companyId=${localStorage.getItem('companyId')}`
                )
              }
              size={20}
            />
          <Spacer x={8} />

               <TbArrowBigRightLinesFilled
          cursor={'pointer'}
          color={colorIcon}
          onClick={() =>
            push(
              `/numeracion/detalles/${numeration.id}/?apikey=${localStorage.getItem(
                'apikey'
              )}&companyId=${localStorage.getItem('companyId')}`
            )
          }
          size={20}
        />
        </div>

          </>

        )


    default:
  }
}
