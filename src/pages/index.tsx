import React ,{ ChangeEvent, FormEventHandler, useEffect, useState  }  from 'react';
import Head from 'next/head'
import { Card, CardBody,Spacer , Button , Input, CardHeader, CardFooter} from '@nextui-org/react';
import { Layout } from '../../layout/layout';
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { TbEye,TbEyeOff } from 'react-icons/tb'


export default function index(){
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
      })

    const [isVisible, setIsVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const { replace } = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        status === 'authenticated' && replace(`/catalogo?apikey=${session.user.apikey}&companyId=${session.user.companyId} `)
    }, [replace , status])


     const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()
        setIsLoading (true)

        await signIn('credentials', {
          email: userInfo.email,
          password: userInfo.password,
          redirect: false
        })

        if(status === 'authenticated'){
          setIsLoading(false) 
          replace(`/catalogo?apikey=${session.user.apikey}&companyId=${session.user.companyId} `)   
          } else {
          setIsLoading(false)
          }
        }
    
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (     
          <>
        <Head>
            <title>Valual App</title>    
        </Head>
      
        <Layout>  
        <Card style={{ padding: '50px 20px' }}>
          <CardHeader className="flex flex-col justify-center">
          <h1 className="text-7xl font-bold" >Valual</h1>
            <Spacer y={5} />
            <h3 className="text-2xl text-gray-500 font-bold">Programa Adminstrativo</h3>
            <Spacer y={3} />
           </CardHeader>
            
            <form onSubmit={handleSubmit}>
                <CardBody>
                    <Input 
                    value={userInfo.email}
                    placeholder='Correo electronico'
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                    }  
                    size ="lg"
                    />
                    <Spacer y={5} />
               
                    <Input  
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUserInfo({ ...userInfo, password: e.target.value })   
                    } 
                    value={userInfo.password}
                    placeholder='Contraseña'           
                    size ="lg"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                          {isVisible ? (
                            <TbEye className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <TbEyeOff className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                        }
                        type={isVisible ? "text" : "password"}
                    /> 
               </CardBody>
                <Spacer y={3} />

                <CardFooter>
                <Button
                size={'lg'}
                className="text-white"
                type="submit"
                style={{ width: '100%' }}
                color="primary"
                isLoading={isLoading}
              >
                Iniciar sesión
                    </Button>
                </CardFooter>
              </form>
            </Card>
        </Layout> 
        </>
        
    )
}