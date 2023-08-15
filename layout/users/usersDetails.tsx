import React ,{ FC } from "react"
import { Avatar, Card, CardBody, CardHeader, Image, Switch } from "@nextui-org/react"
import {  TbCheck, TbUser, TbX } from "react-icons/tb"
import { Infodiv } from "../../components/componentsDetails/div"
import { UserList } from "../../interfaces/user/userList"

interface Props {
    data: UserList
  }
  
  export const UsersDetails: FC<Props> = ({ data }) => {
    return (
      <>
       <div
      className=" p-5 gap-5 "     
    >
        <Card >
          <CardHeader style={{ padding: '0' }}>
            <div
              className=" pt-10 container"
              style={{
                backgroundImage: `linear-gradient(#0070F0, white)`,                          
                opacity: '0.3',
                minWidth: '100%',
                margin: '0',
                display:'flex',
                justifyContent: 'center'          
              }}
            >
              <Avatar
              isBordered
              alt={data.name}
              showFallback
              fallback={<TbUser  size={70}  />}
              src={data.image}
              style={{
                borderRadius: '40px',
                width: '125px',
                height: '125px',
              }}        
            />
            </div>  
            </CardHeader> 
            <CardBody>
         
            <div  className="text-center" >
             <h1 className="text-5xl font-bold  ">{data.name}</h1>
             <h3 className="text-2xl font-medium  pt-5">{data.identificationType.code} {data.identification}</h3>  
             <div style={{display: "flex", justifyContent:"center"}} >
             <Image width={200} src={data.signature}></Image></div>
             </div>

         </CardBody>
            </Card> </div>
            <div
      className="grid grid-cols-6 lg:grid-cols-12 px-5  gap-5">

              <Card className="col-span-6 "><CardBody>
              <Infodiv
              texto={"Usuario"}
              info={data.user}/> 
              <Infodiv
              texto={"Correo Electronico"}
              info={data.email}/>   
               <Infodiv
              texto={"Primer Nombre"}
              info={data.firstName}/> 
               <Infodiv
              texto={"Nombre Familiar"}
              info={data.familyName}/> 
               <Infodiv
              texto={"Celular"}
              info={data.phone}/> 
                 <Infodiv
              texto={"Ciudad"}
              info={data.country.code}/> 
              
           
            
                  
                    </CardBody></Card>

<Card className="col-span-6 "><CardBody>
              
              <Infodiv
              texto={"Título Profesional"}
              info={data.jobTitle}/> 
                  <Infodiv
              texto={"Departamento"}
              info={data.organizationDepartment}/> 
             
             <div className="grid grid-cols-4 p-1 gap-3" >
               <h3 className="text-gray-400 col-start-1 text-right">Aplicacion Movil</h3>  
               <div className="text-left col-start-2 col-end-4 ">     
              <Switch 
              size="sm"
                color="warning"
                isSelected={data.isMobileApp} 
                thumbIcon={({ isSelected }: {isSelected: boolean}) =>
                isSelected ? (
                  <TbCheck />
                ) : (
                  <TbX  />
                )
                }
            >        
               </Switch></div></div>  
              
               <div className="grid grid-cols-4 p-1 gap-3" >
               <h3 className="text-gray-400 col-start-1 text-right">¿Esta Activo?</h3>  
               <div className="text-left col-start-2 col-end-4 ">     
              <Switch size="sm"
                color="warning"
                isSelected={data.isActive} 
                thumbIcon={({ isSelected }: {isSelected: boolean}) =>
                isSelected ? (
                  <TbCheck />
                ) : (
                  <TbX  />
                )
                }
            >        
               </Switch></div></div>  
              <Infodiv
              texto={"Estado"}
              info={data.status}/> 
              
                 
              
  </CardBody></Card>
      </div>
            
           
      </>
    )}