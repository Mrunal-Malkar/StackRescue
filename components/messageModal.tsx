import React, { useState } from "react";
import { Send, Paperclip, ArrowLeft } from "lucide-react";

const MessageModel = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hey there!", sender: "other" },
    { text: "Hello 👋", sender: "me" },
  ]);

  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    {
      id: 1,
      name: "Alexander The Great",
      img: "https://i.pravatar.cc/40?img=1",
    },
    { id: 2, name: "John Doe", img: "https://i.pravatar.cc/40?img=2" },
    {
      id: 3,
      name: "A Very Long Username That Should Trim",
      img: "https://i.pravatar.cc/40?img=3",
    },
  ];

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { text: message, sender: "me" }]);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="w-full h-full md:w-[85%] md:h-[85%] bg-[#0f0f0f] rounded-none md:rounded-2xl flex overflow-hidden shadow-2xl"
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

          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="flex items-center gap-3 p-4 hover:bg-gray-800 cursor-pointer transition w-full"
            >
              <img
                src={user.img}
                className="w-10 h-10 rounded-full"
                alt="profileImage"
              />
              <p className="text-white text-sm truncate w-full">{user.name}</p>
            </div>
          ))}
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
            {/* Back button (mobile only) */}
            <button
              onClick={() => setSelectedUser(null)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>

            {selectedUser && (
              <>
                <img
                  src={selectedUser.img}
                  className="w-8 h-8 rounded-full"
                  alt=""
                />
                <span className="truncate">{selectedUser.name}</span>
              </>
            )}
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
                  msg.sender === "me"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-3 border-t border-gray-800 flex items-center gap-2">
            {/* File Upload */}
            <label className="cursor-pointer text-gray-400 hover:text-white">
              <Paperclip size={20} />
              <input type="file" className="hidden" />
            </label>

            {/* Input */}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 bg-[#1a1a1a] text-white px-4 py-2 rounded-lg outline-none"
            />

            {/* Send Button */}
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
