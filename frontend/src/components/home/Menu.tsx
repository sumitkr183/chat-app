import React from "react";

interface Props {
  childComp: React.ReactNode;
  title: string;
  link: string;
}

const Menu = (props: Props) => {
  return (
    <li
      className="nav-item"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={props.title}
    >
      <a
        className={`nav-link ${props.link === "chat" ? "active" : ""}`}
        id="pills-user-tab"
        data-bs-toggle="pill"
        href={`#pills-${props.link}`}
        role="tab"
      >
        {props.childComp}
      </a>
    </li>
  );
};

export default React.memo(Menu);
