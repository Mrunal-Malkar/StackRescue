import { UserType } from "@/type/types";

export async function fetchUsers():Promise<UserType[]>{
  try{
    const res = await fetch("/api/get/messageusers", {
       method: "GET",
     });
   
     const jsonData = await res.json();
   console.log("the res",jsonData)
      if (res.status === 404) {
       return []; // if no users found return an empty arry
     }
     if (!res.ok ) {
       throw new Error(jsonData.message || "Failed to fetch stacks");
     }
     console.log("the res",jsonData);
     return jsonData.data as UserType[]
  }catch(e){
    console.log("the error",e)
  throw new Error("Failed to fetch users"+(e instanceof Error ? e : "unknown error"));
  }
}