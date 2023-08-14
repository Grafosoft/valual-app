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
import { ImprimirModal } from '../../components/tbDots/imprimir';

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
         <ImprimirModal
         text={files.attachment.fileName}
         url={files.attachment.url}
         description={""}

         />
      ) 
                          
  }
}