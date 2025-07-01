import axios from "axios";
import Base_Url from "../Constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Utils/Connections";
import { useEffect } from "react";
import Connection_Card from "./Connection_Card";

const Connections = () => {
  const dispatch = useDispatch();
  const connection_data = useSelector((store) => store.conn_data) || []; 

  const fetch_Connections = async () => {
    try {
      const { data } = await axios.get(Base_Url + "/user/Connections", {
        withCredentials: true,
      });
      dispatch(addConnections(data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetch_Connections();
  }, []);

  const required_data = Array.isArray(connection_data)
    ? connection_data
    : Object.values(connection_data || {});

  if(required_data===0) return<p>No Connections</p>;
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
    {required_data.map((ele) => (
      <Connection_Card key={ele._id} res={ele} />
    ))}
  </div>
  
  );
};

export default Connections;
