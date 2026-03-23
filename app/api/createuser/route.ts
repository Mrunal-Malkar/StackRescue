import connectDB from "@/lib/connectDB";
import User from "@/lib/schemaUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
        try{
            console.log("trying to create new user");
            await connectDB();
        const user=await User.create({
            name:"Mrunal pramod malkar",
            email:"lol@testinggmail.com"
        })
   return NextResponse.json({User:user})
    }catch(e){
        console.log("unable to create new user")
        return NextResponse.json({error:e})
    }
}