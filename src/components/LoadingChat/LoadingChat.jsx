import React from "react";

export default function LoadingChat() {
  return (
    <div className="skeleton relative bg-base-300 p-2 flex items-center rounded-lg">
      <div className="flex justify-start gap-4 text-lg items-center">
        <div className="avatar pl-2">
          <div className="skeleton bg-[#0a1118] w-14 h-14 rounded-full"></div>
        </div>
        <div className="skeleton w-32 h-5 bg-[#0a1118]"></div>
      </div>
    </div>
  );
}
