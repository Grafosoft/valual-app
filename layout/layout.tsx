import { Card } from '@nextui-org/card'
import React, { FC, PropsWithChildren } from 'react'





export const Layout: FC<PropsWithChildren> = ({ children })=>{
    return (
        <div 
        className="flex h-screen ">
            
            <div
             className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
                
               <Card 
                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                shadow="sm"
                style={{position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(70deg, blue, pink)'
                }}
               >
                
                    <div 
                    style={{position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    top:"0",
                    width: "100%",
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "65% 100px",
                    zIndex: "1",
                    
                    background:" url('../public/assets/img2.png') no-repeat"}}
                    ></div>
                    
                    
                   </Card>
               
                <div className="right flex flex-col justify-evenly">
                    <div className="text-center py-10">
                        {children}
                     </div>
                </div>
            </div>
  
        </div>
    )
}