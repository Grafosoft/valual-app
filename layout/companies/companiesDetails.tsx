import React ,{ FC } from "react"
import { CompaniesDetailsList } from "../../interfaces/companies/companiesDetailsList"
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react"
import { TbBuilding } from "react-icons/tb"

interface Props {
    data: CompaniesDetailsList
  }
  
  export const ContactsDetails: FC<Props> = ({ data }) => {
    return (
      <>
       <div
      className=" p-5 gap-5 "     
    >
        <Card >
          <CardHeader style={{ padding: '0' }}>
            <div
              className=" p-5 container"
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
              fallback={<TbBuilding className=" w-12 h-12 "  />}
              style={{
                borderRadius: '40px',
                width: '100px',
                height: '100px',
              }}        
            />
            </div>  
            </CardHeader> 
            <CardBody>
            <div className="text-center " >
             <h1 className="text-5xl font-bold  ">{data.name}</h1>
             <h3 className="text-2xl font-medium  pt-5">{data.identification}</h3>  
             </div>

            </CardBody>
            </Card> </div>
            <div
      className="grid grid-cols-12 px-5  gap-5">

<Card className="col-span-6 "><CardBody></CardBody></Card>
<Card className="col-span-6 "><CardBody></CardBody></Card>
      </div>
            
           
      </>
    )}