import {Spacer } from '@nextui-org/react'
import React, { FC, PropsWithChildren } from 'react'
import { SocialFooter } from './socialfooter';





export const Layout: FC<PropsWithChildren> = ({ children })=>{
    return (
     
        <div 
         
      style={{
        display:"flex",
        alignContent:"center",
        flexDirection:"column",
        justifyContent:"center",
        minHeight: 'calc(100vh - 80px)',
        minWidth: '100vw',}}>
            
            <div
        
        style={{
        minWidth: '600px',
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
      
    
        }}>
           
                
                {children}
                </div>
      <Spacer y={2} />
      <SocialFooter />  
      <Spacer y={1} />
        
                   
                     
                </div>
                
                
               
            
    )
}