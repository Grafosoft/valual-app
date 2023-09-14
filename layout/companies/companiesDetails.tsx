import React, { FC } from 'react'
import { CompaniesDetailsList } from '../../interfaces/companies/companiesDetailsList'
import { Avatar, Card, CardBody, CardHeader } from '@nextui-org/react'
import { TbBuilding } from 'react-icons/tb'
import { InformationDiv } from '../../components/componentsDetails/InformationDiv'

interface Props {
  data: CompaniesDetailsList
}

export const ContactsDetails: FC<Props> = ({ data }) => {
  return (
    <>
      <div className=" p-5 gap-5 ">
        <Card>
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
                alt={data.name}
                showFallback
                fallback={<TbBuilding size={70} />}
                src={data.image}
                style={{
                  borderRadius: '40px',
                  width: '125px',
                  height: '125px'
                }}
              />
            </div>
          </CardHeader>
          <CardBody>
            <div className="text-center ">
              <h1 className="text-5xl font-bold  ">{data.name}</h1>
              <h3 className="text-2xl font-medium  pt-5">
                {data.identificationType.code} {data.identification}
              </h3>
            </div>
          </CardBody>
        </Card>{' '}
      </div>
      <div className="grid grid-cols-6 lg:grid-cols-12 px-5  gap-5">
        <Card className="col-span-6 ">
          <CardBody>
            <InformationDiv text={'Celular'} info={data.phone} />
            <InformationDiv text={'Correo Electronico'} info={data.email} />
            <InformationDiv text={'Direccion'} info={data.adress} />
            <InformationDiv text={'Codigo Postal'} info={data.city.code} />
            <InformationDiv text={'Cuidad'} info={data.city.name} />
            <InformationDiv text={'Departamento'} info={data.department} />
            <InformationDiv
              text={'Codigo comercial'}
              info={data.commercialCode}
            />
          </CardBody>
        </Card>

        <Card className="col-span-6 ">
          <CardBody>
            <InformationDiv text={'Persona'} info={data.tax.person} />
            <InformationDiv text={'Regimen'} info={data.tax.regime} />
            <InformationDiv
              text={'Responsabilidad'}
              info={data.tax.responsibility}
            />
            <InformationDiv
              text={'Codigo de actividad'}
              info={data.activity.code}
            />
            <InformationDiv
              text={'Tipo de actividad'}
              info={data.activity.name}
            />
            <InformationDiv
              text={'Terminos de Facturacion'}
              info={data.invoice.terms}
            />
            <InformationDiv
              text={'Correo de Facturacion'}
              info={data.invoice.notificationEmail}
            />
            <InformationDiv
              text={'Nombre de Contacto'}
              info={data.invoice.contact.name}
            />
          </CardBody>
        </Card>
      </div>
    </>
  )
}
