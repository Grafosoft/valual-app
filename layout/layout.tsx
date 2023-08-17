import { Link, Spacer } from '@nextui-org/react'
import React, { FC, PropsWithChildren } from 'react'
import { SocialFooter } from './socialfooter'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="container"
      style={{
        minHeight: 'calc(100vh - 80px)',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '650px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {children}
      </div>
      <Spacer y={2} />
      <SocialFooter />
      <Spacer y={1} />
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <Link href="https://valual.com/terminos-de-uso/" target="_blank">
          Términos de Uso
        </Link>
        <Spacer x={1} />
        <span> - </span>
        <Spacer x={1} />
        <Link href="https://valual.com/politica-de-privacidad/" target="_blank">
          Políticia de privacidad
        </Link>
      </div>
    </div>
  )
}
