/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect } from "react";
import { FETCH_ALL_CHATS } from "../../../ApiEndpoints";
import { postRequest } from "../../../AxiosRequest";
import { ChatState } from "../../../Context/ChatProvider";
import {
  checkLastMessageSender,
  getSenderId,
  getSenderImage,
  getSenderName,
} from "../../../global";
import { ChatInterface } from "../../../GlobalInterFaces";

const ContactCard = () => {
  const { user, chats, setChats, setSelectedChat, selectedChat, onlineUsers } =
    ChatState();

  console.log(onlineUsers, "users online");

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      postRequest(FETCH_ALL_CHATS, { authId: user?._id })
        .then((response: any) => setChats(response.data))
        .catch((error) => console.log("Error: ", error.message));
    }
  }, [user]);

  return (
    <>
      {chats.length > 0
        ? chats.map((chat: ChatInterface, index: number) => (
            <li key={index}>
              <a
                onClick={() => setSelectedChat(chat)}
                style={{ cursor: "pointer" }}
                className={`${
                  chat._id === selectedChat._id ? "active-chat" : ""
                }`}
              >
                <div className="d-flex">
                  <div
                    id={getSenderId(user._id, chat.users)}
                    className={`chat-user-img ${
                      onlineUsers.includes(getSenderId(user._id, chat.users))
                        ? "online"
                        : "offline"
                    } align-self-center me-3 ms-0`}
                  >
                    <img
                      src={
                        chat.isGroupChat
                          ? "https://gravatar.com/avatar/d8f67fd56faa1e74d8b7476ddf19ca7f?s=400&d=identicon&r=x"
                          : getSenderImage(user._id, chat.users)
                      }
                      className="rounded-circle avatar-xs"
                      alt="user-profile"
                    />
                    {!chat.isGroupChat && <span className="user-status" />}
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <h5
                      className="text-truncate font-size-15 mb-1"
                      style={{ textTransform: "capitalize" }}
                    >
                      {chat.isGroupChat
                        ? chat.name
                        : getSenderName(user._id, chat.users)}
                    </h5>
                    {chat.lastMessage ? (
                      <p className="chat-user-message text-truncate mb-0">
                        {checkLastMessageSender(
                          user._id,
                          chat.lastMessage
                        ).toLowerCase()}
                        : {chat.lastMessage.content}
                      </p>
                    ) : (
                      <p className="chat-user-message text-truncate mb-0">
                        Hey! there I'm available
                      </p>
                    )}
                  </div>
                </div>
              </a>
            </li>
          ))
        : null}
    </>
  );
};

export default ContactCard;
