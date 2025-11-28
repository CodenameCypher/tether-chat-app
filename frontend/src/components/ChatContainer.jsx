import { useChatStore } from "../store/useChatStore.js";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import { MessageSquareText } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { timeAgo } from "../lib/utils.js";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages)
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messageEndRef = useRef(null);

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <div className="flex items-center justify-center h-screen">
          <MessageSquareText
            strokeWidth={0.5}
            color="#11005f"
            className="size-50 animate-ping"
          />
        </div>

        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`chat ${
              m.senderID === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    m.senderID === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              {m.senderID === authUser._id
                ? authUser.fullName
                : selectedUser.fullName}
              <time className="text-xs opacity-50">
                {timeAgo.format(new Date(m.createdAt), "round-minute")}
              </time>
            </div>

            <div
              className={`chat-bubble ${
                authUser._id === m.senderID ? "chat-bubble-neutral" : ""
              } flex`}
            >
              {m.image && (
                <img
                  src={m.image}
                  className="sm: max-w-[200px] rounded-md mb-2"
                />
              )}
              {m.text && <p>{m.text}</p>}
            </div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
