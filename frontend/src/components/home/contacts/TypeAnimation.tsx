import React from "react";
import { ChatState } from "../../../Context/ChatProvider";
import { getSenderImage, getSenderName } from "../../../global";

const TypeAnimation = () => {
  const { user, selectedChat } = ChatState();

  return (
    <>
      <li>
        <div className="conversation-list">
          <div className="chat-avatar">
            <img
              src={
                selectedChat.isGroupChat
                  ? "https://gravatar.com/avatar/d8f67fd56faa1e74d8b7476ddf19ca7f?s=400&d=identicon&r=x"
                  : getSenderImage(user._id, selectedChat.users)
              }
              alt=""
            />
          </div>
          <div className="user-chat-content">
            <div className="ctext-wrap">
              <div className="ctext-wrap-content">
                <p className="mb-0">
                  typing
                  <span className="animate-typing">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </span>
                </p>
              </div>
            </div>
            <div className="conversation-name capital-word">
              {selectedChat.isGroupChat
                ? selectedChat.name
                : getSenderName(user._id, selectedChat.users)}
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default React.memo(TypeAnimation);
