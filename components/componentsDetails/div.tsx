import React, { FC } from 'react'

interface Props {
    texto: string
    info: string | undefined
 
  }
  
export const Infodiv: FC<Props> = ({texto,info
  
  }) => {
  
  
    return (
        <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">{texto}</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4 ">{info} </h3>
               </div>

    )} 