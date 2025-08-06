import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/UserSilce";
import { useNavigate } from "react-router-dom";
import Base_Url from "../Constant.js";

const LoginLogout = () => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test123$");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false); // ⬅️ Loading state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true); // Start shimmer
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
    } finally {
      setLoading(false); // Stop shimmer
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); // Start shimmer
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
    } finally {
      setLoading(false); // Stop shimmer
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-sm text-gray-300">Authenticating... Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="relative bg-opacity-10 backdrop-blur-md border border-gray-800 p-6 rounded-xl shadow-md w-full max-w-xs bg-gray-900">
        <h1 className="text-xl font-semibold mb-4 text-center text-gray-200">
          {login ? "LOG IN" : "SIGN UP"}
        </h1>
        <form
          className="space-y-3"
          onSubmit={login ? handleLogIn : handleSignUp}
        >
          {!login && (
            <>
              <InputField
                label="Name"
                type="text"
                value={name}
                onChange={setName}
              />
              <InputField
                label="Age"
                type="number"
                value={age}
                onChange={setAge}
              />
              <InputField
                label="About"
                type="text"
                value={about}
                onChange={setAbout}
              />
              <InputField
                label="Gender"
                type="text"
                value={gender}
                onChange={setGender}
              />
            </>
          )}
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />

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
          {login
            ? "Need an account? Sign Up"
            : "Already have an account? Log In"}
        </p>

        <div className="mt-4 p-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg text-center">
          <p className="text-xs text-gray-300 leading-relaxed">
            Just exploring?{" "}
            <span className="text-blue-400 font-medium">
              Use default credentials
            </span>{" "}
            and click{" "}
            <span className="text-blue-400 font-medium">"Log In"</span> — no
            sign-up needed.
          </p>
        </div>
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
