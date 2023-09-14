import React from 'react'
import { Link, Spacer } from '@nextui-org/react'
import { FaGooglePlusSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa'

export const SocialFooter = () => {
  return (
    <div
      className="container"
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
        href="https://co.linkedin.com/showcase/valual/"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedin
          style={{
            cursor: 'pointer',
            width: '50px',
            height: '50px',
            color: '#0077b5'
          }}
        />
      </Link>
      <Spacer x={3} />
      <Link
        href="https://twitter.com/ValualApi"
        target="_blank"
        rel="noreferrer"
      >
        <FaTwitterSquare
          style={{
            cursor: 'pointer',
            width: '50px',
            height: '50px',
            color: '#1DA1F2'
          }}
        />
      </Link>
      <Spacer x={3} />
      <Link href="https://valual.com/" target="_blank" rel="noreferrer">
        <FaGooglePlusSquare
          style={{
            cursor: 'pointer',
            width: '50px',
            height: '50px',
            color: '#D92929'
          }}
        />
      </Link>
    </div>
  )
}
