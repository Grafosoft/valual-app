import { Avatar, AvatarGroup, Button, Input, Spacer } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FC, FormEventHandler, useState } from 'react'
import { TbSearch, TbTrashFilled } from 'react-icons/tb'
import { NumerationsList } from '../../interfaces/numerations/numerationsList'

import second from '../../public/assets/logo.png'

interface Props {
  numerations: NumerationsList[]
  apikey: string | undefined
  companyId: string | undefined
}

export const NumerationsHeadersLayout: FC<Props> = ({
    numerations,
    apikey,
    companyId
}) => {
  const { push } = useRouter()
  const [searchNumerations , setSearchNumerations] = useState('')

  const limitAvatar = 5

  const handleClean = () => {
    setSearchNumerations('')
    push(`numeracion/?companyId=${companyId}&apikey=${apikey}&page=0`)
  }



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchNumerations(e.target.value)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    push(
      `/numeracion?apikey=${apikey}&companyId=${companyId}${
        searchNumerations !== '' ? `&name=${searchNumerations}` : ''
      }`
    )

    
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
        <h1 className="text-5xl font-bold">Numeracion</h1>
        <AvatarGroup
          isBordered
          max={5}
          total={
            numerations.length - limitAvatar > 5
              ? numerations.length - limitAvatar
              : undefined
          }
          renderCount={(count: number) => (
            <p className="text-small text-foreground ml-2">+{count}</p>
          )}
        >
          {numerations.map(
            (element, index) =>
              index < limitAvatar && (
                <Avatar
                  name={element.name}
                  key={index}
                  size={'md'}
                  radius="lg"
                  src=""
                  alt={element.name}

                 
                />
              )
          )}
        </AvatarGroup>
      </div>
      <div className="container m-auto pb-10">
        <div className="grid grid-cols-12 justify-between">
          <div className="grid col-span-8 flex-col">
            <form onSubmit={handleSubmit} style={{ width: '60vw' }}>
              <Input
                aria-label="Buscar Numeracio"
                placeholder="Buscar Numeracio"
                type="search"
                startContent={<TbSearch />}
                onChange={handleChange}
                value={searchNumerations}
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
            <Button onPress={handleClean} variant={'flat'} color="danger">
              <TbTrashFilled size={20} /> <Spacer x={1} /> Limpiar filtros
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}