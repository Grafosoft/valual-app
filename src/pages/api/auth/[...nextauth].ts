import NextAuth ,{NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials'

declare module 'next-auth' {
    interface Sessions {
      accessToken?: string;
    }
  

};



export const authOptions: NextAuthOptions = {
    
  // Configure one or more authentication providers
  providers: [
   
    
    Credentials ({
        name:'Custom login',
        credentials:{
            email:{label:'Correo' , type:'email' , placeholder:'correo@google.com'},
            password:{label:'Contraseña' , type:'password' , placeholder:'contraseña'},

        },
        async authorize (credentials){
            console.log({credentials})
            //return null;

           const user= { id:'1' , name:'jhoan' ,email:'jhoan@google.com' , role:'admin'}
            


           if (user) {
            return user
          } else {
   
            return null;
          }
        },
    })
  ],
  pages: {
    signIn: '/',
    error: '/404',
  
  },


  callbacks:{
    async jwt ({ token,account,user}){
        if(account){
            token.accessToken= account.access_token;

            switch(account.type){
            case 'oauth':
                break;
                case 'credentials':
                    token.user=user;
                    break;
        }
    }
    return token;


  },

  async session({session,token,user}){
    session.accessToken =token.accessToken as any;
    session.user= token.user as any;
    return session;
  }

}}

export default NextAuth(authOptions)