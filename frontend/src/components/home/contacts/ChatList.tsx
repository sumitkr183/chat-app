import React from "react";
import { ChatState } from "../../../Context/ChatProvider";
import { checkLastMessageSender } from "../../../global";
import { MessageInterface } from "../../../GlobalInterFaces";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const ChatList = ({ messages }: any) => {
  const { user } = ChatState();

  return (
    <>
      {messages.length > 0
        ? messages.map((message: MessageInterface) => (
            <li
              key={message._id}
              className={`${message?.sender?._id === user?._id ? "right" : ""}`}
            >
              <div className="conversation-list">
                <div className="chat-avatar">
                  <img
                    src={message?.sender?.image}
                    alt={message?.sender?.name}
                  />
                </div>
                <div className="user-chat-content">
                  <div className="ctext-wrap">
                    <div className="ctext-wrap-content">
                      <p className="mb-0">{message?.content}</p>
                      <p className="chat-time mb-0">
                        <i className="ri-time-line align-middle" />{" "}
                        <span className="align-middle">10:00</span>
                      </p>
                    </div>
                    <div className="dropdown align-self-start">
                      <span
                        className="dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <MoreVertIcon />
                      </span>
                      <div className="dropdown-menu">
                        <span className="dropdown-item">
                          Copy{" "}
                          <FileCopyIcon className="ri-file-copy-line float-end text-muted" />
                        </span>
                        {user?._id === message.sender._id ? (
                          <span className="dropdown-item">
                            Delete{" "}
                            <DeleteForeverIcon className="ri-delete-bin-line float-end text-muted" />
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div
                    className="conversation-name"
                    style={{ textTransform: "capitalize" }}
                  >
                    {checkLastMessageSender(user?._id, message)}
                  </div>
                </div>
              </div>
            </li>
          ))
        : null}
    </>
  );
};

export default React.memo(ChatList);
