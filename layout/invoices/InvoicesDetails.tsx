import React, { FC } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Spacer,
  Avatar,
  Switch
} from '@nextui-org/react'
import {  TbX, TbReceiptTax, TbList, TbUser } from 'react-icons/tb'
import { CardButtonDetails } from '../../components/componentsDetails/CardButtonDetails'
import { InvoicesDetailsList } from '../../interfaces/invoices/invoicesDetailsList'
import { InformationDivV2 } from '../../components/componentsDetails/InformationDivV2'

interface Props {
  data: InvoicesDetailsList
}


export const InvoicesDetails: FC<Props> = ({ data }) => {
    const date = new Date(data.date).toLocaleDateString('es', {
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
      const createDate = new Date(data.createDate).toLocaleDateString('es', {
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
          TextoBoton1={'ver'}
          TextoBoton2={'ver'}
          IconoBoton1={<TbList />}
          IconoBoton2={<TbList />}
        />

        <div
          className="grid grid-cols-1 lg:grid-cols-12   gap-5"
          style={{ justifyContent: 'center' }}
        >
          <Card className="col-span-9 lg:col-span-3 grid-row-1 ">
            <CardHeader style={{ padding: '0' }}>
              <div
                className=" pt-10 container"
                style={{
                  backgroundImage: `linear-gradient(#0070F0, white)`,
                  opacity: '0.3',
                  minWidth: '100%',
                  margin: '0',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Avatar
                  isBordered
                  showFallback
                  fallback={<TbUser size={70} />}
                  alt={data.company.name}
                  style={{
                    borderRadius: '40px',
                    width: '125px',
                    height: '125px'
                  }}
                />
              </div>
            </CardHeader>
            <CardBody>
              <Spacer y={5} />
              <div className="flex justify-between w-auto">
                <h4 className="text-lg font-medium">Fecha</h4>
                <p  >{date}</p>
                </div>
                <div className="flex justify-between w-auto">
                <h4 className="text-lg font-medium">Fecha de Vencimineto</h4>
                <p >{dueDate}</p>
                </div>
                <div className="flex justify-between w-auto">
                <h4 className="text-lg font-medium">Fecha de creacion</h4>
                <p >{createDate}</p>
                </div>
                <div className="flex justify-between w-auto">
                <h4 className="text-lg font-medium">Referencia</h4>
                <p >{data.reference}</p>
                </div>
                <div className="flex justify-between w-auto">
                <h4 className="text-lg font-medium">Estado</h4>
                <p >{data.status}</p>
                </div>

                <Spacer y={5} />
                {data.observations !== '' && (
              <div className="container p-1">
                <blockquote className="bg-gray-100 dark:bg-transparent p-5 rounded-2xl">
                  {data.observations}
                </blockquote>
              </div>
            )}






            </CardBody>
          </Card>

          <Card className="col-span-9 grid-row-2 ">
            <div className="text-center py-10 ">
              <h1 className="text-5xl font-bold  ">{data.company.name}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
              <div className="grid-row-1">
              <InformationDivV2 text={'Nombre de Compañia'} info={data.company.name} />
              <InformationDivV2 text={'Email'} info={data.company.email} />
              <InformationDivV2 text={'Nombre de Contacto'} info={data.contact.name} />
              <InformationDivV2 text={'Identificacion de Contacto'} info={data.contact.identification} />
              <InformationDivV2 text={'Email de Contacto'} info={data.contact.email} />
              <InformationDivV2 text={'Nombre de Numeracion'} info={data.numeration.name} />
              <InformationDivV2 text={'Resolucion'} info={data.numeration.resolution} />
              <InformationDivV2 text={'Prefijo'} info={data.numeration.prefix}/>
              <div className="grid grid-cols-4 gap-3">
                <h4 className="text-gray-400  col-span-2 text-right">Factura Electronica</h4>
                <Switch
                  isSelected={data.numeration.isElectronic}
                  color="success"
                  thumbIcon={({ isSelected }: { isSelected: boolean }) =>
                    isSelected ? <TbReceiptTax /> : <TbX />}>
                </Switch>
              </div>
              <InformationDivV2 text={'Nombre de Documento'} info={data.document.name}/>
              <InformationDivV2 text={'Codigo'} info={data.document.code}/>
              <InformationDivV2 text={'Banco'} info={data.warehouse.name}/>
              <InformationDivV2 text={'Metodo de Pago'} info={data.paymentMethod.name}/>















              </div>

              <div className="grid-row-2"></div>
            </div>
            {data.observations !== '' && (
              <div className="container p-10">
                <blockquote className="bg-gray-100 dark:bg-transparent p-5 rounded-2xl">
                  {data.observations}
                </blockquote>
              </div>
            )}
            <Spacer y={5} />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12  pt-5  gap-5">
          <Card className="col-span-9 lg:col-span-3 grid-row-1 "><CardBody></CardBody></Card>
          <Card className="col-span-9 grid-row-2"><CardBody></CardBody></Card>
        </div>
      </div>
    </>
  )
}
