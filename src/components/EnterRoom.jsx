import { useState } from "react";

export default function EnterRoom({
  handleJoinRoom,
  roomNum,
  setRoomNum,
  name,
  setName,
}) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minWidth: "100vw", minHeight: "100vh" }}
    >
      <div
        className="card shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="card-body">
          <h4 className="card-title text-center mb-4">Join a Chat Room</h4>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleJoinRoom();
            }}
          >
            <div className="mb-3">
              <label htmlFor="roomNum" className="form-label">
                Room Number
              </label>
              <input
                type="number"
                className="form-control"
                id="roomNum"
                placeholder="Enter room number"
                value={roomNum}
                onChange={(e) => setRoomNum(e.currentTarget.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="yourName" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Join Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
