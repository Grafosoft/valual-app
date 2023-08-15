import React, { FC } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Spacer,
  Avatar,
  Switch,
} from '@nextui-org/react'
import { TbCheck,TbX ,TbBellFilled ,TbList,TbUser } from 'react-icons/tb'
import { ContactsDetailsList } from '../../interfaces/contacts/contactsDetailsList'
import { TabletContactsDetails } from './tabletContactsDetails'
import { Infodiv } from '../../components/componentsDetails/div'
import { Cardbuttondetails } from '../../components/componentsDetails/cardbuttondetails'
import { IconsDestailsContact } from '../../components/componentsDetails/iconsdetailscontact'
import { ContactsAttachments } from './contactsAttachments'




interface Props {
  data: ContactsDetailsList
}

export const ContactsDetails: FC<Props> = ({ data }) => {
  return (
    <>
    <div
      className=" p-5 gap-5 "     
    >
      <Cardbuttondetails
      TextoBoton1={"ver"}
      TextoBoton2={"ver"}
      IconoBoton1={<TbList/>}
      IconoBoton2={<TbList/>}


      />


      <div
      className="grid grid-cols-1 lg:grid-cols-12   gap-5"
      style={{ justifyContent: 'center'}}
    >
        <Card className="col-span-9 lg:col-span-3 grid-row-1 " >
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
              showFallback
              fallback={<TbUser size={70} />}
              alt={data.commercialName}
              style={{
                borderRadius: '40px',
                width: '125px',
                height: '125px',
              }}        
            />
            </div>          
          </CardHeader>
          <CardBody >
          <Spacer y={5} />
            <div className="flex justify-between w-auto">
              <h4 className="flex text-lg font-medium">Cumpleaños</h4>         
              <Switch
                color="warning"
                isSelected={data.isBirthdayNotification} 
                thumbIcon={({ isSelected }: {isSelected: boolean}) =>
                isSelected ? (
                  <TbBellFilled />
                ) : (
                  <TbX  />
                )
                }
            >        
               </Switch>
                    </div>

                    <Spacer y={5} />
                <div className="flex justify-between w-auto">
                <h4 className="flex text-lg font-medium pt-2" >
                  Estado
                </h4>
                <Switch isSelected={data.isActive} 
                color="success"
                thumbIcon={({ isSelected }: {isSelected: boolean}) =>
                isSelected ? (
                  <TbCheck  />
                ) : (
                  <TbX  />
                )
                }
            > 
               </Switch>
                </div>
                <Spacer y={5} />       
                 <div className="flex justify-between w-auto">
                <h4 className="flex text-lg font-medium pt-2">
                Tiene impuesto
                 </h4>
                 <Switch isSelected={data.isTaxResident} 
                color="success"
                thumbIcon={({ isSelected }: {isSelected: boolean}) =>
                isSelected ? (
                  <TbCheck  />
                ) : (
                  <TbX  />
                )
                }
            >
               </Switch>
                </div>
                <Spacer y={5} />
                 <div className="flex justify-between w-auto">
                <h4 className="flex text-lg font-medium pt-2">
                Es vendedor
                 </h4>
                 <Switch isSelected={data.isSeller} 
                color="success"
                thumbIcon={({ isSelected }: {isSelected: boolean}) =>
                isSelected ? (
                  <TbCheck  />
                ) : (
                  <TbX  />
                )
                }
            >
               </Switch> 
               </div>
               
               <IconsDestailsContact
                data={data}               
               />
          </CardBody>
        </Card>


        <Card className="col-span-9 grid-row-2 ">
          <div className="text-center py-10 " >
             <h1 className="text-5xl font-bold  ">{data.commercialName}</h1>
             <h3 className="text-2xl font-medium  pt-5">{data.type}</h3>               
               </div> 

              <div  className="grid grid-cols-1 lg:grid-cols-2 px-10 gap-5 " > 
              <div className="grid-row-1"  >    
              <Infodiv
              texto={"Nombre comercial"}
              info={data.commercialName}/>  
                <Infodiv
              texto={"Tipo de Identifiacion"}
              info={data.identificationType.name}/>  
                <Infodiv
              texto={"Identificacion"}
              info={data.identification}/>  
                <Infodiv
              texto={"Primer Nombre"}
              info={data.firstName}/>
              <Infodiv
              texto={"Segundo Nombre"}
              info={data.middleName}/>  
              <Infodiv
              texto={"Primer Apellido"}
              info={data.firstSurname}/>  
              <Infodiv
              texto={"Segundo Apellido"}
              info={data.secondSurname}/>  
              <Infodiv
              texto={"Correo"}
              info={data.email}/>  
                <Infodiv
              texto={"Numero telefonico"}
              info={data.phone}/>   
                <Infodiv
              texto={"Direccion"}
              info={data.adress}/>   
                <Infodiv
              texto={"Pais"}
              info={data.city.country}/>
                <Infodiv
              texto={"Cuidad"}
              info={data.city.name}/>                                      
                 </div>
                


                <div className="grid-row-2" >
                <Infodiv
              texto={"Codigo Postal"}
              info={data.postalCode}/>  
                <Infodiv
              texto={"Codigo Cuidad"}
              info={data.city.code || ""}/>  
                <Infodiv
              texto={"Comisión del vendedor"}
              info={data.comissionSeller.toString()}/>  
                <Infodiv
              texto={"Persona"}
              info={data.tax.person}/>
              <Infodiv
              texto={"Regimen"}
              info={data.tax.regime}/>  
              <Infodiv
              texto={"Responsabilidad"}
              info={data.tax.responsibility}/>  
              <Infodiv
              texto={"Actividad"}
              info={data.activity.name}/>  
              <Infodiv
              texto={"Banco"}
              info={data.bank.name}/>  
                <Infodiv
              texto={"Tipo de cuenta"}
              info={data.bank.type}/>   
                <Infodiv
              texto={"No. Cuenta"}
              info={data.bank.account}/>   
                <Infodiv
              texto={"Precio de lista"}
              info={data.priceList.name}/>            
                </div>
                </div>            
                 {
                  data.observations!==''&& (
                <div className="container p-10" >
                <blockquote className="bg-gray-100 dark:bg-transparent p-5 rounded-2xl">
                  {data.observations}
                  
                </blockquote>
              </div>
                  )
                 }   
                 <Spacer y={5}/>
                 
        </Card>   
    </div> 
    
    <div
      className="grid grid-cols-1 lg:grid-cols-12  pt-5  gap-5"      
      >
    <Card className="col-span-9 lg:col-span-3 grid-row-1 ">      
    <ContactsAttachments download={data.attachments}
    
                  />
       </Card>
       <Card className="col-span-9 grid-row-2">
        <TabletContactsDetails table={data.contacts}
                  />
       </Card>
       </div>
    </div> 
   
           
    </>
  )
}

