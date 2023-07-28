import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import {
  TbArrowBigLeftLinesFilled,
  TbArrowBigRightLinesFilled
} from 'react-icons/tb'

interface Props {
  urlBack: string
  urlNext: string
  currentPage: number
  color?: string
}

export const PaginationList: FC<Props> = ({
  urlBack,
  urlNext,
  currentPage,
  color = 'warning'
}) => {
  const { push } = useRouter()

  return (
    <div className="flex w-full justify-center py-12">
      <Button
        size="md"
        startContent={<TbArrowBigLeftLinesFilled />}
        color={color}
        variant="flat"
        isDisabled={currentPage === 1}
        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
        onPress={() => push(urlBack)}
      >
        Anterior
      </Button>
      <div className="container w-12 bg-gray-100 flex justify-center items-center">
        <p className="font-medium text-xl">{currentPage}</p>
      </div>
      <Button
        size="md"
        endContent={<TbArrowBigRightLinesFilled />}
        color={color}
        variant="flat"
        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
        onPress={() => push(urlNext)}
      >
        Siguiente
      </Button>
    </div>
  )
}