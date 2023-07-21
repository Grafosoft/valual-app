import Head from 'next/head'
import styles from '../styles/Form.module.css';
import React ,{ FormEventHandler, useEffect, useState  }  from 'react';
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { TbEye,TbEyeOff } from 'react-icons/tb'
import { Spacer } from '@nextui-org/spacer';
import { Layout } from '../../layout/layout';
import { SocialFooter } from './../../layout/socialfooter';


export default function Login(){

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
      })
      const { replace } = useRouter()
      const { status } = useSession()
    
      useEffect(() => {
        status === 'authenticated' && replace('')
      }, [status])
    
      const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()
    
        await signIn('credentials', {
          email: userInfo.email,
          password: userInfo.password,
          redirect: false
        })
    
        status === 'authenticated' && replace('')
      }

    return (
        <Layout>
          
      
        <Head>
            <title>Login</title>
        </Head>
        
        
        
        
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-6xl font-bold py-4'>Valual</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Programa Adminstrativo</p>
            </div>

            
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                <div className={styles.input_group}>
                    <Input 
                    type="email"
                    placeholder='Correo electronico'
                   
                    size ="lg"
                    
                    />
                   
                </div>
                <div className={styles.input_group}>
                    <Input   
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

           
           
        </section>
       

        </Layout> 
    )
}