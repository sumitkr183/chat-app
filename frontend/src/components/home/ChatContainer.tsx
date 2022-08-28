/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ContactChatHeader from "./contacts/ContactChatHeader";
import { ChatState } from "../../Context/ChatProvider";
import { FETCH_ROOM_CHAT, SEND_MESSAGE } from "../../ApiEndpoints";
import { postRequest } from "../../AxiosRequest";
import SendMessage from "./contacts/SendMessage";
import ChatList from "./contacts/ChatList";
import { MessageInterface } from "../../GlobalInterFaces";
import TypeAnimation from "./contacts/TypeAnimation";
import DefaultChatPage from "./DefaultChatPage";

let debounceTimer;
const ChatContainer = ({ socket }) => {
  const { user, selectedChat, setOnlineUsers } = ChatState();

  const [loader, setLoader] = useState(false);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const handleInputChange = (e: React.FormEvent<EventTarget>) => {
    const { value } = e.target as HTMLInputElement;
    setInputMessage(value);

    socket.emit("typing", selectedChat?._id);

    // stop typing if user don't type for 5 sec
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      socket.emit("stop typing", selectedChat?._id);
    }, 5000);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("stop typing", selectedChat?._id);
    postRequest(SEND_MESSAGE, {
      chatId: selectedChat?._id,
      content: inputMessage,
      authId: user?._id,
    })
      .then((response: any) => {
        setMessages([...messages, response.data]);

        socket.emit("new message", response.data);
      })
      .catch((error) => console.log("Error: ", error.message))
      .finally(() => {
        setInputMessage("");
      });
  };

  useEffect(() => {
    socket.emit("user connect", user);

    socket.on("user connected", (id: []) => {
      setOnlineUsers(id);
    });

    socket.on("user disconnected", (id: []) => {
      setOnlineUsers(id);
    });

    socket.on("typing", () => setTyping(true));
    socket.on("stop typing", () => setTyping(false));
  }, []);

  useEffect(() => {
    socket.on("message received", (received: MessageInterface) => {
      setMessages([...messages, received]);
    });
  });

  const fetchChatMessages = () => {
    setLoader(true);
    postRequest(`${FETCH_ROOM_CHAT}/${selectedChat?._id}`, {
      authId: user?._id,
    })
      .then((response: any) => setMessages(response.data))
      .catch((error) => console.log("Error: ", error.message))
      .finally(() => {
        setLoader(false);
        socket.emit("join chat", selectedChat?._id);
      });
  };

  useEffect(() => {
    if (Object.keys(selectedChat).length > 0) {
      fetchChatMessages();
    }
  }, [selectedChat]);

  return (
    <>
      {Object.keys(selectedChat).length > 0 ? (
        <div
          className="user-chat w-100 overflow-hidden"
          style={{ position: "relative" }}
        >
          {loader && (
            <div className="overlay-loader">
              <div className="spinner-grow text-primary" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          )}
          <div className="d-lg-flex">
            {/* start chat conversation section */}
            <div className="w-100 overflow-hidden position-relative">
              {Object.keys(selectedChat).length !== 0 ? (
                <ContactChatHeader sender={selectedChat} />
              ) : null}

              <div
                className="chat-conversation p-3 p-lg-4"
                data-simplebar="init"
              >
                <ul className="list-unstyled mb-0">
                  <ChatList messages={messages} />
                  {typing && <TypeAnimation />}
                </ul>
              </div>
              {/* end chat conversation end */}
              {/* start chat input section */}
              <SendMessage
                inputMessage={inputMessage}
                handleInputChange={handleInputChange}
                handleSendMessage={handleSendMessage}
              />
              {/* end chat input section */}
            </div>
            {/* end chat conversation section */}
          </div>
        </div>
      ) : (
        <DefaultChatPage />
      )}
    </>
  );
};

export default ChatContainer;
