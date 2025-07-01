import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/UserSilce";
import { useNavigate } from "react-router-dom";
import Base_Url from "../Constant.js";

const LoginLogout = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [login, setLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        Base_Url + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data));
      navigate("/user/feed");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        Base_Url + "/singup",
        { name, age, about, gender, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.savedUser));
      navigate("/user/feed");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="relative bg-opacity-10 backdrop-blur-md border border-gray-800 p-6 rounded-xl shadow-md w-full max-w-xs bg-gray-900">
        <h1 className="text-xl font-semibold mb-4 text-center text-gray-200">
          {login ? "LOG IN" : "SIGN UP"}
        </h1>
        <form className="space-y-3" onSubmit={login ? handleLogIn : handleSignUp}>
          {!login && (
            <>
              <InputField label="Name" type="text" value={name} onChange={setName} />
              <InputField label="Age" type="number" value={age} onChange={setAge} />
              <InputField label="about" type="text" value={about} onChange={setAbout} />
              <InputField label="gender" type="text" value={gender} onChange={setGender} />
            </>
          )}
          <InputField label="Email" type="email" value={email} onChange={setEmail} />
          <InputField label="Password" type="password" value={password} onChange={setPassword} />
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-200 text-sm"
          >
            {login ? "LOG IN" : "SIGN UP"}
          </button>
        </form>

        <p
          className="text-gray-400 text-center mt-3 text-xs cursor-pointer hover:text-blue-400 transition"
          onClick={() => setLogin(!login)}
        >
          {login ? "Need an account? Sign Up" : "Already have an account? Log In"}
        </p>
      </div>
    </div>
  );
};

const InputField = ({ label, type, value, onChange }) => (
  <div className="space-y-1">
    <label className="block text-gray-300 text-xs">{label}:</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
    />
  </div>
);

export default LoginLogout;
