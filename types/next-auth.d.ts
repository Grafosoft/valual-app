import { Account, DefaultSession } from "next-auth"

declare module "next-auth" {
  

  interface Session {
    
    accessToken?: Account.accessToken
    user: {
        
        id?:string
        name?:string
        email?:string
        apikey?:string

    } & DefaultSession["user"]
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: Account.accessToken
  }
}