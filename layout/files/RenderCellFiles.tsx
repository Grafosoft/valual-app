import React, { FC, useEffect, useState } from 'react'
import { User } from '@nextui-org/react'
import { FilesList } from '../../interfaces/files/filesList'

import { FaFileImage, FaFilePdf } from 'react-icons/fa'
import { TbFileShredder } from 'react-icons/tb'
import { AiOutlineFileImage, AiOutlineFilePdf } from 'react-icons/ai'
import { PrinterModal } from '../../components/tbDots/Printer'



interface Props {
  files: FilesList
  columnKey: React.Key
}

export const RenderCellFiles: FC<Props> = ({ files, columnKey }) => {
  const createDate = new Date(files.date).toLocaleDateString('es', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const [apikey, setApikey] = useState('')
  useEffect(() => {
    setApikey(localStorage.getItem('apikey') || '')
  }, [])

  switch (columnKey) {
    case 'title':
      return (
        <User
          avatarProps={{
            src: '',
            radius: 'md',
            showFallback: true,
            fallback:
            files.attachment.extension === '.pdf' ? (
                <AiOutlineFilePdf size={25} />
              ) :  files.attachment.extension === '.png' ||
              files.attachment.extension === '.jpg' ? (
                <AiOutlineFileImage color='#E4E4E7' size={25} />
              ): (
                <TbFileShredder size={25} />
              ),
              color:
              files.attachment.extension === '.pdf'
                ? 'danger'
                :  files.attachment.extension === '.png' ||  files.attachment.extension === '.jpg'
                ? 'success'
                : 'primary'

          }}
          name={`${files.title}${files.attachment.extension}`}
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
        <PrinterModal
          text={`Nombre ${files.attachment.fileName}`}
          url={files.attachment.url}
          description={''}
        />
      )
  }
}
