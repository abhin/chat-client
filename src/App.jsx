import { useEffect, useState } from "react";
import ChatRoom from "./components/ChatRoom";
import EnterRoom from "./components/EnterRoom";
import { io } from "socket.io-client";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:8001");

function App() {
  const navigate = useNavigate();
  const [chatPayload, setChatPayload] = useState([]);
  const [roomNum, setRoomNum] = useState("");
  const [name, setName] = useState("");

  function changeSiteTitle() {
    document.title = `${name} - Room: ${roomNum} Chat`;
  }

  function handleJoinRoom() {
    socket.emit("join-room", {
      roomNum: roomNum,
      name: name,
    });
  }

  const sendMessage = (message) => {
    socket.emit("send-message", {
      chatMsg: message,
      roomNum,
      name,
    });
  };

  useEffect(() => {
    socket.on("connected", (data) => {
      toast.success(data?.message);
    });

    socket.on("join-success", (data) => {
      const { success } = data;
      setChatPayload((prevChatMsg) => [...prevChatMsg, data]);
      if (success) navigate("/chat-room");
    });

    socket.on("new-chat-message", (data) => {
      setChatPayload((prevChatMsg) => [...prevChatMsg, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const enterRoomCmpont = (
    <EnterRoom
      handleJoinRoom={handleJoinRoom}
      roomNum={roomNum}
      setRoomNum={setRoomNum}
      name={name}
      setName={setName}
    />
  );

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Routes>
          <Route path="/" element={enterRoomCmpont} />
          <Route path="join-room" element={enterRoomCmpont} />
          <Route
            path="chat-room"
            element={
              <ChatRoom
                roomNum={roomNum}
                socketId={socket.id}
                chatPayload={chatPayload}
                sendMessage={sendMessage}
                changeSiteTitle={changeSiteTitle}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
