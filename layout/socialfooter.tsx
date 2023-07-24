import React from 'react'
import { Avatar, Link, Spacer } from '@nextui-org/react'

export const SocialFooter = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: '100px',
        minWidth: '100vw',
        maxWidth: '100vw',
        margin: '0'
      }}
    >
      <Spacer x={1} />
      <Link
        href="https://co.linkedin.com/company/grafosoft"
        target="_blank"
        rel="noreferrer"
      >
        <Avatar
          style={{ cursor: 'pointer' }}
          size={'md'}
          src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/linkedin_circle-512.png"
        />
      </Link>
      <Spacer x={1} />
      <Link
        href="https://twitter.com/grafosoft"
        target="_blank"
        rel="noreferrer"
      >
        <Avatar
          style={{ cursor: 'pointer' }}
          size={'md'}
          src="data:image/png;base64,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"
        />
      </Link>
      <Spacer x={1} />
      <Link href="https://grafosoft.com" target="_blank" rel="noreferrer">
        <Avatar
          style={{ cursor: 'pointer' }}
          size={'md'}
          src="https://brandlogos.net/wp-content/uploads/2015/09/google-favicon-vector.png"
        />
      </Link>
    </div>
  )
}
