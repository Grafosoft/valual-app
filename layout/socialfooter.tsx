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
          size={'lg'}
          src="https://static.vecteezy.com/system/resources/previews/002/534/045/original/social-media-twitter-logo-blue-isolated-free-vector.jpg"
        />
      </Link>
      <Spacer x={1} />
      <Link href="https://grafosoft.com" target="_blank" rel="noreferrer">
        <Avatar
          style={{ cursor: 'pointer' }}
          size={'lg'}
          src="https://brandlogos.net/wp-content/uploads/2015/09/google-favicon-vector.png"
        />
      </Link>
    </div>
  )
}
