import React ,{ ChangeEvent, FormEventHandler, useEffect, useState  }  from 'react';
import Head from 'next/head'
import { Card, CardBody, Image,Spacer , Button , Input} from '@nextui-org/react';
import { Layout } from '../../layout/layout';
import { signIn, useSession } from "next-auth/react"
import styles from '../styles/Form.module.css';
import { useRouter } from 'next/router';
import { TbEye,TbEyeOff } from 'react-icons/tb'
import second from '../../public/assets/Valualfon.png'


export default function index(){

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
      })
      const { replace } = useRouter()
      const { status } = useSession()
    
      useEffect(() => {
        status === 'authenticated' && replace('/ind')
      }, [status])
    
      const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()
    
        await signIn('credentials', {
          email: userInfo.email,
          password: userInfo.password,
          redirect: false
        })
    
        status === 'authenticated' && replace('/ind')
      }

    return (
        
          <>
      
        <Head>
            <title>Valual App</title>
          
        </Head>
        
        
        <Layout>
        
        <section className=' mx-auto flex flex-col gap-10'>
        
          
              <Card isHoverable className="text-center py-10  "> 
              <Image src={second.src}
               width={400}
               className="text-center py-5  "
            />
         
                <p className='mx-auto text-gray-400'>Programa Adminstrativo</p>
                
              
              
            
              
         
       
           
            <CardBody>
            
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                <div className={styles.input_group}>
                    <Input 
                    type="email"
                    value={userInfo.email}
                    placeholder='Correo electronico'
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                    }  
                    size ="lg"
                    />
                     <Spacer y={1} />
                </div>
                <div className={styles.input_group}>
                    <Input  
                    value={userInfo.password}
                     onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                      
                   } 
                  
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
                </div>
                <Spacer y={1} />

                {/* login buttons */}
                <div className="input-button">
                    <Button type='submit' 
                  style={{ width: '100%' }} size ="lg"  color="primary">
                        Iniciar sesion
                    </Button>
                    
                </div>
                
                
              
            </form>
            </CardBody>
            </Card>
          

           
           
        </section>
       

        </Layout> 
        </>
        
    )
}