import { Card, CardBody,Image } from '@nextui-org/react'
import React, { FC, PropsWithChildren } from 'react'
import second from '../public/assets/valual.png'
import { SocialFooter } from './socialfooter';





export const Layout: FC<PropsWithChildren> = ({ children })=>{
    return (
        <div 
        className="flex h-screen ">
            
            <div
             className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
                
                
                
               <Card 
               
                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                shadow="sm"
                style={{
                    display: 'flex',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(70deg, blue, pink)'
               
                }}
               >
                
                   
                        <Image
                        src={second.src}
                        width={300}
                 
                        
                        />
                        
                    
                    
                   
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