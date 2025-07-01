import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeRequest } from "../Utils/InvitationSlice";
import Base_Url from "../Constant";

const Invite_Card = ({ user }) => {
  const { _id, name, age, gender, about, email } = user;
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  const review_request = async (status, id) => {
    setIsRemoving(true); // Trigger fade-out animation

    setTimeout(() => {
      dispatch(removeRequest(id)); // Dispatch Redux action **AFTER** animation
    }, 300); // Delay must match CSS transition duration

    await axios.post(`${Base_Url}/request/review/${status}/${id}`, {}, { withCredentials: true });
  };

  return (
    <div
      className={`relative group max-w-sm bg-white/60 backdrop-blur-md rounded-3xl border border-gray-200 p-6 shadow-xl transition-all duration-500 
      hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] hover:border-transparent hover:bg-gradient-to-br 
      hover:from-white/70 hover:to-gray-100 ${isRemoving ? "opacity-0 scale-90 pointer-events-none" : ""}`}
    >
      <div className="relative text-center">
        <h2 className="font-extrabold text-3xl text-gray-800 mb-2 group-hover:text-indigo-700 transition-colors duration-300">
          {name}
        </h2>
        <p className="text-gray-600 group-hover:text-gray-800">Age: {age}</p>
        <p className="text-gray-600 group-hover:text-gray-800">Gender: {gender}</p>
        <p className="text-gray-600 mt-2 text-sm group-hover:text-gray-900">{about}</p>
        <a
          href={`mailto:${email}`}
          className="block mt-4 text-blue-500 hover:text-blue-700 hover:underline text-sm transition-colors duration-300"
        >
          {email}
        </a>
      </div>

      <div className="mt-6 flex justify-center gap-6">
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-bold shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:from-indigo-500 hover:to-purple-600 active:scale-95 cursor-pointer"
          onClick={() => review_request("accepted", _id)}
        >
          ACCEPT
        </button>
        <button
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full text-sm font-bold shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:from-pink-500 hover:to-rose-600 active:scale-95 cursor-pointer"
          onClick={() => review_request("rejected", _id)}
        >
          REJECT
        </button>
      </div>
    </div>
  );
};

export default Invite_Card;
