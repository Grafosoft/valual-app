import Head from 'next/head'
import styles from '../styles/Form.module.css';
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { FormEventHandler, useEffect, useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react"
import React from "react";
import { Layout } from './../../layout/layout';
import { useRouter } from 'next/router';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';


export default function Login(){

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
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                <div className={styles.input_group}>
                    <Input 
                    type="email"
                    placeholder='Email'
                    className={styles.input_text}
                    />
                   
                </div>
                <div className={styles.input_group}>
                    <Input 
                    type={"password"}
                    placeholder='password'
                    className={styles.input_text}
                    />
                
                </div>

                {/* login buttons */}
                <div className="input-button">
                    <Button type='submit' className={styles.button}>
                        Login
                    </Button>
                </div>
                
              
            </form>

           
           
        </section>

        </Layout>
    )
}