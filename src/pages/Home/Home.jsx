import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faPenToSquare,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import Chat from "../../components/Chat/Chat";
import LoadingChat from "../../components/LoadingChat/LoadingChat";
import { useQuery } from "react-query";
import authenticate from "../../components/Authentication/Authentication";
import axios from "axios";
import { io } from "socket.io-client";
let socket = io.connect("http://192.168.0.106:8080");

export default function Home() {
  let [name, setName] = useState("");
  let [message, setMessage] = useState(null);
  let [success, setSuccess] = useState(false);
  let [showAlert, setShowAlert] = useState(false);
  let { data: isAuthenticated, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: authenticate,
  });

  let handleAddContact = () => {
    if (name === isAuthenticated?.data?.user?.username) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } else {
      axios
        .post(
          "http://192.168.0.106:8080/add-contact",
          {
            name,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
          setSuccess(res.data.success);
          setMessage(res.data.message);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  console.log(isAuthenticated?.data);

  return (
    <>
      {showAlert && (
        <div className="toast toast-top toast-center">
          <div className={`alert ${success ? "alert-success" : "alert-error"}`}>
            <span>{message || "Error !"}</span>
          </div>
        </div>
      )}
      {!isLoading &&
        isAuthenticated?.data?.success === false &&
        window.location.assign("/")}
      {!isLoading && isAuthenticated?.data?.success && (
        <div>
          <Header
            isAuthenticated={isAuthenticated?.data?.success}
            pfp={isAuthenticated?.data?.user?.pfp}
          />
          <div className="flex flex-col gap-5 px-3">
            <div className="px-3">
              <div className="flex justify-center gap-7 max-md:gap-5">
                <button title="Filter">
                  <FontAwesomeIcon icon={faSliders} size="xl" />
                </button>
                <button
                  title="Add"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                </button>
                <input
                  className="w-[90%] max-md:w-[80%] rounded-2xl p-3 px-5"
                  placeholder="Search for contact"
                  type="text"
                />
              </div>
            </div>
            <div className="px-3 flex flex-col gap-3">
              {isAuthenticated?.data?.user?.contacts.map((contact) => {
                return (
                  <Chat
                    chat={contact.name}
                    pfp={contact.pfp}
                    number={contact.number}
                    userNumber={isAuthenticated?.data?.user?.number}
                  />
                );
              })}
            </div>
          </div>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <div className="flex justify-center items-center gap-3 text-white text-xl">
                <FontAwesomeIcon icon={faAddressBook} /> Add Contact
              </div>
              <div className="flex flex-col items-center gap-5 my-10">
                <input
                  className="w-[95%] input-md bg-white text-black rounded-lg"
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  type="text"
                />
              </div>
              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => {
                    handleAddContact();
                  }}
                >
                  Add
                </button>
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    className="btn"
                    onClick={() => {
                      setName("");
                    }}
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
      {isLoading && (
        <div>
          <Header />
          <div className="flex flex-col gap-5 px-3">
            <div className="px-3">
              <div className="flex justify-center gap-7 max-md:gap-5">
                <button title="Filter">
                  <FontAwesomeIcon icon={faSliders} size="xl" />
                </button>
                <button
                  title="Add"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                </button>
                <input
                  className="w-[90%] max-md:w-[80%] rounded-2xl p-3 px-5"
                  placeholder="Search for contact"
                  type="text"
                />
              </div>
            </div>
            <div className="px-3 flex flex-col gap-3">
              <LoadingChat />
            </div>
          </div>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <div className="flex justify-center items-center gap-3 text-white text-xl">
                <FontAwesomeIcon icon={faAddressBook} /> Add Contact
              </div>
              <div className="flex flex-col items-center gap-5 my-10">
                <input
                  className="w-[95%] input-md bg-white text-black rounded-lg"
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  type="text"
                />
              </div>
              <div className="modal-action">
                <button className="btn">Add</button>
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    className="btn"
                    onClick={() => {
                      setName("");
                    }}
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}
