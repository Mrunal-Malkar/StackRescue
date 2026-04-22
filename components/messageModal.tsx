import React, { useEffect, useState } from "react";
import { Send, Paperclip, ArrowLeft } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageType, UserType } from "@/type/types";
import { fetchUsers } from "@/app/functions/FetchUsers";
import { useSession } from "next-auth/react";
import { fetchMessages } from "@/app/functions/FetchMessages";
import Loader from "./ui/Loader";

//standAloneuserEmail is the email of the user whose profile we are visiting, if its not our own profile, then we will show the message model with only that user in the left side and his messages in the right side, and if its our own profile then we will show all the users in the left side and their messages in the right side

const MessageModel = ({
  onClose,
  isOpen,
  standAloneUserEmail,
}: {
  onClose: () => void;
  isOpen: boolean;
  standAloneUserEmail?: string;
}) => {
  const { status, data } = useSession();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  
  const {
    data: standAloneUser,
    isLoading: isLoadingStandAloneUser,
    error,
  } = useQuery<UserType | null>({
    queryKey: ["standAloneUser", standAloneUserEmail],
    queryFn: async () => {
      try {
        const res = await fetch(
          `/api/get/standaloneUserByEmail?email=${standAloneUserEmail}`,
          {
            method: "GET",
          },
        );
        if (res.status !== 200) {
         throw new Error("Failed to fetch user, status code: " + res.status);
        }
        const jsonData = await res.json();
        const data = {
          receiver: jsonData.data._id,
          receiverName: jsonData.data.name,
          receiverProfileImage: jsonData.data.profileImage,
        };
        setSelectedUser(data);
        return data as UserType;
      } catch (e) {
        throw new Error(
          "Failed to fetch user" +
            (e instanceof Error ? e.message : "error:" + e),
        );
      }
    },
    enabled: status === "authenticated" && !!standAloneUserEmail,
  });

  
  const [selectedUser, setSelectedUser] = useState<UserType | null>(standAloneUser??null);

  const { data: users, isLoading: isLoadingUsers } = useQuery<UserType[]>({
    queryKey: ["messageUsers"],
    queryFn: fetchUsers,
    enabled: status === "authenticated" && !standAloneUserEmail,
  });

  const { data: userMessages, isLoading: isLoadingMessages } = useQuery<
    MessageType[]
  >({
    queryKey: [
      "userMessages",
      selectedUser?.receiver || standAloneUser?.receiver,
    ], //    .receiver has the id of that user
    queryFn: async () => {
      if (!selectedUser?.receiver || !standAloneUser) {
        throw new Error("Invalid user selected");
      } else {
        const messages = await fetchMessages(
          selectedUser?.receiver || standAloneUser?.receiver,
        );
        return messages as MessageType[];
      }
    },
    enabled: status === "authenticated" && !!selectedUser,
  });

  const messages = userMessages ?? [];
  console.log("the users", users);

  if (!isOpen) return null;

  function sendMessage() {
    if (!message.trim()) return;

    const newMessage: MessageType = {
      message,
      sender: "me",
      createdAt: new Date(),
    };

    // Optimistic UI update
    queryClient.setQueryData<MessageType[]>(
      ["userMessages", selectedUser?.receiver || standAloneUser?.receiver],
      (old = []) => [...old, newMessage],
    );

    setMessage("");

    // TODO: send to backend here
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="w-full h-full md:w-[85%] md:h-[85%] bg-[#0f0f0f] md:rounded-2xl flex overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT: USERS */}
        <div
          className={`  
            ${selectedUser ? "hidden md:block" : "block"}
            w-full md:w-[25%] bg-[#121212] border-r border-gray-800 overflow-y-auto
          `}
        >
          <h2 className="text-white text-lg font-semibold p-4 border-b border-gray-800">
            Chats
          </h2>
             
             {/* handles the users info (lef side) when user clicks on his own profile messages icon */}
          {isLoadingUsers ? (
            <div className="p-4 text-white">Loading...</div>
          ) : users?.length == 0 && !standAloneUser ? (
            <div className="p-4 text-white">No Chats Found</div>
          ) : (
            users?.map((user) => (
              <div
                key={user.receiver}
                onClick={() => setSelectedUser(user)}
                className="flex items-center gap-3 p-4 hover:bg-gray-800 cursor-pointer transition"
              >
                <img
                  src={user.receiverProfileImage}
                  className="w-10 h-10 rounded-full"
                  alt="profile"
                />
                <p className="text-white text-sm truncate">
                  {user.receiverName}
                </p>
              </div>
            ))
          )}

          {/* handles the users info (lef side) when user clicks on other person's profile messages icon */}
          {isLoadingStandAloneUser?(
            <div className="p-4 text-white">Loading...</div>
          ):standAloneUser?(
 <div
                key={standAloneUser.receiver}
                onClick={() => setSelectedUser(standAloneUser)}
                className="flex items-center gap-3 p-4 hover:bg-gray-800 cursor-pointer transition"
              >
                <img
                  src={standAloneUser.receiverProfileImage}
                  className="w-10 h-10 rounded-full"
                  alt="profile"
                />
                <p className="text-white text-sm truncate">
                  {standAloneUser.receiverName}
                </p>
              </div>
          ):null}
        </div>

        {/* RIGHT: CHAT */}
        <div
          className={`
            ${!selectedUser ? "hidden md:flex" : "flex"}
            flex-col w-full md:w-[75%]
          `}
        >
          {/* HEADER */}
          <div className="p-4 border-b border-gray-800 text-white font-semibold flex items-center gap-3">
            <button
              onClick={() => setSelectedUser(null)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>

            {selectedUser && (
              <>
                <img
                  src={selectedUser.receiverProfileImage}
                  className="w-8 h-8 rounded-full"
                  alt=""
                />
                <span className="truncate">{selectedUser.receiverName}</span>
              </>
            )}
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* in case no users */}
            {users?.length == 0 && (
              <div className="text-wrap text-gray-200">
                Find people and chat with them, all your chats will appear here
              </div>
            )}

            {isLoadingMessages ? (
              <div className="w-full h-full flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
                    msg.sender === "me"
                      ? "ml-auto bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-200"
                  }`}
                >
                  {msg.message}
                </div>
              ))
            )}
          </div>

          {/* INPUT */}
          <div className="p-3 border-t border-gray-800 flex items-center gap-2">
            <label className="cursor-pointer text-gray-400 hover:text-white">
              <Paperclip size={20} />
              <input type="file" className="hidden" />
            </label>

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 bg-[#1a1a1a] text-white px-4 py-2 rounded-lg outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModel;
