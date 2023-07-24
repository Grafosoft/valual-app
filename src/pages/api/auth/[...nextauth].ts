import NextAuth ,{NextAuthOptions} from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import valualApi from '@/apis/valualApi'
import { UserSession } from '@/interfaces/login/userSession'


let sessionInfo: UserSession

export const authOptions: NextAuthOptions = {

  session: {
    strategy: 'jwt',
    maxAge: 86400
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
   
    
    CredentialsProvider ({
        type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const base64String = Buffer.from(
          `${email}:${password}`,
          'binary'
        ).toString('base64')

        const res = await valualApi.get<UserSession>(
          `users/oauth?accesstoken=${base64String}`
        )

        sessionInfo = {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          apikey: res.data.apikey,
          image: res.data.image,
          
        }

        if (res) {
          return sessionInfo
        } else {
          throw Error('invalid')
        }
      }
    })
  ],
  pages: {
    signIn: '/',
    error: '/404'
  },

  callbacks:{
    async jwt ({ token,account,user}){
        if(account){
            token.accessToken= account.access_token;

           
        if (account.type === 'credentials') {
          token.user = user
        }
    }
    return token;


  },

  async session({session,token,user}){

    session.user.id = user?.id
    session.user.apikey = sessionInfo?.apikey
    session.accessToken =token.accessToken;
    return session;
  }

}}

export default NextAuth(authOptions)