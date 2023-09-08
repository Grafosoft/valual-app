import React, { FC, useEffect, useState } from 'react'
import { SellersList } from '../../interfaces/sellers/sellersList'
import { TbPencil } from 'react-icons/tb'
import { useRouter } from 'next/router'
import { Modal, useDisclosure } from '@nextui-org/react'
import CreateAndEditSellers from '../../components/modal/CreateAndEditSellers'

interface Props {
  sellers: SellersList
  columnKey: React.Key
  apikey: string | undefined
  companyId: string | undefined
}

export const RenderCellSellers: FC<Props> = ({ sellers, columnKey,  apikey,
  companyId, }) => {
  const [apikeys, setApikey] = useState('')
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  
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
            aria-label="Editar Vendedor"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="2xl"
          >
            <CreateAndEditSellers
              form={sellers}
              apikey={apikey}
              companyId={companyId}
              method='editar'
              idput={sellers.id}
            />
          </Modal>
        </>
      )
  }

}
