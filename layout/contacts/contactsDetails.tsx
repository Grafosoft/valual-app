import React, { FC } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Spacer,
  Avatar,
  Switch,
  Button,
  Link,
} from '@nextui-org/react'
import { MdOutlineInventory2 } from 'react-icons/md'
import { TbCheck,TbX ,TbBellFilled ,TbEdit,TbList,TbArrowBackUp,TbWorld } from 'react-icons/tb'
import { AiOutlineFacebook,AiOutlineInstagram,AiOutlineLinkedin,AiOutlineWhatsApp } from 'react-icons/ai'
import { ContactsDetailsList } from '../../interfaces/contacts/contactsDetailsList'
import { TabletContactsDetails } from './tabletContactsDetails'
import { Infodiv } from '../../components/texto/div'




interface Props {
  data: ContactsDetailsList
}

export const ContactsDetails: FC<Props> = ({ data }) => {
  return (
    <>
    <div
      className=" p-5 gap-5 "     
    >
      <Card  style={{justifyContent:'center' , height:'70px'}}>
    
        <div style={{justifyContent:' space-between', display:'flex'}}>
          <div >
      <Button variant="light"  className='ml-10 mr-3' color="primary" size="md" startContent={<
        TbEdit/>}>
        Editar
      </Button>
      
      <Button variant="light" className="mx-3" color="primary" size="md" startContent={<
        TbList/>}>
        Ver movimientos
      </Button>    
     
      <Button variant="light" className="mx-3" color="primary" size="md"  startContent={<
        MdOutlineInventory2/>}>
     Inventario
      </Button> </div>
      
      <Button variant="flat" className="mx-10" color="warning" size="md" startContent={<
        TbArrowBackUp/>}>
        Volver
      </Button>
      </div>
      </Card>
      <Spacer y={5} />


      <div
      className="grid grid-cols-12 row-span-9  gap-5"
      style={{ justifyContent: 'center'}}
    >
        <Card className="col-span-3 ">
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
               <Spacer y={5} />

               <div>
                 <Link target="_blank" href={data.media.website} >               
                <TbWorld
                 size={25}
                 className="cursor-pointer mx-3"
                 color="#52525B"
                /><p className="text-black-400" style={{textDecoration:'none', color:'black'}} >Website</p>
                </Link>
               </div>
              <div>
                 <Link target="_blank" href={data.media.facebook} >
                 <AiOutlineFacebook
                 size={25}
                 className="cursor-pointer mx-3"
                 color="#006FEE"    
                /><p className="text-black-400" style={{textDecoration:'none', color:'black'}} >Facebook</p>
                </Link>
              </div>
              {}
               <div>
                 <Link target="_blank" href={data.media.instagram} >
                <AiOutlineInstagram
                size={25}
                className="cursor-pointer mx-3"
                color="#f31260"
                /><p className="text-black-400" style={{textDecoration:'none', color:'black'}} >Instagram</p>
                </Link>
               </div>       
               <div>
                  <Link target="_blank" href={data.media.linkedin} >
                <AiOutlineLinkedin
                 size={25}
                 className="cursor-pointer mx-3"
                 color="#006FEE"          
              /><p className="text-black-400" style={{textDecoration:'none', color:'black'}} >Linkedin</p></Link>
                </div>
               <div>
                <Link target="_blank" href={data.communication.whatsapp} >
                <AiOutlineWhatsApp
                size={25}
                className="cursor-pointer mx-3"
                color="#17C964"
               /><p className="text-black-400" style={{textDecoration:'none', color:'black'}} >Whatsapp</p>
              </Link> 
                </div>        
          </CardBody>
        </Card>


        <Card className="col-span-9 ">
          <div className="text-center py-10 " >
             <h1 className="text-5xl font-bold  ">{data.commercialName}</h1>
             <h3 className="text-2xl font-medium  pt-5">{data.type}</h3>               
               </div> 
              <div  className="grid grid-cols-2  px-5 gap-5 " > 
              <div className="grid-row-1"  >    
              <div className="grid grid-cols-4 gap-3 " >
               <h3 className="text-gray-400 text-right">Nombre comercial</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4" > {data.commercialName}</h3>
               </div> 
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Tipo de Identifiacion</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4"> {data.identificationType.name}</h3>
               </div> 
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Identificacion</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4"> {data.identification}</h3>
               </div>        
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Primer Nombre</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4" > {data.firstName}</h3>
               </div>
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Segundo Nombre</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4" > {data.middleName}</h3>
               </div>
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Primer Apellido</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4"> {data.firstSurname}</h3>
               </div>
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Segundo Apellido</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4"> {data.secondSurname}</h3>
               </div>             
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Correo</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4 "> {data.email}</h3>
               </div>                         
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Numero telefonico</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4 ">  {data.phone}</h3>
               </div>   
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Direccion</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4 "> {data.adress}</h3>
               </div>   
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Pais</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4 "> {data.city.country}</h3>
               </div>
               <div className="grid grid-cols-4 gap-3" >               
               <h3 className="text-gray-400 text-right">Cuidad</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4 "> {data.city.name}</h3>
               </div>                                   
                 </div>
                


                <div className="grid-row-2" style={{marginLeft:'90px'}}>
                <Infodiv
              texto={"Codigo Postal"}
              info={(data.postalCode)}
              />  
                <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Codigo Postal</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4 "> {data.postalCode}</h3>
               </div>
               <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Codigo Cuidad</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4 "> {data.city.code}</h3>
               </div>                 
                <div className="grid grid-cols-4 gap-3" >
               <h3 className="text-gray-400 text-right">Comisión del vendedor</h3>
                <h3 className="font-medium text-left col-start-2 col-end-4 "> {data.comissionSeller}</h3>
               </div> 
                <div className="grid grid-cols-4 gap-3" >
                  <p className="text-gray-400 text-right">Persona</p>
                    <p className="font-medium text-left col-start-2 col-end-4 " >
                  {data.tax.person}
                </p></div> 
                <div className="grid grid-cols-4 gap-3" >
                  <p className="text-gray-400 text-right">Regimen</p>
                    <p className="font-medium text-left col-start-2 col-end-4 " >
                  {data.tax.regime}
                </p></div> 
                <div className="grid grid-cols-4 gap-3" >
                  <p className="text-gray-400 text-right">Responsabilidad</p>
                    <p className="font-medium text-left col-start-2 col-end-4 " >
                  {data.tax.responsibility}
                </p></div> 
                <div className="grid grid-cols-4 gap-3" >
                  <p className="text-gray-400 text-right">Actividad</p>
                    <p className="font-medium text-left col-start-2 col-end-4 " >
                  {data.activity.name}
                </p></div> 
                <div className="grid grid-cols-4 gap-3" >
                  <p className="text-gray-400 text-right">Banco</p>
                    <p className="font-medium text-left col-start-2 col-end-4 " >
                  {data.bank.name}
                </p></div> 
                <div className="grid grid-cols-4 gap-3" >
                  <p className="text-gray-400 text-right">Tipo de cuenta</p>
                    <p className="font-medium text-left col-start-2 col-end-4 " >
                  {data.bank.type}
                </p></div> 
                <div className="grid grid-cols-4 gap-3" >
                  <p className="text-gray-400 text-right">No. Cuenta</p>
                    <p className="font-medium text-left col-start-2 col-end-4 " >
                  {data.bank.account}
                </p></div> 
                <div className="grid grid-cols-4 gap-3" >
                  <p className="text-gray-400 text-right"> Precio de lista</p>
                    <p className="font-medium text-left col-start-2 col-end-4 " >
                  {data.priceList.name}
                </p></div>            
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
        </Card>   
    </div> 
    </div> 
   

    <div
      className="grid grid-cols-12 row-span-9 p-5  gap-10"      
      >
    <div className="col-span-3 ">      
       </div>
       <div className="col-span-9 ">
        <TabletContactsDetails table={data.contacts}
                  />
       </div></div>
    </>
  )
}

