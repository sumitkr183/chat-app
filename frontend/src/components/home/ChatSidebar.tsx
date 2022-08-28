/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Contacts from "./contacts/Contacts";
import UserProfile from "./profile/UserProfile";
import RecentChats from "./RecentChats";

const ChatSidebar = () => {
  return (
    <div className="chat-leftsidebar me-lg-1 ms-lg-0">
      <div className="tab-content">
        {/* Start Profile tab-pane */}
        <div
          className="tab-pane"
          id="pills-user"
          role="tabpanel"
          aria-labelledby="pills-user-tab"
        >
          {/* Start profile content */}
          <div>
            <div className="px-4 pt-4">
              <div className="user-chat-nav float-end">
                <div className="dropdown">
                  <span
                    className="font-size-18 text-muted dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="ri-more-2-fill" />
                  </span>
                  <div className="dropdown-menu dropdown-menu-end">
                    <span className="dropdown-item">Edit</span>
                    <span className="dropdown-item">Action</span>
                    <div className="dropdown-divider" />
                    <span className="dropdown-item">Another action</span>
                  </div>
                </div>
              </div>
              <h4 className="mb-0">My Profile</h4>
            </div>
            <div className="text-center p-4 border-bottom">
              <div className="mb-4">
                <img
                  src="https://avatars.dicebear.com/v2/male/54c3abe01f1980e19e42e78ec08dc872.svg"
                  className="rounded-circle avatar-lg img-thumbnail"
                  alt=""
                />
              </div>
              <h5 className="font-size-16 mb-1 text-truncate">
                Patricia Smith
              </h5>
              <p className="text-muted text-truncate mb-1">
                <i className="ri-record-circle-fill font-size-10 text-success me-1 ms-0 d-inline-block" />{" "}
                Active
              </p>
            </div>
            {/* End profile user */}
          </div>
          {/* End profile content */}
        </div>
        {/* End Profile tab-pane */}
        {/* Start chats tab-pane */}
        <div
          className="tab-pane fade show active"
          id="pills-chat"
          role="tabpanel"
          aria-labelledby="pills-chat-tab"
        >
          <RecentChats />
        </div>
        {/* End chats tab-pane */}

        {/* Start contacts tab-pane */}
        <div
          className="tab-pane"
          id="pills-contacts"
          role="tabpanel"
          aria-labelledby="pills-contacts-tab"
        >
          {/* Start Contact content */}
          <div>
            <div className="p-4">
              <div className="user-chat-nav float-end">
                <div
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Add Contact"
                >
                  {/* Button trigger modal */}
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none text-muted font-size-18 py-0"
                    data-bs-toggle="modal"
                    data-bs-target="#addContact-exampleModal"
                  >
                    <i className="ri-user-add-line" />
                  </button>
                </div>
              </div>
              <h4 className="mb-4">Contacts</h4>
              {/* Start Add contact Modal */}
              <div
                className="modal fade"
                id="addContact-exampleModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="addContact-exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title font-size-16"
                        id="addContact-exampleModalLabel"
                      >
                        Add Contact
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body p-4">
                      <form>
                        <div className="mb-3">
                          <label
                            htmlFor="addcontactemail-input"
                            className="form-label"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="addcontactemail-input"
                            placeholder="Enter Email"
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="addcontact-invitemessage-input"
                            className="form-label"
                          >
                            Invatation Message
                          </label>
                          <textarea
                            className="form-control"
                            id="addcontact-invitemessage-input"
                            rows={3}
                            placeholder="Enter Message"
                            defaultValue={""}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-link"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Invite Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Add contact Modal */}
              <div className="search-box chat-search-box">
                <div className="input-group bg-light  input-group-lg rounded-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-link text-decoration-none text-muted pe-1 ps-3"
                      type="button"
                    >
                      <i className="ri-search-line search-icon font-size-18" />
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control bg-light"
                    placeholder="Search users.."
                  />
                </div>
              </div>
              {/* End search-box */}
            </div>
            {/* end p-4 */}
            {/* Start contact lists */}
            <Contacts />
            {/* end contact lists */}
          </div>
          {/* Start Contact content */}
        </div>
        {/* End contacts tab-pane */}
        {/* Start settings tab-pane */}
        <div
          className="tab-pane"
          id="pills-setting"
          role="tabpanel"
          aria-labelledby="pills-setting-tab"
        >
          <UserProfile />
        </div>
        {/* End settings tab-pane */}
      </div>
      {/* end tab content */}
    </div>
  );
};

export default ChatSidebar;
