import {
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import React, { FC, useState } from 'react'
import { Response } from '../../interfaces/invoices/invoicesDetailsList'
import { TbDots, TbPrinter } from 'react-icons/tb'

interface Props {
  response: Response
  columnKey: React.Key
}

export const RenderCellResponseInvoices: FC<Props> = ({
  response,
  columnKey
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [pdfView, setPdfView] = useState('')
  const [action, setAction] = useState('')
  const [xmlView, setXmlView] = useState('')
  const [isLoadingModal, setIsLoadingModal] = useState(false)
  const handleVisible = () => {
    setIsLoadingModal(true)
    setPdfView(response.pdfUrl)
    setIsLoadingModal(false)
  }
  const handleVisiblexml = () => {
    setIsLoadingModal(true)
    setXmlView(response.xmlUrl)
    setIsLoadingModal(false)
  }

  const date = new Date(response.date).toLocaleDateString('es', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  switch (columnKey) {
    case 'user':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {response.user}
        </p>
      )
    case 'cufe':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {response.cufe}
        </p>
      )
    case 'message':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {response.message}
        </p>
      )
    case 'date':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {date}
        </p>
      )
    case 'actions':
      return (
        <div className="flex flex-row">
          <Dropdown placement="bottom">
            <DropdownTrigger>
              <div className="container">
                <TbDots size={25} cursor={'pointer'} />
              </div>
            </DropdownTrigger>

            <DropdownMenu
              onAction={actionKey => {
                if (actionKey === 'pdf') {
                  handleVisible()
                } else {
                  handleVisiblexml()
                }
                setAction(actionKey.toString())
              }}
              aria-label="Mas acciones"
            >
              <DropdownItem
                key="pdf"
                startContent={<TbPrinter />}
                onClick={onOpen}
              >
                Imprimir Pdf
              </DropdownItem>

              <DropdownItem
                key="xml"
                startContent={<TbPrinter />}
                onClick={onOpen}
              >
                Imprimir Xml
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Modal
            closeButton
            backdrop="blur"
            size="full"
            aria-label="Visualización pdf"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
          >
            <ModalContent>
              <ModalHeader>
                <h2 id="modal-title">Mensaje ${response.message} </h2>
              </ModalHeader>
              <ModalBody>
                {date}
                {isLoadingModal ? (
                  <div
                    className="container"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      margin: 'auto'
                    }}
                  >
                    <CircularProgress
                      size="lg"
                      label="Cargando..."
                      color={'warning'}
                    />
                  </div>
                ) : (
                  <embed
                    style={{ height: '100%' }}
                    src={action === 'xml' ? xmlView : pdfView}
                  />
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      )
  }
}
