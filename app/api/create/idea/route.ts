import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const formData = await req.formData();
        if(!formData){
            return NextResponse.json({message:"Unable to parse form data"},{status:400});
        }
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const image = formData.get("image") as File;
        const categories = JSON.parse(formData.get("categories") as string) as string[];
        const roles = JSON.parse(formData.get("roles") as string) as string[];
        return NextResponse.json({message:"Idea created successfully", title, description, imageName: image?.name, categories, roles},{status:200});

    }catch(error:unknown){
        if(!(error instanceof Error)){NextResponse.json({message:"an unknown error occured"},{status:500})};
        console.error(error);
        return NextResponse.json({message:"Some error occurred", error: (error as Error).message},{status:500});
    }
}