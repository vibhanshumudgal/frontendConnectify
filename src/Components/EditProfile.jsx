import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Base_Url from "../Constant";
import { addUser, removeUser } from "../Utils/UserSilce";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
 
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);

  const handleClick = async () => {
  
    const updated_data = await axios.patch(
      Base_Url + "/profile/edit",
      { name, age, about, gender },
      { withCredentials: true }
    );
   
    dispatch(removeUser());
    dispatch(addUser(updated_data.data));
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Age</label>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">About</label>
        <input
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gender</label>
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleClick}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
      >
        Update Profile
      </button>
    </div>
  );
};

export default EditProfile;
