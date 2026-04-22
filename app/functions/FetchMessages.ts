import { MessageType } from "@/type/types";

export const fetchMessages = async (userId:string) => {
  try {
    if(!userId){
      return null;
    }
    const response = await fetch(
      `/api/messages?userId=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        }
      },
    );
    console.log("the response ", response);
    if (response.status === 404) {
      return []; // if no meessages found return an empty arry
    }
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    const data = await response.json();
    console.log("the response data", data);
    return data as MessageType[];
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};
