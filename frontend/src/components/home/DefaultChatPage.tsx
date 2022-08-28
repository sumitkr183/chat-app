import React from "react";

const DefaultChatPage = () => {
  return (
    <div
      className="user-chat w-100 overflow-hidden default-page"
      style={{ position: "relative" }}
    >
      <div>
        <img src="/assets/images/default.svg" alt="default" />
      </div>
      <div>
        <h1>Click on contact to start chat</h1>
      </div>
    </div>
  );
};

export default DefaultChatPage;
