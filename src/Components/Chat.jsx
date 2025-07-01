import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../Utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import Base_Url from "../Constant";

const Chat = () => {
  const { target_id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typer_name, setTyper_name] = useState(null);
  const [target_data,SetTarget_data] = useState({});
  const user = useSelector((store) => store.user);

  const userId = user?._id;
  const userName = user?.name;
  const lastMessageRef = useRef(null);
  const socketRef = useRef(null);
  useEffect(() => {
    const fetchTargetData = async () => {
      try {
       
        const target_fetch_data = await axios.get(`${Base_Url}/profile/${target_id}`,{withCredentials:true});
        console.log(target_fetch_data);
        SetTarget_data(target_fetch_data?.data);
      } catch (err) {
        console.error("Failed to fetch target data:", err);
      }
    };
    fetchTargetData();
  }, [target_id]);
  // Auto scroll to bottom on messages update
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch old messages
  const fetchPrevData = async (roomKey) => {
    try {
      const res = await axios.get(`${Base_Url}/chat/${roomKey}`, {
        withCredentials: true,
      });
      const apiData = res.data;
      if (apiData?.message === "Chat not found") {
        setMessages([]);
      } else {
        setMessages(apiData.allMessages);
      }
    } catch (err) {
      console.error("Failed to fetch previous messages:", err);
    }
  };

  // Fetch on load
  useEffect(() => {
    if (!userId || !target_id) return;
    const roomKey = [userId, target_id].sort().join("_");
    fetchPrevData(roomKey);
  }, [userId, target_id]);

  // Setup socket
  useEffect(() => {
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinchat", { userId, target_id });

    socket.on("messagerecived", (msg) => {
      setMessages((prev) => [...prev, msg?.data]);
    });
    socket.on("isTyping", ({ typerName }) => {
      if (typerName !== user?.name) {
        setTyper_name(typerName);
        setTimeout(() => {
          setTyper_name(null);
        }, 2000);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, target_id]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      senderId: userId,
      receiverId: target_id,
      text: message,
      timestamp: new Date().toISOString(),
    };

    // Send only via socket — no need to push to messages manually
    socketRef.current.emit("sendmessage", newMessage);
    setMessage("");
  };

return (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-100 px-4">
    <div className="w-190 h-130 rounded-2xl shadow-2xl bg-white border border-amber-200 flex flex-col overflow-hidden">
      
      {/* Header (Fixed) */}
      <div className="bg-amber-300 p-4 text-lg font-bold text-center text-white relative">
        Chat with <span className="text-amber-900">{target_data?.name || "Connecting..."}</span>
        <div className="h-5 mt-1">
          <span
            className={`text-sm italic text-amber-800 transition-opacity duration-300 ease-in-out ${
              typer_name ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            {typer_name} is typing...
          </span>
        </div>
      </div>

      {/* Scrollable Message Area (Fixed height) */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3 scroll-smooth scrollbar-thin scrollbar-thumb-amber-200 bg-white">
        {messages.length === 0 ? (
          <div className="text-center text-sm text-gray-500">No messages yet.</div>
        ) : (
          <>
            {messages.map((msg, index) => {
              const from = msg?.senderId;
              const text = msg?.text;
              const timestamp = msg?.timestamp || msg?.createdAt;
              const isOwnMessage = from === userId;

              return (
                <div key={index} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`px-4 py-2 rounded-xl max-w-[75%] text-sm shadow ${
                      isOwnMessage ? "bg-amber-400 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="text-xs font-semibold mb-1 text-amber-900">
                      {isOwnMessage ? "You" : target_data?.name}
                    </div>
                    <div>{text}</div>
                    <div className="text-[10px] text-right mt-1 text-amber-800 opacity-60">
                      {new Date(timestamp).toLocaleString([], {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={lastMessageRef} />
          </>
        )}
      </div>

      {/* Input Box (Fixed) */}
      <div className="p-3 bg-white border-t flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => {setMessage(e.target.value);
            const roomId = [userId, target_id].sort().join("_");
            socketRef.current.emit("typing",{roomId,userName});
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full border border-amber-300 outline-none text-sm bg-white shadow-sm focus:ring-2 focus:ring-amber-200"
        />
        <button
          onClick={sendMessage}
          className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full text-sm font-medium transition"
        >
          Send
        </button>
      </div>
    </div>
  </div>
);


};

export default Chat;
