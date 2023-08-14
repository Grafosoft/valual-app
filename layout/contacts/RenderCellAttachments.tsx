import React, { FC, useState } from 'react'
import { Attachment,ContactsDetailsList } from '../../interfaces/contacts/contactsDetailsList';
import { TbDots, TbDownload, TbPrinter } from 'react-icons/tb'
import { CircularProgress, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'

import valualApi from '@/apis/valualApi';


interface Props {
  contact?:ContactsDetailsList
  attach: Attachment
  columnKey: React.Key
}

export const RenderCellAttachments: FC<Props> = ({ contact, attach, columnKey }) => {
    const createDate = new Date(attach.date).toLocaleDateString('es', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      
      
      const linkSource =`${ attach.url}`
      const n = 4
      const arch= (linkSource.substring(linkSource.length - n))
      
     
  const handleDownload2 = () => {
  fetch( valualApi
    .get<Attachment>(
      `/contacts/${
        attach.id
      }?companyId=${localStorage.getItem(
        'companyId'
      )}&apikey=${localStorage.getItem('apikey')}`
    ) + linkSource, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/pdf',
    },
  })
  .then((response) => response.blob())
  .then((blob) => {
    // Create blob link to download
    const url = window.URL.createObjectURL(
      new Blob([blob]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      attach.name + arch,
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode?.removeChild(link);
  });
}

  

 
    
      const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [pdfView, setPdfView] = useState('')
  const [isLoadingModal, setIsLoadingModal] = useState(false)

  const handleVisible = () => {
    setIsLoadingModal(true)
       
          setPdfView(attach.url)
          setIsLoadingModal(false)
        
      
      
  }

   
  switch (columnKey) {
   

    case 'name':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
        {attach.name }
      </p>
      )
    case 'date':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {createDate}
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
                } else {
                  valualApi
                    .get<ContactsDetailsList>(
                      `/contacts/${contact?.id}/?companyId=${localStorage.getItem(
                        'companyId'
                      )}&apikey=${localStorage.getItem('apikey')}`
                    )
                    .then(response => {
                      if (response.status === 200) {
                  
                        const linkSource = `${response.data.attachments[0].url}`
                        console.log(linkSource);

                  
                        const n = 4
                        const arch= (linkSource.substring(linkSource.length - n))
                        const downloadLink = document.createElement('a')
                        const fileName = `${attach.name}${arch}` 

                        downloadLink.href = linkSource
                        downloadLink.download = fileName
                        downloadLink.click()
                      }
                    })
                    .catch(error => {
                      console.log(error)
                    })
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

               {/* <DropdownItem
                color={`danger`}  
                key="download"
                
                startContent={<TbDownload />
                
              }
                
              >
                Descargar
              </DropdownItem> */}

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
                  Nombre {attach.name}           
                </h2>
               
              </ModalHeader>
              <ModalBody> 
                Fecha {createDate}
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

    default:
      
  }
}