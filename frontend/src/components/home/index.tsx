import React, { useEffect, useState } from "react";
import ChatContainer from "./ChatContainer";
import ChatSidebar from "./ChatSidebar";
import Sidebar from "./Sidebar";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:8000";
var socket;

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);
    setIsLoaded(true);
  }, []);

  return (
    <div className="layout-wrapper d-lg-flex">
      {isLoaded ? (
        <>
          <Sidebar />

          <ChatSidebar />

          <ChatContainer socket={socket} />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Home;
