import { Button, Card, Spacer } from '@nextui-org/react'
import React, { FC } from 'react'
import { TbEdit, TbArrowBackUp, TbList } from 'react-icons/tb'
import { MdOutlineInventory2 } from 'react-icons/md'
import { IconType } from 'react-icons'

interface Props {
  textboton1: string
  textboton2: string
  iconboton1: React.ReactNode
  iconboton2: React.ReactNode
}

export const CardButtonDetails: FC<Props> = ({
  textboton1,
  textboton2,
  iconboton1,
  iconboton2
}) => {
  return (
    <>
      <Card   style={{ justifyContent: 'center', height: '70px' }}>
        <div className="flex justify-between " >
          <div>
            <Button
              variant="light"
              className=" mx-3 md:ml-10 md:mr-3"
              color="primary"
              size="md"
              startContent={<TbEdit />}
                >
              Editar
            </Button>
            <Button
              variant="light"
              className="mx-3"
              color="primary"
              size="md"
              startContent={iconboton1}
            >
              {textboton1}
            </Button>
            <Button
              variant="light"
              className="mx-3"
              color="primary"
              size="md"
              startContent={iconboton2}
            >
              {textboton2}
            </Button>{' '}
          </div>

          <Button
            variant="flat"
            className="mx-3 md:mx-10"
            color="warning"
            size="md"
            startContent={<TbArrowBackUp />}
          >
            Volver
          </Button>
        </div>
      </Card>
      <Spacer y={5} />
    </>
  )
}
