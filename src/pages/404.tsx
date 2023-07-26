import React from 'react'
import { Button, Image, Spacer } from '@nextui-org/react'
import { TbArrowBigLeftFilled } from 'react-icons/tb'
import { useRouter } from 'next/router'

export default function FourOhFour() {
  const { back } = useRouter()

  const handleClickHome = () => {
    back()
  }

  return (
    <>
      <div
        className="container grid grid-cols-2 items-center "
        style={{
          minHeight: 'calc(100vh - 100px)',
          maxHeight: '100vh',

          margin: 'auto'
        }}
      >
        <div className="col-span-1">
          <Image src="/assets/404.svg" alt="404 Not Found" width={'100%'} />
        </div>
        <div className="col-span-1" style={{ paddingLeft: '50px' }}>
          <h1
            className="font-black"
            style={{
              fontSize: '200px',
              letterSpacing: '5px',
              width: '200px',
              color: '#f5a524'
            }}
          >
            
            404
          </h1>
          <h3
            className="text-2xl font-bold"
            style={{ textTransform: 'uppercase' }}
          >
            Parece que te has perdido
          </h3>
          <Spacer y={5} />
          <h5 className="text-gray-400">
            La página que estás buscando no se encuentra disponible
          </h5>
          <Spacer y={5} />
          <Button
            size={'lg'}
            variant={'flat'}
            onPress={handleClickHome}
            color={'warning'}
            startContent={<TbArrowBigLeftFilled />}
          >
            <p className="px-12 pl-11">Volver</p>
          </Button>
        </div>
      </div>
    </>
  )
}