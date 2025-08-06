/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ClientLayout from "@/components/layouts/ClientLayout";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import socket from "@/utils/socket"; // Uncomment when integrating backend

const ClientMessages = () => {
  const [conversations] = useState([
    { id: "freelancer1", name: "John Doe", lastMessage: "I'll send the files soon." },
    { id: "freelancer2", name: "Jane Smith", lastMessage: "Can you review my proposal?" },
    { id: "freelancer3", name: "Mike Johnson", lastMessage: "Thanks for the payment!" },
  ]);
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSelectChat = (id: string) => {
    setSelectedChat(id);
    setMessages([]);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    setMessages((prev) => [...prev, { from: "me", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <ClientLayout>
      <div className="h-[calc(100vh-2rem)] flex gap-6">
        {/* Left - Conversations */}
        <div className="w-1/4 border-2 border-black shadow-[6px_6px_0px_lightblue] bg-white rounded-lg overflow-y-auto">
          <h2 className="text-lg font-bold border-b-2 border-black p-4">Conversations</h2>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => handleSelectChat(conv.id)}
              className={`p-4 cursor-pointer border-b border-gray-300 ${
                selectedChat === conv.id ? "bg-green-200" : "hover:bg-gray-100"
              }`}
            >
              <p className="font-semibold">{conv.name}</p>
              <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
            </div>
          ))}
        </div>

        {/* Right - Chat Area */}
        <div className="flex-1 border-2 border-black shadow-[6px_6px_0px_lightgreen] bg-white rounded-lg flex flex-col">
          {selectedChat ? (
            <>
              <div className="border-b-2 border-black p-4 font-bold">
                {conversations.find((c) => c.id === selectedChat)?.name}
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg max-w-xs ${
                      msg.from === "me" ? "bg-green-200 ml-auto" : "bg-blue-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-black p-3 flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button variant="brutal" onClick={handleSendMessage}>Send</Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientMessages;
