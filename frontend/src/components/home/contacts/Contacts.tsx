/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { CREATE_ONE_CHAT, FETCH_CONTACTS } from "../../../ApiEndpoints";
import { postRequest } from "../../../AxiosRequest";
import { ChatState } from "../../../Context/ChatProvider";
import { UserFilterInterface } from "../../../GlobalInterFaces";

const Contacts = () => {
  const { user, setSelectedChat } = ChatState();
  const [loader, setLoader] = useState(false);
  const [contacts, setContacts] = useState([]);

  const createNewChat = (userId: string) => {
    postRequest(CREATE_ONE_CHAT, { userId, authId: user?._id })
      .then((response: any) => {
        setSelectedChat(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      postRequest(FETCH_CONTACTS, { authId: user._id })
        .then((response: any) => setContacts(response.data))
        .catch((error) => console.log("Error: ", error.message))
        .finally(() => setLoader(false));
    }
  }, [user]);

  return (
    <div className="p-4 chat-message-list chat-group-list" data-simplebar="">
      <div>
        <ul className="list-unstyled contact-list">
          {contacts.length > 0
            ? contacts.map((contact: UserFilterInterface) => (
                <li
                  key={contact._id}
                  style={{ padding: "10px 0", marginBottom: "10px" }}
                  onClick={() => createNewChat(contact._id)}
                >
                  <a style={{ cursor: "pointer" }}>
                    <div className="d-flex">
                      <div className="chat-user-img online align-self-center me-3 ms-0">
                        <img
                          src={contact.image}
                          className="rounded-circle avatar-xs"
                          alt={contact.name}
                        />
                        {/* <span className="user-status" /> */}
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <h5
                          className="text-truncate font-size-15 mb-1"
                          style={{ textTransform: "capitalize" }}
                        >
                          {contact.name}
                        </h5>
                        <p className="chat-user-message text-truncate mb-0">
                          Hey! click here to connect
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default Contacts;
