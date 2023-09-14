import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'

export const truncateText = (str: string, length = 60) => {
    if (str.length > length) {
      return (
        <Popover showArrow placement="bottom-start">
        <PopoverTrigger>
          <p className="cursor-pointer">
            {str.substring(0, length - 3) + '...'}
          </p>
        </PopoverTrigger>
        <PopoverContent className="p-3">
          <p>{str}</p>
        </PopoverContent>
      </Popover>
      )
    }

    return str
  }