import { CircularProgress, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import React, { FC, useState } from 'react'
import { TbDots, TbPrinter } from 'react-icons/tb'

interface Props {
   
    text: string | undefined
    description: string | undefined
    url: string 

 
  }
  
export const ImprimirModal: FC<Props> = ({text,url,description
  
  }) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [pdfView, setPdfView] = useState('')
  const [isLoadingModal, setIsLoadingModal] = useState(false)

  const handleVisible = () => {
    setIsLoadingModal(true)
       
          setPdfView(url)
          setIsLoadingModal(false)
  }
  
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
            if (actionKey === 'print') {
              handleVisible()
            } 
          }}
          aria-label="Mas acciones"
        >

          <DropdownItem
            key="print"
            startContent={<TbPrinter />}
            onClick={onOpen}
            >  
         Imprimir
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
            <h2 id="modal-title">
              Nombre {text}           
            </h2>
           
          </ModalHeader>
          <ModalBody> 
            {description}
           
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
                src={`${pdfView}`}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>

    )} 