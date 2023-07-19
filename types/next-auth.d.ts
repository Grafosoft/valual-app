import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  

  interface Session {
    
    accessToken?: Account.accessToken
    user: {
        
        id?:string
        name?:string
        email?:string

    } & DefaultSession["user"]
  }
}