import React, { FC, useEffect, useState } from 'react'
import {    
   TbDots, TbFiles,
} from 'react-icons/tb'
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
  User,
  useDisclosure
} from '@nextui-org/react'
import { FilesList } from '../../interfaces/files/filesList'

interface Props {
  files: FilesList
  columnKey: React.Key
 
}

export const RenderCellFiles: FC<Props> = ({
    files,
  columnKey,
  
}) => {
  const createDate = new Date(files.date).toLocaleDateString('es', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [pdfView, setPdfView] = useState('')
  const [isLoadingModal, setIsLoadingModal] = useState(false)

  const handleVisible = () => {
    setIsLoadingModal(true)
       
          setPdfView(files.attachment.url)
          setIsLoadingModal(false)
  }

  const [apikey, setApikey] = useState('')
  useEffect(() => {
    setApikey(localStorage.getItem('apikey') || '')
  }, [])

  switch (columnKey) {
    case 'title':
      return (
        <User
          avatarProps={{
            src:'',
            radius: 'md',
            name: files.title
          }}
          name={files.title}
          style={{ padding: 0 }}
           description={files.description}
         
        />
      )
      case 'date':
        return (
          <p className="font-medium" style={{ fontSize: '15px' }}>
            {createDate}   
          </p>          
        )
        case 'type':
            return (
              <p className="font-medium" style={{ fontSize: '15px' }}>
                {files.type.name}
              </p>
            )
        case 'source':
            return (
                <p className="font-medium" style={{ fontSize: '15px' }}>
                    {files.source}
                </p>
            )           
        case 'location':
            return (
                <p className="font-medium" style={{ fontSize: '15px' }}>
                    {files.location}
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
                if (actionKey === 'print') {
                  handleVisible()
                } 
              }}
              aria-label="Mas acciones"
            >

              <DropdownItem
                key="print"
                startContent={<TbFiles />}
                onClick={onOpen}
                >  
             Archivos
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
                  Nombre {files.attachment.fileName}           
                </h2>
               
              </ModalHeader>
              <ModalBody> 
               
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
      ) 
                          
  }
}