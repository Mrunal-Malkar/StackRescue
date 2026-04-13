import { MessageType } from "@/type/types";

export const fetchMessages=async({standAloneUser,userId}:{standAloneUser?:string,userId?:string})=>{
    try {
        const response = await fetch(`/api/messages?userId=${standAloneUser?standAloneUser:userId}`,{
            headers:{
"Content-Type":"application/json",
            },
            body:JSON.stringify(standAloneUser?{standAloneUser}:{userId}),
            method:"GET",
        });
        if(response.status===404){
            return []; // if no meessages found return an empty arry
        }
        if(!response.ok){
            throw new Error("Failed to fetch messages");
        }
        const data=await response.json();
        return data as MessageType[]
    }catch (error){
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }}