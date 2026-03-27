import connectDB from "@/lib/connectDB";
import User from "@/lib/schemaUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
        try{
            await connectDB();
        const user=await User.create({
            name:"Mrunal pramod malkar",
            email:"lol@testinggmail.com"
        })
   return NextResponse.json({User:user})
    }catch(e){
        return NextResponse.json({error:e})
    }
}