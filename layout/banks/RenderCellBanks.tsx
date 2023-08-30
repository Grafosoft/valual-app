import React, { FC, useEffect, useState } from 'react'
import { TbArrowBigRightLinesFilled, TbPencil } from 'react-icons/tb'
import { BanksList } from '../../interfaces/banks/banksList'
import { Modal,useDisclosure } from '@nextui-org/react'
import CreateAndEditBanks from '../../components/modal/CreateAndEditBanks'

interface Props {
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
  banks: BanksList
  columnKey: React.Key
  apikey: string | undefined
  companyId: string | undefined
}

export const RenderCellBanks: FC<Props> = ({
  banks,
  columnKey,
  apikey,
  color,
  companyId
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const [apikeys, setApikey] = useState('')
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
    case 'actions':
      return (
        <>
          <TbPencil
            cursor={'pointer'}
            color={'#006FEE'}
            size={20}
            onClick={() => onOpen()}
          />
          <Modal
            closeButton
            backdrop="blur"
            aria-label="Crear almacenes"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="2xl"
          >
            <CreateAndEditBanks
              form={banks}
              color={color}
              apikey={apikey}
              companyId={companyId}
              method="editar"
              idput={banks.id}
            />
          </Modal>
        </>
      )

    default:
      return (
        <div className="flex flex-row align-center">
          <TbArrowBigRightLinesFilled cursor={'pointer'} size={20} />
        </div>
      )
  }
}
