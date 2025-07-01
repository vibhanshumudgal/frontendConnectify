import React from "react";
import { Link } from "react-router-dom";

const Connection_Card = ({ res }) => {
  const { _id, name, age, about, gender, email } = res;

  return (
    <div
      className="w-full bg-gray-900 text-white px-6 py-4 border-b border-gray-700 
                        hover:bg-gray-800 transition-colors duration-200 group flex items-center justify-between"
    >
      {/* Left Section: Name, Gender, About */}
      <div className="flex items-center gap-6 overflow-hidden">
        {/* Name & Gender */}
        <div>
          <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
            {name}, {age}
          </h2>
          <p className="text-sm uppercase tracking-widest text-gray-400">
            {gender}
          </p>
        </div>

        {/* About (limited to 1 line) */}
        <p className="text-gray-300 text-sm line-clamp-1 max-w-xs hidden md:block">
          {about}
        </p>
        <p className="text-blue-400 text-sm font-medium truncate max-w-xs text-right">
          {email}
        </p>
      </div>

      <Link to={`/chat/${_id}`}>
        <div className="bg-amber-400 cursor-pointer p-2">
          <button className="cursor-pointer text-black font-semibold">
            CHAT
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Connection_Card;
