import { Avatar, AvatarGroup } from '@nextui-org/react'
import React, { FC} from 'react'
import second from '../../public/assets/logo.png'
import { SellersList } from '../../interfaces/sellers/sellersList'

interface Props {
  sellers: SellersList[]

}

export const SellersHeadersLayout: FC<Props> = ({
  sellers,

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
        <h1 className="text-5xl font-bold">Vendedores</h1>
        <AvatarGroup
          isBordered
          max={5}
          total={
            sellers.length - limitAvatar > 5
              ? sellers.length - limitAvatar
              : undefined
          }
          renderCount={(count: number) => (
            <p className="text-small text-foreground ml-2">+{count}</p>
          )}
        >
          {sellers.map(
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
