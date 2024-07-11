import {
  faArrowLeft,
  faCirclePlus,
  faPaperPlane,
  faPhotoFilm,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import authenticate from "../../components/Authentication/Authentication";
import { useQuery } from "react-query";
import axios from "axios";
import SentImage from "../../components/SentImage/SentImage";
let socket = io.connect("http://192.168.0.106:8080");

export default function ChatPage() {
  let { chat, number } = useParams();
  let [imageName, setImageName] = useState("");
  let [isMedia, setIsMedia] = useState(false);
  let [url, setUrl] = useState(null);
  let [pfp, setPfp] = useState("");
  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let { data: isAuthenticated, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: authenticate,
  });
  let room = Number(isAuthenticated?.data?.user?.number) + Number(number);
  socket.emit("join_room", room);

  let handleSendMessage = () => {
    console.log(messages);
    socket.emit("send_message", {
      text: message,
      media: url,
      isMedia: isMedia,
      who: isAuthenticated?.data?.user?.username,
      room: Number(isAuthenticated?.data?.user?.number) + Number(number),
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: message,
        media: url,
        isMedia: isMedia,
        who: isAuthenticated?.data?.user?.username,
        room: Number(isAuthenticated?.data?.user?.number) + Number(number),
      },
    ]);
    setMessage("");
    setIsMedia(false);
  };
  onkeydown = (ev) => {
    if (ev.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data);
      console.log(messages);
    });

    axios
      .post(
        "http://192.168.0.106:8080/get-contact",
        {
          username: chat,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.pfp);
        setPfp(res.data.pfp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [socket]);

  let convertToBase64 = async (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    let data = new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
    });
    return data;
  };

  let handleConvertion = async (e) => {
    let file = e.target.files[0];
    let image = await convertToBase64(file);
    setUrl(image);
    console.log(image);
  };

  return (
    <>
      {!isLoading &&
        isAuthenticated?.data?.success === false &&
        window.location.assign("/")}
      {!isLoading && isAuthenticated?.data?.success && (
        <div className="flex flex-col gap-2">
          <div className="h-[5rem] max-md:h-[4rem] w-full flex justify-between items-center shadow-md px-5">
            <div className="flex justify-center items-center gap-3">
              {pfp === "" ? (
                <div className="skeleton w-14 h-14 max-md:w-12 max-md:h-12 rounded-full"></div>
              ) : (
                <div className="avatar pl-2">
                  <div className="w-14 max-md:w-12 rounded-full">
                    <img src={pfp} />
                  </div>
                </div>
              )}
              <h1 className="text-lg">{chat}</h1>
            </div>
            <div>
              <a href="/home" className="btn btn-circle">
                <FontAwesomeIcon icon={faArrowLeft} />
              </a>
            </div>
          </div>
          <div className="h-[calc(100vh-10rem)] max-md:h-[calc(100vh-15rem)] flex flex-col gap-3 px-3 py-10 overflow-auto">
            {messages?.map((m) => {
              if (m.who === isAuthenticated?.data?.user?.username) {
                return m.isMedia === true ? (
                  <SentImage mainUser={true} source={m.media} />
                ) : (
                  <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-primary max-w-60 break-words">
                      {m.text}
                    </div>
                  </div>
                );
              }

              return m.isMedia === true ? (
                <SentImage mainUser={false} source={m.media} />
              ) : (
                <div className="chat chat-start">
                  <div className="chat-bubble max-w-60 break-words">
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="fixed bottom-0 w-full h-[5rem] z-50 bg-[#1d232a] flex justify-evenly items-center gap-3 px-3">
            <div className="dropdown dropdown-top">
              <div tabIndex={0} role="button" className="m-1">
                <FontAwesomeIcon icon={faCirclePlus} size="2xl" color="white" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-gray-600 rounded-sm text-white z-[1] w-52 p-2 mb-3 shadow"
              >
                <li className="flex gap-3">
                  <label htmlFor="media">
                    <FontAwesomeIcon icon={faPhotoFilm} />
                    Media
                  </label>
                </li>
              </ul>
            </div>
            <input
              className="w-[90%] max-md:w-[70%] p-3 px-4 rounded-md"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              spellCheck={false}
              value={message}
              type="text"
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                handleSendMessage();
              }}
            >
              <FontAwesomeIcon icon={faPaperPlane} size="lg" color="white" />
            </button>
          </div>
          <input
            type="file"
            id="media"
            className="hidden"
            onChange={(e) => {
              handleConvertion(e);
              setMessage(e.target?.files[0]?.name);
              setIsMedia(true);
            }}
          />
        </div>
      )}
      {isLoading && <div></div>}
    </>
  );
}
