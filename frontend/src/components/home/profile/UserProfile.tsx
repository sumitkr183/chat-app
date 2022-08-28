import React from "react";
import CreateIcon from "@material-ui/icons/Create";
import { ChatState } from "../../../Context/ChatProvider";

const UserProfile = () => {
  const { user } = ChatState();

  return (
    <>
      <div className="px-4 pt-4">
        <h4 className="mb-0">Profile & Settings</h4>
      </div>
      <div className="text-center border-bottom p-4">
        <div className="mb-4 profile-user">
          <img
            src={user?.image}
            className="rounded-circle avatar-lg img-thumbnail"
            alt={user?.name}
          />
          <button
            type="button"
            className="btn btn-light bg-light avatar-xs p-0 rounded-circle profile-photo-edit"
          >
            <CreateIcon className="ri-pencil-fill" />
          </button>
        </div>
        <h5
          className="font-size-16 mb-1 text-truncate"
          style={{ textTransform: "capitalize" }}
        >
          {user?.name}
        </h5>
        <div className="dropdown d-inline-block mb-1">
          <span
            className="text-muted dropdown-toggle pb-1 d-block"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Available <i className="mdi mdi-chevron-down" />
          </span>
          <div className="dropdown-menu">
            <span className="dropdown-item">Available</span>
            <span className="dropdown-item">Busy</span>
          </div>
        </div>
      </div>
      {/* End profile user */}
      {/* Start User profile description */}
      <div className="p-4 user-profile-desc" data-simplebar="">
        <div id="settingprofile" className="accordion">
          <div className="accordion-item card border mb-2">
            <div className="accordion-header" id="personalinfo1">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#personalinfo"
                aria-expanded="true"
                aria-controls="personalinfo"
              >
                <h5 className="font-size-14 m-0">Personal Info</h5>
              </button>
            </div>
            <div
              id="personalinfo"
              className="accordion-collapse collapse show"
              aria-labelledby="personalinfo1"
              data-bs-parent="#settingprofile"
            >
              <div className="accordion-body">
                <div className="float-end">
                  <button type="button" className="btn btn-light btn-sm">
                    <i className="ri-edit-fill me-1 ms-0 align-middle" /> Edit
                  </button>
                </div>
                <div>
                  <p className="text-muted mb-1">Name</p>
                  <h5 className="font-size-14">{user?.name}</h5>
                </div>
                <div className="mt-4">
                  <p className="text-muted mb-1">Email</p>
                  <h5 className="font-size-14">{user?.email}</h5>
                </div>
              </div>
            </div>
          </div>
          {/* end personal info card */}
          <div className="accordion-item card border mb-2">
            <div className="accordion-header" id="privacy1">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#privacy"
                aria-expanded="false"
                aria-controls="privacy"
              >
                <h5 className="font-size-14 m-0">Privacy</h5>
              </button>
            </div>
            <div
              id="privacy"
              className="accordion-collapse collapse"
              aria-labelledby="privacy1"
              data-bs-parent="#settingprofile"
            >
              <div className="accordion-body">
                <div className="py-3">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        Profile photo
                      </h5>
                    </div>
                    <div className="dropdown ms-2 me-0">
                      <button
                        className="btn btn-light btn-sm dropdown-toggle w-sm"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Everyone <i className="mdi mdi-chevron-down" />
                      </button>
                      <div className="dropdown-menu dropdown-menu-end">
                        <span className="dropdown-item">Everyone</span>
                        <span className="dropdown-item">selected</span>
                        <span className="dropdown-item">Nobody</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-3 border-top">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        Last seen
                      </h5>
                    </div>
                    <div className="ms-2 me-0">
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="privacy-lastseenSwitch"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="privacy-lastseenSwitch"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-3 border-top">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        Status
                      </h5>
                    </div>
                    <div className="dropdown ms-2 me-0">
                      <button
                        className="btn btn-light btn-sm dropdown-toggle w-sm"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Everyone <i className="mdi mdi-chevron-down" />
                      </button>
                      <div className="dropdown-menu dropdown-menu-end">
                        <span className="dropdown-item">Everyone</span>
                        <span className="dropdown-item">selected</span>
                        <span className="dropdown-item">Nobody</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-3 border-top">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        Read receipts
                      </h5>
                    </div>
                    <div className="ms-2 me-0">
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="privacy-readreceiptSwitch"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="privacy-readreceiptSwitch"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-3 border-top">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="font-size-13 mb-0 text-truncate">
                        Groups
                      </h5>
                    </div>
                    <div className="dropdown ms-2 me-0">
                      <button
                        className="btn btn-light btn-sm dropdown-toggle w-sm"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Everyone <i className="mdi mdi-chevron-down" />
                      </button>
                      <div className="dropdown-menu dropdown-menu-end">
                        <span className="dropdown-item">Everyone</span>
                        <span className="dropdown-item">selected</span>
                        <span className="dropdown-item">Nobody</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end privacy card */}
          <div className="accordion-item card border mb-2">
            <div className="accordion-header" id="security1">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#security"
                aria-expanded="false"
                aria-controls="security"
              >
                <h5 className="font-size-14 m-0"> Security</h5>
              </button>
            </div>
            <div
              id="security"
              className="accordion-collapse collapse"
              aria-labelledby="security1"
              data-bs-parent="#settingprofile"
            >
              <div className="accordion-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 overflow-hidden">
                    <h5 className="font-size-13 mb-0 text-truncate">
                      Show security notification
                    </h5>
                  </div>
                  <div className="ms-2 me-0">
                    <div className="form-check form-switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="security-notificationswitch"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="security-notificationswitch"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end profile-setting-accordion */}
      </div>
      {/* End User profile description */}
    </>
  );
};

export default UserProfile;
