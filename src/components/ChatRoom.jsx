import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";
import NoMessages from "./NoMessages";

const ChatRoom = ({ roomNum, chatPayload, sendMessage, socketId, changeSiteTitle }) => {
  const [message, setMessage] = useState("");
  const [hasMessage, setHasMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    changeSiteTitle();
    if (!roomNum) navigate("/");
  }, [roomNum, navigate]);

  return (
    <div
      className="d-flex justify-content-center align-items-end"
      style={{ minWidth: "100vw", minHeight: "100vh" }}
    >
      
      <div className="container my-0" style={{ maxWidth: "1000px" }}>
      <h1 className="text-center">Room: {roomNum}</h1>
        <div
          className="border rounded p-3 bg-white shadow-sm"
          style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          <div className="mb-3">
            {!chatPayload || chatPayload.length === 0 ? (
              <NoMessages hasMessage={hasMessage} />
            ) : (
              chatPayload?.map((payload, index) => {
                const { senderSocketId, senderName, message, newJoin } =
                  payload;

                !hasMessage && newJoin?.socketId != socketId &&
                (message || newJoin.msg)
                  ? setHasMessage(true)
                  : null;

                return hasMessage ? (
                  <Chat
                    key={index}
                    socketId={socketId}
                    senderSocketId={senderSocketId}
                    senderName={senderName}
                    message={message}
                    newJoin={newJoin}
                    setHasMessage={setHasMessage}
                  />
                ) : (
                  <NoMessages key={index} hasMessage={hasMessage} />
                );
              })
            )}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(message);
            setMessage("");
          }}
        >
          <div className="d-flex align-items-center p-3 border-top bg-light ">
            <textarea
              placeholder="Type a message..."
              className="me-2 flex-grow-1"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
              required
            ></textarea>
            <button type="submit" className="primary">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
