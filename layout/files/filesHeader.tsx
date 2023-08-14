import React, { ChangeEvent, FC, FormEventHandler, useState } from 'react'
import { Avatar, AvatarGroup, Button, Input, Spacer } from '@nextui-org/react'
import {  TbSearch, TbTrashFilled } from 'react-icons/tb'
import { useRouter } from 'next/router'
import second from '../../public/assets/logo.png'
import { FilesList } from '../../interfaces/files/filesList'


interface Props {
  files: FilesList[]
  apikey: string | undefined
  companyId: string | undefined
}

export const FilesHeaderLayout: FC<Props> = ({ files , apikey,companyId }) => {
  const { push } = useRouter()
  const [searchitems, setSearchitems] = useState('')
  const limitAvatar = 5


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchitems(e.target.value)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    push(
      `archivos/?companyId=${companyId}&apikey=${apikey}${
        searchitems !== '' ? `&name=${searchitems}` : ''
      }`
    )
  }
  const handleClean = () => {
    setSearchitems('')
    push(`archivos/?companyId=${companyId}&apikey=${apikey}&page=0`)
  }
  


  return (
    <>
 
      <div
        className="container py-10"
        style={{
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 'auto',
          alignItems: 'center'
        }}
      >
        <Avatar
        
          src={second.src}
          style={{ width: '75px', height: '75px' }}
        />
        <h1 className="text-5xl font-bold">Archivos</h1>
        <AvatarGroup
        isBordered
                max={5}
          total={
            files.length - limitAvatar > 5
              ? files.length - limitAvatar
              : undefined
          }
          renderCount={(count: number) => (
            <p className="text-small text-foreground ml-2">+{count}</p>
          )} 
        >
          {files.map(
            (element, index) =>
              index < limitAvatar && (
                <Avatar
                name={element.title}
                  key={index}
                  size={'md'}
                  src={''}
                  alt={element.title}
                  radius="lg"
                />
              )
          )}
        </AvatarGroup>
      </div>  
      <div className="container m-auto pb-10">
        <div className="grid grid-cols-12 justify-between">
          <div className="grid col-span-8 flex-col">
            <form onSubmit={handleSubmit}>
              <Input
                onChange={handleChange}
                value={searchitems}
                aria-label="Buscar"
                placeholder="Buscar"
                
                startContent={<TbSearch />}
                width="100%"
                size="lg"
              />
            </form>
          </div>
          <div
            className="flex col-span-4 flex-row"
            style={{
              justifyContent: 'flex-end',
              alignContent: 'center',
              alignItems: 'flex-end'
            }}
          >
            
            <Button onPress={handleClean} variant={'flat'} color={'danger'}>
              <TbTrashFilled size={20} /> <Spacer x={1} /> Limpiar filtros
            </Button>
           
          </div>
        </div>
      </div>
    </>
  )
}