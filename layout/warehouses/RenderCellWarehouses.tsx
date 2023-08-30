import React, { FC, useEffect, useState } from 'react'
import { WarehouseList } from '../../interfaces/warehouses/warehousesList'
import { TbArrowBigRightLinesFilled, TbPencil } from 'react-icons/tb'
import { useRouter } from 'next/router'
import { Modal, useDisclosure } from '@nextui-org/react'
import CreateAndEditWarehouses from '../../components/modal/CreateAndEditWarehouses'


interface Props {
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
  houses: WarehouseList
  columnKey: React.Key
  apikey: string | undefined
  companyId: string | undefined

}

export const RenderCellWarehouses: FC<Props> = ({
  color,
  houses,
  columnKey,
  apikey,
  companyId,

}) => {
  const { push } = useRouter()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const [apikeys, setApikey] = useState('')
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
            <CreateAndEditWarehouses
              form={houses}
              color={color}
              apikey={apikey}
              companyId={companyId}
              method='editar'
              idput={houses.id}
              namepricelist= {houses.priceList.name}
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


