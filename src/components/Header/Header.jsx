import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faBars,
  faHouse,
  faUserPen,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";

export default function Header({ isAuthenticated, pfp }) {
  let [imageName, setImageName] = useState("");
  let [url, setUrl] = useState(null);
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

  let handleLogout = () => {
    axios
      .post(
        "http://192.168.0.106:8080/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.success);
        res.data.success && window.location.assign("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let handleChangePfp = () => {
    if (url !== null) {
      axios
        .patch(
          "http://192.168.0.106:8080/change-pfp",
          { url },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  console.log(isAuthenticated);

  return (
    <div className="px-5 flex items-center justify-between w-full h-[5rem] my-5">
      <div>
        <h1 className="title text-4xl">Chatoo</h1>
      </div>
      <div className="max-md:hidden">
        <ul className="flex justify-center items-center gap-3">
          <li>
            <a className="btn btn-ghost" href="/home">
              Home
            </a>
          </li>
          <li>
            <a className="btn btn-ghost" href="/about-us">
              About Us
            </a>
          </li>
          {isAuthenticated === false && (
            <li>
              <a href="/login" className="btn btn-ghost" type="button">
                Log In
              </a>
            </li>
          )}
          {isAuthenticated && (
            <div className="dropdown dropdown-end">
              <img
                src={pfp}
                alt=""
                tabIndex={0}
                role="button"
                className="avatar w-12 h-12 rounded-full object-cover"
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 mt-2 shadow"
              >
                <li>
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    <FontAwesomeIcon icon={faUserPen} />
                    Edit picture
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                    Log-out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </ul>
      </div>
      <div className="hidden max-md:block">
        <div className="drawer z-50">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn w-14 drawer-button">
              <FontAwesomeIcon icon={faBars} size="xl" />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu relative flex flex-col gap-1 bg-base-200 text-base-content min-h-full w-72 p-4">
              <div className="w-full flex flex-col justify-center items-center gap-2 my-3 mb-5 text-white">
                <h1 className="text-2xl">Menu</h1>
                <hr className="w-[95%] mx-auto" />
              </div>
              <li>
                <a className="flex items-center " href="/home">
                  <FontAwesomeIcon icon={faHouse} />
                  Home
                </a>
              </li>
              <li>
                <a className="flex items-center " href="/about-us">
                  <FontAwesomeIcon icon={faUsers} />
                  About Us
                </a>
              </li>
              <div className="absolute bottom-0 menu px-0 w-64">
                <ul className="flex flex-col gap-1">
                  {isAuthenticated === false && (
                    <li>
                      <a className="flex items-center" href="/login">
                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                        Login
                      </a>
                    </li>
                  )}
                  {isAuthenticated && (
                    <>
                      <li className="collapse bg-base-200">
                        <input type="checkbox" />
                        <div className="collapse-title">
                          <div className="avatar">
                            <div className="w-10 rounded-full">
                              <img src={pfp} />
                            </div>
                          </div>
                          Account
                        </div>
                        <div className="collapse-content flex flex-col gap-4 items-start">
                          <button
                            onClick={() =>
                              document.getElementById("my_modal_3").showModal()
                            }
                            className="w-full flex items-center gap-2"
                          >
                            <FontAwesomeIcon icon={faUserPen} />
                            Edit picture
                          </button>
                          <button
                            className="w-full flex items-center gap-2"
                            onClick={() => {
                              handleLogout();
                            }}
                          >
                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                            Log-out
                          </button>
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box flex flex-col justify-center items-center gap-5">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={pfp} />
            </div>
          </div>
          <p className="w-20 text-white whitespace-nowrap overflow-hidden text-ellipsis mt-2">
            {imageName}
          </p>
          <label className="btn" htmlFor="choose">
            Choose
          </label>
          <button
            className="btn btn-error"
            onClick={() => {
              handleChangePfp();
            }}
          >
            Save
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <input
        className="hidden"
        onChange={(e) => {
          handleConvertion(e);
          setImageName(e.target?.files[0]?.name);
        }}
        id="choose"
        type="file"
      />
    </div>
  );
}
