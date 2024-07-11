import React, { useRef } from "react";

export default function SentImage({ source, mainUser }) {
  let imageRef = useRef(null);
  return (
    <div className={`flex ${mainUser ? "justify-end" : "justify-start"}`}>
      <img
        onClick={() => imageRef.current.showModal()}
        className="w-36 max-md:w-28 cursor-pointer"
        src={source}
        alt=""
      />
      <dialog ref={imageRef} className="modal">
        <div className="modal-box w-80 max-md:w-64 bg-transparent shadow-none">
          <img src={source} alt="" />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="cursor-default" >close</button>
        </form>
      </dialog>
    </div>
  );
}
