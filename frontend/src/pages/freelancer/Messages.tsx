/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FreelancerLayout from "@/components/layouts/FreelancerLayout";
import socket from "@/utils/socket";

const Messages = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [conversations, setConversations] = useState([
    // Later, replace with API call
    { id: "client1", name: "John Doe", lastMessage: "Hey, I need an update..." },
    { id: "client2", name: "Jane Smith", lastMessage: "Can you start tomorrow?" },
    { id: "client3", name: "Mike Johnson", lastMessage: "The design looks great!" },
  ]);

  const [messages, setMessages] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  // Connect to socket and listen for messages
  useEffect(() => {
    if (!user) return;

    socket.emit("join", user._id); // Join personal room

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [user]);

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId);
    setMessages([]); // Clear old messages (later, load history from DB)
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedChat) return;

    const msgData = {
      senderId: user._id,
      receiverId: selectedChat,
      text: newMessage,
    };

    socket.emit("sendMessage", msgData);
    setMessages((prev) => [...prev, { from: "me", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <FreelancerLayout>
      <div className="p-6 h-[calc(100vh-2rem)] flex gap-6">
        {/* Conversations List */}
        <div className="w-1/4 border-2 border-black shadow-[8px_8px_0_0_lightblue] bg-white rounded-lg overflow-y-auto">
          <h2 className="text-lg font-bold border-b-2 border-black p-4">
            Conversations
          </h2>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => handleSelectChat(conv.id)}
              className={`p-4 cursor-pointer border-b border-gray-300 ${
                selectedChat === conv.id ? "bg-lightgreen" : "hover:bg-gray-100"
              }`}
            >
              <p className="font-semibold">{conv.name}</p>
              <p className="text-sm text-gray-600 truncate">
                {conv.lastMessage}
              </p>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 border-2 border-black shadow-[8px_8px_0_0_lightgreen] bg-white rounded-lg flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="border-b-2 border-black p-4 font-bold">
                {conversations.find((c) => c.id === selectedChat)?.name}
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg max-w-xs ${
                      msg.from === "me"
                        ? "bg-lightgreen ml-auto"
                        : "bg-blue-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t-2 border-black p-3 flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button variant="brutal" onClick={handleSendMessage}>
                  Send
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </FreelancerLayout>
  );
};

export default Messages;
