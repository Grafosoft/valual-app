import React, { ChangeEvent, FC, FormEventHandler, useState } from 'react'
import { Avatar, AvatarGroup, Button, Input, Spacer } from '@nextui-org/react'
import { TbHistory, TbSearch, TbTrashFilled } from 'react-icons/tb'
import { useRouter } from 'next/router'
import { ItemsList } from '../../interfaces/items/itemsList'
import valualApi from '@/apis/valualApi'
import second from '../../public/assets/logo.png'


interface Props {
  subs: ItemsList[]
  apikey: string | undefined
}

export const CatalHeaderLayout: FC<Props> = ({ subs , apikey }) => {
  const { push } = useRouter()
  const [searchSub, setSearchSub] = useState('')
  const limitAvatar = 5


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchSub(e.target.value)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    push(
      `/suscripcion/${valualApi}/?apikey=${apikey}${
        searchSub !== '' ? `&name=${searchSub}` : ''
      }`
    )
  }
  const handleClean = () => {
    setSearchSub('')
    push(`/suscripcion/${valualApi}/?apikey=${apikey}&page=0`)
  }



  return (
    <>
      <Spacer y={3} />  
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
        <h1 className="text-4xl font-bold">Tus Productos </h1>
        <AvatarGroup
        isBordered
                max={5}
          total={
            subs.length - limitAvatar > 5
              ? subs.length - limitAvatar
              : undefined
          }
          renderCount={(count: number) => (
            <p className="text-small text-foreground ml-2">+{count}</p>
          )} 
        >
          {subs.map(
            (element, index) =>
              index < limitAvatar && (
                <Avatar
                name={element.name}
                  key={index}
                  size={'md'}
                  src={element.image || ''}
                  alt={element.name}
                  radius="lg"
                />
              )
          )}
        </AvatarGroup>
      </div>
      <Spacer y={5} />
    
      <div className="container m-auto pb-10">
        <div className="grid grid-cols-12 justify-between">
          <div className="grid col-span-8 flex-col">
            <form onSubmit={handleSubmit}>
              <Input
                onChange={handleChange}
                value={searchSub}
                aria-label="Buscar"
                placeholder="Buscar"
                type="search"
                startContent={<TbSearch />}
                isClearable
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
            
            <Spacer x={10} />
            <Button onPress={handleClean} variant={'flat'} color={'danger'}>
              <TbTrashFilled size={20} /> <Spacer x={1} /> Limpiar filtros
            </Button>
           
          </div>
        </div>
      </div>
    </>
  )
}