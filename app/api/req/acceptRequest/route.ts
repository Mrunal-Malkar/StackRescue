import { authProvider } from "@/lib/auth";
import User from "@/lib/schemaUser";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
          const session = await getServerSession(authProvider);
        
            if (!session) {
              return NextResponse.json(
                { message: "Unauthorized request" },
                { status: 401 }
              );
            }
        
        const userId=session.user.id;

        const updateUser=await User
    }catch(e){}
}