import React from "react";
import { io } from "socket.io-client";
let socket = io.connect("http://192.168.0.106:8080");

export default function Chat({ chat, pfp, number, userNumber }) {
  let handleRoomJoin = () => {
    let room = Number(userNumber) + Number(number);
    socket.emit("join_room", room);
  };
  return (
    <a
      onClick={() => {
        handleRoomJoin();
      }}
      href={`/chats/${chat}/${number}`}
      className="relative bg-base-300 p-2 flex items-center rounded-lg"
    >
      <div className="flex justify-start gap-4 text-lg items-center">
        <div className="avatar pl-2">
          <div className="w-14 rounded-full">
            <img
              src={
                pfp ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo18QktrggrSHB9m_-NmRjWIUNPdWWxqSJww&s"
              }
            />
          </div>
        </div>
        <h1>{chat}</h1>
      </div>
      <span className="absolute right-5 w-4 h-4 rounded-full bg-blue-400"></span>
    </a>
  );
}
