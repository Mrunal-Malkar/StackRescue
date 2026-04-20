import React, { useState } from "react";
import { Send, Paperclip, ArrowLeft } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageType, UserType } from "@/type/types";
import { fetchUsers } from "@/app/functions/FetchUsers";
import { useSession } from "next-auth/react";
import { fetchMessages } from "@/app/functions/FetchMessages";
import Loader from "./ui/Loader";

const MessageModel = ({
  onClose,
  isOpen,
  standAloneUser,
}: {
  onClose: () => void;
  isOpen: boolean;
  standAloneUser?: UserType;
}) => {
  const { status, data } = useSession();
  const queryClient = useQueryClient();

  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserType | null>(
    standAloneUser || null
  );

  const { data: users, isLoading: isLoadingUsers } = useQuery<UserType[]>({
    queryKey: ["messageUsers"],
    queryFn: fetchUsers,
    enabled: status === "authenticated",
  });

  const currentReceiverId =
    selectedUser?.receiver || standAloneUser?.receiver || data?.user.id;

  const {
    data: userMessages,
    isLoading: isLoadingMessages,
  } = useQuery<MessageType[]>({
    queryKey: ["userMessages", currentReceiverId],
    queryFn: () => fetchMessages(currentReceiverId),
    enabled: status === "authenticated" && !!currentReceiverId,
  });

  const messages = userMessages ?? [];

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
      ["userMessages", currentReceiverId],
      (old = []) => [...old, newMessage]
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

          {isLoadingUsers ? (
            <div className="p-4 text-white">Loading...</div>
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
                <span className="truncate">
                  {selectedUser.receiverName}
                </span>
              </>
            )}
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
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