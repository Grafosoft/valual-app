import React, { ChangeEvent, FC, FormEventHandler, useState } from 'react'
import { Avatar, AvatarGroup, Button, Input, Spacer } from '@nextui-org/react'
import { TbHistory, TbSearch } from 'react-icons/tb'
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


  return (
    <>
      <div
        className="container"
        style={{
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Avatar
          src={second.src}
          style={{ width: '65px', height: '65px' }}
        />
        <h1>Tus Productos </h1>
        <AvatarGroup
                max={5}
          total={
            subs.length - limitAvatar > 5
              ? subs.length - limitAvatar
              : undefined
          }
        >
          {subs.map(
            (element, index) =>
              index < limitAvatar && (
                <Avatar
                name={element.name}
                  key={index}
                  size={'lg'}
                  src={element.image || ''}
                  alt={element.name}
                  radius="md"
                />
              )
          )}
        </AvatarGroup>
      </div>
      <Spacer y={1} />
      <div className="container">
        <div className="grid grid-cols-2 justify-between">
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
            className="grid col-span-4"
            style={{
              justifyContent: 'flex-end',
              alignContent: 'center',
              alignItems: 'flex-end'
            }}
          >
            <Button
              onPress={() =>
                push(
                  `/pagos/${valualApi}/?apikey=${localStorage.getItem(
                    'apikey'
                  )}&page=0`
                )
              }
              variant={'flat'}
              color={'primary'}
            >
              <TbHistory size={20} /> <Spacer x={1} /> Historial de pagos
            </Button>
            <Spacer x={2} />
           
          </div>
        </div>
      </div>
    </>
  )
}