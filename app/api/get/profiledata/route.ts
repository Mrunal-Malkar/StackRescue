import { authProvider } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import User from "@/lib/schemaUser";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
   try{ const session=await getServerSession(authProvider);

    if(!session){
        return NextResponse.json({status:401,message:"forbidden,unauthorised requests"})
    }

    const userId=session.user.id;
    await connectDB();
    const userData=await User.findOne({_id:userId}).select(["tools","about","numbers"]);
    if(!userData){
        return NextResponse.json({status:404,message:"no profile data found!"})
    }
    
    return NextResponse.json(userData)
}catch(e){
    return NextResponse.json({status:500,error:e})
}
}