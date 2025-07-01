import axios from "axios";
import Base_Url from "../Constant";

const FeedCard = ({ user, onAction }) => {
  const { _id, name, age, gender, about, email } = user;
  const handelclick = async (status, id) => {
    const data = await axios.post(
      `${Base_Url}/request/send/${status}/${id}`,
      {},
      { withCredentials: true }
    );
    if (onAction) onAction(id);
  };
  return (
    <div className="relative group max-w-sm bg-white/60 backdrop-blur-md rounded-3xl border border-gray-200 p-6 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] hover:border-transparent hover:bg-gradient-to-br hover:from-white/70 hover:to-gray-100">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

      <div className="relative text-center">
        <h2 className="font-extrabold text-3xl text-gray-800 mb-2 group-hover:text-indigo-700 transition-colors duration-300">
          {name}
        </h2>
        <p className="text-gray-600 group-hover:text-gray-800">Age: {age}</p>
        <p className="text-gray-600 group-hover:text-gray-800">
          Gender: {gender}
        </p>
        <p className="text-gray-600 mt-2 text-sm group-hover:text-gray-900">
          {about}
        </p>
        <a
          href={`mailto:${email}`}
          className="block mt-4 text-blue-500 hover:text-blue-700 hover:underline text-sm transition-colors duration-300"
        >
          {email}
        </a>
      </div>

      <div className="mt-6 flex justify-center gap-6">
        <button
          onClick={() => handelclick("intrested", _id)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-bold shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:from-indigo-500 hover:to-purple-600 active:scale-95"
        >
          ❤️ Interested
        </button>
        <button
          onClick={() => handelclick("ignored", _id)}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full text-sm font-bold shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:from-pink-500 hover:to-rose-600 active:scale-95"
        >
          🚫 Ignore
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
