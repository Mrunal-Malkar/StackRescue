import connectDB from "@/lib/connectDB";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions={
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID??"",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET??"", 
    authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }  
    })
    ],

    callbacks:{
        jwt({token,account,user}){
            if(user){
                token.id=getUserId(user.email)
            }
            return token
        },
    }


}

async function getUserId(email:string){
    connectDB();
    const User=
}

export default NextAuth(authOptions)