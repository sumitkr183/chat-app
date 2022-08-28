import React from "react";
import Home from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import MessageIcon from "@material-ui/icons/Message";
import ContactsIcon from "@material-ui/icons/Contacts";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { ChatState } from "../../Context/ChatProvider";

const Sidebar = () => {
  const { user } = ChatState();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userDetails");

    navigate("/");
  };

  return (
    <div className="side-menu flex-lg-column me-lg-1 ms-lg-0">
      {/* LOGO */}
      <div className="navbar-brand-box">
        <Link to="/chat" className="logo logo-dark">
          <span className="logo-sm">
            <Home />
          </span>
        </Link>
      </div>
      {/* end navbar-brand-box */}
      {/* Start side-menu nav */}
      <div className="flex-lg-column my-auto">
        <ul
          className="nav nav-pills side-menu-nav justify-content-center"
          role="tablist"
        >
          <Menu
            childComp={<PersonIcon className="ri-user-2-line" />}
            title="Profile"
            link="setting"
          />

          <Menu
            childComp={<MessageIcon className="ri-message-3-line" />}
            title="Chats"
            link="chat"
          />

          {/* <Menu
            childComp={<GroupIcon className="ri-group-line" />}
            title="Groups"
            link="groups"
          /> */}

          <Menu
            childComp={<ContactsIcon className="ri-contacts-line" />}
            title="Contacts"
            link="contacts"
          />

          <Menu
            childComp={<SettingsIcon className="ri-settings-2-line" />}
            title="Settings"
            link="setting"
          />

          <li className="nav-item dropdown profile-user-dropdown d-inline-block d-lg-none">
            <span
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src={user?.image}
                alt={user?.name}
                className="profile-user rounded-circle"
              />
            </span>
            <div className="dropdown-menu">
              <span className="dropdown-item" onClick={() => handleLogout()}>
                Log out
                <ExitToAppIcon className="ri-logout-circle-r-line float-end text-muted" />
              </span>
            </div>
          </li>
        </ul>
      </div>
      {/* end side-menu nav */}
      <div className="flex-lg-column d-none d-lg-block">
        <ul className="nav side-menu-nav justify-content-center">
          <li className="nav-item btn-group dropup profile-user-dropdown">
            <span
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src={user?.image}
                alt={user?.name}
                className="profile-user rounded-circle"
              />
            </span>
            <div className="dropdown-menu">
              <span
                className="dropdown-item"
                style={{ cursor: "pointer" }}
                onClick={() => handleLogout()}
              >
                Log out
                <ExitToAppIcon className="ri-logout-circle-r-line float-end text-muted" />
              </span>
            </div>
          </li>
        </ul>
      </div>
      {/* Side menu user */}
    </div>
  );
};

export default React.memo(Sidebar);
