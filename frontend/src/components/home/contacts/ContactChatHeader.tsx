import React from "react";
import { ChatState } from "../../../Context/ChatProvider";
import { getSenderId, getSenderImage, getSenderName } from "../../../global";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const ContactChatHeader = ({ sender }: any) => {
  const { user, onlineUsers } = ChatState();

  return (
    <div className="p-3 p-lg-4 border-bottom user-chat-topbar">
      <div className="row align-items-center">
        <div className="col-sm-4 col-8">
          <div className="d-flex align-items-center">
            <div className="me-3 ms-0">
              <img
                src={
                  sender?.isGroupChat
                    ? "https://gravatar.com/avatar/d8f67fd56faa1e74d8b7476ddf19ca7f?s=400&d=identicon&r=x"
                    : getSenderImage(user._id, sender?.users)
                }
                className="rounded-circle avatar-xs"
                alt={"user-profile"}
              />
            </div>
            <div className="flex-grow-1 overflow-hidden">
              <h5
                className="font-size-16 mb-0 text-truncate"
                style={{ display: "flex", alignItems: "center" }}
              >
                <span className="text-reset user-profile-show capital-word">
                  {sender?.isGroupChat
                    ? sender?.name
                    : getSenderName(user._id, sender?.users)}
                </span>{" "}
                {!sender?.isGroupChat && (
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      background: `${
                        onlineUsers.includes(
                          getSenderId(user._id, sender?.users)
                        )
                          ? "#06d6a0"
                          : "#ff5050"
                      } `,
                      borderRadius: "100%",
                      marginLeft: "15px",
                    }}
                  ></span>
                )}
              </h5>
            </div>
          </div>
        </div>
        <div className="col-sm-8 col-4">
          <ul className="list-inline user-chat-nav text-end mb-0">
            <li className="list-inline-item">
              <div className="dropdown">
                <button
                  className="btn nav-btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <MoreHorizIcon />
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  <span className="dropdown-item">
                    Delete Chat
                    <DeleteForeverIcon className="ri-delete-bin-line float-end text-muted" />
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContactChatHeader);
