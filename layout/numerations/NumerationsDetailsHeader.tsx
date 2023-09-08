import React, { FC } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Spacer,
  Avatar,
} from '@nextui-org/react'
import { MdOutlineInventory2 } from 'react-icons/md'
import { AiOutlineFieldNumber } from 'react-icons/ai'

import {  TbList } from 'react-icons/tb'
import { CardButtonDetails } from '../../components/componentsDetails/CardButtonDetails'
import { InformationDivV2 } from '../../components/componentsDetails/InformationDivV2'
import { NumerationsList } from '../../interfaces/numerations/numerationsList'

interface Props {
  data: NumerationsList
}

export const NumerationsDetailsHeader: FC<Props> = ({ data }) => {
  const date = new Date(data.date).toLocaleDateString('es', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
  const startDate = new Date(data.startDate).toLocaleDateString('es', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
  const dueDate = new Date(data.dueDate).toLocaleDateString('es', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
  return (
    <>
      <div className=" p-5 gap-5 ">
        <CardButtonDetails
          textboton1={'ver movimientos'}
          textboton2={'Inventario'}
          iconboton1={<TbList />}
          iconboton2={<MdOutlineInventory2 />}
        />

        <div
          className="grid grid-cols-1 lg:grid-cols-12   gap-5"
          style={{ justifyContent: 'center' }}
        >
          <Card className="col-span-9 lg:col-span-3 grid-row-1 ">
            <CardHeader style={{ padding: '0' }}>
              <div
                className="pt-10 container"
                style={{
                  backgroundImage: `linear-gradient(#0070F0, white)`,
                  height: '150px',
                  opacity: '0.3',
                  minWidth: '100%',
                  margin: '0',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Avatar
                  isBordered
                  alt={data.name}
                  showFallback
                  fallback={<AiOutlineFieldNumber size={70} />}
                  style={{
                    borderRadius: '40px',
                    width: '125px',
                    height: '125px'
                  }}
                />
              </div>
              <div>
                </div>
            </CardHeader>

            <CardBody>
              <Spacer y={5} />
              <div className="flex justify-between w-auto">
                <h4 className="text-lg font-medium">Fecha</h4>
                <p>{date}</p>
              </div>
              <div className="flex justify-between w-auto">
                <h4 className="text-lg font-medium">Fecha de Inico</h4>
                <p>{startDate}</p>
              </div>
              <div className="flex justify-between w-auto">
                <h4 className="text-lg font-medium">Fecha de Vencimineto</h4>
                <p>{dueDate}</p>
              </div>


              <div className="flex justify-between w-auto">
                <h4 className="text-lg font-medium">Estado</h4>
                <p>{data.status}</p>

              </div>
              <Spacer y={5} />
              </CardBody>
          </Card>
          <Card className="col-span-9 grid-row-2">
            <div className="text-center py-10 ">
              <h1 className="text-5xl font-bold  ">{data.name}</h1>
              <h3 className="text-2xl font-medium  pt-5">{data.authorization}</h3>

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 px-10 gap-5">
              <div className="grid-row-1 ">
                <InformationDivV2
                  text={'Número Desde'}
                  info={data.fromNumber}
                />
                <InformationDivV2
                  text={'Número Hasta'}
                  info={data.toNumber}
                />
                <InformationDivV2
                  text={'Número Inicial'}
                  info={data.startNumber}
                />
                <InformationDivV2 text={'Número Final'} info={data.currentNumber} />


              </div>
              <div className="grid-row-2">
              <InformationDivV2 text={'Clave Tecnica'} info={data.technicalKey} />
                <InformationDivV2
                  text={'Tipo'}
                  info={data.type.name}
                />
                <InformationDivV2
                  text={'Software'}
                  info={data.software.name}
                />

              </div>
            </div>

          </Card>
        </div>
      </div>
    </>
  )
}
