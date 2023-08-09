import React, { FC, useState } from 'react'
import { Attachment } from '../../interfaces/contacts/contactsDetailsList'
import { TbDots, TbDownload, TbPrinter } from 'react-icons/tb'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link } from '@nextui-org/react'
import { useRouter } from 'next/router'


interface Props {
  attach: Attachment
  columnKey: React.Key
}

export const RenderCellAttachments: FC<Props> = ({ attach, columnKey }) => {
    const createDate = new Date(attach.date).toLocaleDateString('es', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      const { push } = useRouter()

   
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
              <DropdownMenu  >
              <DropdownItem
                key="print"
                startContent={<TbPrinter />}
                target="_blank"
                onClick={() =>
                    push(
                      `${attach.url}`
                    )
                  }
                >  
             Imprimir
        
              
              </DropdownItem>

              </DropdownMenu>
              </Dropdown>
              </div>
)  


    default:
      return (
        <p
          className="font-medium"
          style={{ fontSize: '15px', textTransform: 'capitalize' }}
        >
          {attach.name}
        </p>
      )
  }
}