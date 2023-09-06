import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { TbArrowRight } from 'react-icons/tb'
import { ActivityList } from '../../interfaces/activity/activityList'

interface Props {
  activity: ActivityList
  columnKey: React.Key
  searchActivity: string | undefined
  urlPath: string | undefined
  closeHandler: () => void
  setActivitySearch: (inititalState: { id: string; code:string; name: string }) => void
}

export const RenderCellActivity: FC<Props> = ({
  activity,
  columnKey,
  searchActivity,
  urlPath,
  closeHandler,
  setActivitySearch
}) => {
  const { push } = useRouter()

  switch (columnKey) {
    
    case 'name':
      return (
        <p
          className="font-medium"
          style={{ fontSize: '15px'}}
        >
          {activity.name}
        </p>
      )
    case 'action':
      return (
        <div className="grid align-center">
          <TbArrowRight
            cursor={'pointer'}
            onClick={() => {
              setActivitySearch({
                id: activity.id.toString(),
                code: `${activity.id} `,
                name: `${activity.name} `
              })
              closeHandler()
              urlPath !== 'form' &&
                push(
                  `${urlPath}?apikey=${localStorage.getItem(
                    'apikey'
                  )}&${
                    searchActivity !== '' ? `&name=${searchActivity}` : ''
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
          {activity.name}
        </b>
      )
  }
}
