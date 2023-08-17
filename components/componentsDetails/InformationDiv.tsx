import React, { FC } from 'react'

interface Props {
    text: string
    info: string | undefined
 
  }
  
export const InformationDiv: FC<Props> = ({text,info
  
  }) => {
  
  
    return (
        <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 col-start-1 text-right">{text}</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4 ">{info} </h3>
               </div>

    )} 