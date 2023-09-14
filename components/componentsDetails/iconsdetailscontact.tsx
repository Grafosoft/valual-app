import React, { FC } from 'react'
import { ContactsDetailsList } from '../../interfaces/contacts/contactsDetailsList'
import { Spacer } from '@nextui-org/react'
import Link from 'next/link'
import { TbWorld } from 'react-icons/tb'
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineWhatsApp
} from 'react-icons/ai'

interface Props {
  data: ContactsDetailsList
}

export const IconsDestailsContact: FC<Props> = ({ data }) => {
  return (
    <>
      <Spacer y={5} />

      {data.observations !== '' && (
        <div className="container p-10">
          <blockquote className="bg-gray-100 dark:bg-transparent p-5 rounded-2xl">
            {data.observations}
          </blockquote>
        </div>
      )}

      {data.observations !== '' && (
        <div>
          <Link className="flex" target="_blank" href={data.media.website}>
            <TbWorld
              size={25}
              className="cursor-pointer mx-3"
              color="#52525B"
            />
            <p
              className="text-black-400"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Website
            </p>
          </Link>
        </div>
      )}
      {data.media.facebook !== '' && (
        <div>
          <Link className="flex" target="_blank" href={data.media.facebook}>
            <AiOutlineFacebook
              size={25}
              className="cursor-pointer mx-3"
              color="#006FEE"
            />
            <p
              className="text-black-400"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Facebook
            </p>
          </Link>
        </div>
      )}
      {data.media.instagram !== '' && (
        <div>
          <Link className="flex" target="_blank" href={data.media.instagram}>
            <AiOutlineInstagram
              size={25}
              className="cursor-pointer mx-3"
              color="#f31260"
            />
            <p
              className="text-black-400"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Instagram
            </p>
          </Link>
        </div>
      )}
      {data.media.linkedin !== '' && (
        <div>
          <Link className="flex" target="_blank" href={data.media.linkedin}>
            <AiOutlineLinkedin
              size={25}
              className="cursor-pointer mx-3"
              color="#006FEE"
            />
            <p
              className="text-black-400"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Linkedin
            </p>
          </Link>
        </div>
      )}

      {data.communication.whatsapp !== '' && (
        <div>
          <Link
            className="flex"
            target="_blank"
            href={data.communication.whatsapp}
          >
            <AiOutlineWhatsApp
              size={25}
              className="cursor-pointer mx-3"
              color="#17C964"
            />
            <p
              className="text-black-400"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Whatsapp
            </p>
          </Link>
        </div>
      )}
    </>
  )
}
