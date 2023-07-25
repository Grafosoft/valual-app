import React from 'react'
import { Button,  Image, Spacer } from '@nextui-org/react'
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
        style={{ 
        minHeight: 'calc(100vh - 100px)', 
        maxHeight: '100vh',
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignContent:"center"
      }}
      >
        <div
          style={
            {
          display:"flex",
          flexDirection:"row",
          justifyContent:"center",
          alignContent:"center"
            }
          }
        >
          <div className='xs-6'>
            <Image
              src="/assets/404.svg"
              alt="404 Not Found"
              width={'100%'}
              style={{ transform: 'scale(2)' }}
            />
          </div>
          <div
           className='gird col-span-6'
            style={{ paddingLeft: '50px' ,
           flexDirection:"column",
          }}

          >
            <h1 color="primary"   style={{ letterSpacing: '5px',
            
           }}>
              404
            </h1>
            <h3 >
              Parece que te has perdido
            </h3>
            <h5 color="$accents7">
              La página que estás buscando no se encuentra disponible
            </h5>
            <Spacer y={1} />
            <Button
              size={'lg'}
              onPress={handleClickHome}
              color={'primary'}
              flat
              style={{ width: '50px' }}
              icon={<TbArrowBigLeftFilled />}
            >
              Volver
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}