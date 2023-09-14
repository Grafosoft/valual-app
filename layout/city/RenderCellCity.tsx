import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { TbArrowRight } from 'react-icons/tb'
import { CityList } from '../../interfaces/city/cityList'


interface Props {
  city: CityList
  columnKey: React.Key
  searchCity: string | undefined
  urlPath: string | undefined
  closeHandler: () => void
  setCitySearch: (inititalState: { id: string; code:string; name: string }) => void
}

export const RenderCellCity: FC<Props> = ({
  city,
  columnKey,
  searchCity,
  urlPath,
  closeHandler,
  setCitySearch
}) => {
  const { push } = useRouter()

  switch (columnKey) {

    case 'code':
      return (
        <p className="font-medium" style={{ fontSize: '15px' }}>
          {city.code}
        </p>
      )

    case 'name':
      return (
        <p
          className="font-medium"
          style={{ fontSize: '15px'}}
        >
          {city.name}
        </p>
      )
    case 'action':
      return (
        <div className="grid align-center">
          <TbArrowRight
            cursor={'pointer'}
            onClick={() => {
              setCitySearch({
                id: city.id.toString(),
                code: `${city.code} `,
                name: `${city.name} `
              })
              closeHandler()
              urlPath !== 'form' &&
                push(
                  `${urlPath}?apikey=${localStorage.getItem(
                    'apikey'
                  )}&${
                    searchCity !== '' ? `&name=${searchCity}` : ''
                  }`
                )
            }}
            size={20}
          />
        </div>
      )

    default:
      return (
        <b style={{ fontSize: '15px', textTransform: 'capitalize' }}>
          {city.name}
        </b>
      )
  }
}
