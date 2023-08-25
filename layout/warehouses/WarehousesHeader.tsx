import { Avatar, AvatarGroup } from '@nextui-org/react'
import React, { FC} from 'react'
import second from '../../public/assets/logo.png'
import { WarehouseList } from '../../interfaces/warehouses/warehousesList'

interface Props {
  houses: WarehouseList[]

}

export const WarehouseHeadersLayout: FC<Props> = ({
  houses,

}) => {

  const limitAvatar = 5

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
        <Avatar src={second.src} style={{ width: '75px', height: '75px' }} />
        <h1 className="text-5xl font-bold">Almacenes</h1>
        <AvatarGroup
          isBordered
          max={5}
          total={
            houses.length - limitAvatar > 5
              ? houses.length - limitAvatar
              : undefined
          }
          renderCount={(count: number) => (
            <p className="text-small text-foreground ml-2">+{count}</p>
          )}
        >
          {houses.map(
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

    </>
  )
}
