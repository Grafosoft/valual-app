import { Button, Card, Spacer } from '@nextui-org/react'
import React, { FC } from 'react'
import { TbEdit, TbArrowBackUp, TbList } from 'react-icons/tb'
import { MdOutlineInventory2 } from 'react-icons/md'

interface Props {
  TextoBoton1: string
  TextoBoton2: string
  IconoBoton1: any
  IconoBoton2: any
}

export const Cardbuttondetails: FC<Props> = ({
  TextoBoton1,
  TextoBoton2,
  IconoBoton1,
  IconoBoton2
}) => {
  return (
    <>
      <Card style={{ justifyContent: 'center', height: '70px' }}>
        <div style={{ justifyContent: ' space-between', display: 'flex' }}>
          <div>
            <Button
              variant="light"
              className="ml-10 mr-3"
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
              startContent={IconoBoton1}
            >
              {TextoBoton1}
            </Button>
            <Button
              variant="light"
              className="mx-3"
              color="primary"
              size="md"
              startContent={IconoBoton2}
            >
              {TextoBoton2}
            </Button>{' '}
          </div>

          <Button
            variant="flat"
            className="mx-10"
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
