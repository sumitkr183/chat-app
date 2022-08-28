import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [redirect, setRedirect] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("userDetails") !== null) {
      setUser(JSON.parse(localStorage.getItem("userDetails")));
    } else {
      navigate(redirect);
    }
  }, [redirect, navigate]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        setRedirect,
        onlineUsers,
        setOnlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
