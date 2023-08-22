import React, { FC } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Spacer,
  Avatar,
  Switch,
} from '@nextui-org/react'
import { ItemsList } from '../../interfaces/items/itemsList'
import { MdOutlineInventory2 } from 'react-icons/md'
import { TbCheck, TbX, TbHeart, TbHeartFilled, TbList } from 'react-icons/tb'
import { CardButtonDetails } from '../../components/componentsDetails/CardButtonDetails'
import { InformationDiv } from '../../components/componentsDetails/InformationDiv'

interface Props {
  data: ItemsList
}

export const ItemsDetailsHeader: FC<Props> = ({ data }) => {
  const currencyFormat = new Intl.NumberFormat('en-DE')

  return (
    <>
      <div className=" p-5 gap-5 ">
        <CardButtonDetails
          TextoBoton1={'ver movimientos'}
          TextoBoton2={'Inventario'}
          IconoBoton1={<TbList />}
          IconoBoton2={<MdOutlineInventory2 />}
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
                  fallback={<MdOutlineInventory2 size={70} />}
                  style={{
                    borderRadius: '40px',
                    width: '125px',
                    height: '125px'
                  }}
                  src={data.image}
                />
              </div>
            </CardHeader>

            <CardBody>
              <Spacer y={5} />
              <div className="flex justify-between w-auto">
                <h4 className="flex text-lg font-medium">Favorito</h4>
                <Switch
                  color="danger"
                  isSelected={data.isFavorite}
                  thumbIcon={({ isSelected }: { isSelected: boolean }) =>
                    isSelected ? <TbHeartFilled /> : <TbHeart />
                  }
                ></Switch>
              </div>

              <Spacer y={5} />
              <div className="flex justify-between w-auto">
                <h4 className="flex text-lg font-medium pt-2">Estado</h4>
                <Switch
                  isSelected={data.isActive}
                  color="success"
                  thumbIcon={({ isSelected }: { isSelected: boolean }) =>
                    isSelected ? <TbCheck /> : <TbX />
                  }
                ></Switch>
              </div>

              <Spacer y={5} />
              <div className="flex justify-between w-auto">
                <h4 className="flex text-lg font-medium pt-2">AIU</h4>
                <Switch
                  isSelected={data.isAiu}
                  color="success"
                  thumbIcon={({ isSelected }: { isSelected: boolean }) =>
                    isSelected ? <TbCheck /> : <TbX />
                  }
                ></Switch>
              </div>

              <Spacer y={5} />
              <div className="flex justify-between w-auto">
                <h4 className="flex text-lg font-medium pt-2">Inventario</h4>
                <Switch
                  isSelected={data.isInventory}
                  color="success"
                  thumbIcon={({ isSelected }: { isSelected: boolean }) =>
                    isSelected ? <TbCheck /> : <TbX />
                  }
                ></Switch>
              </div>
              <Spacer y={5} />
            </CardBody>
          </Card>
          <Card className="col-span-9 grid-row-2">
            <div className="text-center py-10 ">
              <h1 className="text-5xl font-bold  ">{data.name}</h1>
              <h3 className="text-2xl font-medium  pt-5">{data.group.name}</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 px-10 gap-5">
              <div className="grid-row-1 ">
                <InformationDiv
                  text={'Costo'}
                  info={currencyFormat.format(data.costPrice)}
                />
                <InformationDiv
                  text={'Ultimo Precio'}
                  info={currencyFormat.format(data.lastcostPrice)}
                />
                <InformationDiv
                  text={'Venta'}
                  info={currencyFormat.format(data.salePrice)}
                />
                <InformationDiv text={'Codigo'} info={data.code} />
                <InformationDiv text={'Codigo de barras'} info={data.barcode} />
              </div>
              <div className="grid-row-2">
                <InformationDiv
                  text={'Codigo del WOOCOMMERCE'}
                  info={data.wooCode.toString()}
                />
                <InformationDiv
                  text={'Impuesto en la bolsa'}
                  info={data.bagtaxPrice.toString()}
                />
                <InformationDiv text={'Nombre'} info={data.tax.name} />
                <InformationDiv
                  text={'Porcentaje'}
                  info={`${data.tax.value.toString()} %`}
                />
              </div>
            </div>
            {data.observations !== '' && (
              <div className="container p-10">
                <blockquote className="bg-gray-100 dark:bg-transparent p-5 rounded-2xl">
                  {data.observations}
                </blockquote>
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  )
}
