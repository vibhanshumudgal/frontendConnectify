import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser, removeUser } from "../Utils/UserSilce";
import Base_Url from "../Constant";

const Body = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(Base_Url + "/profile/view", {
          withCredentials: true,
        });
        if(!res) throw new Error("plz log in");
        
        dispatch(addUser(res.data));
      } catch (err) {
        dispatch(removeUser());
        navigate("/login"); 
      }
    };

    if (!user || Object.keys(user).length === 0) {
      checkAuth();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-15">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
