import axios from "axios";
import Base_Url from "../Constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Utils/Connections";
import { useEffect, useState } from "react";
import Connection_Card from "./Connection_Card";
import Connection_Card_Shimmer from "./Connection_Card_Shimmer";

const Connections = () => {
  const dispatch = useDispatch();
  const connection_data = useSelector((store) => store.conn_data) || [];

  const [loading, setLoading] = useState(true);
  const [showNoData, setShowNoData] = useState(false);

  const fetch_Connections = async () => {
    try {
      const { data } = await axios.get(Base_Url + "/user/Connections", {
        withCredentials: true,
      });
      dispatch(addConnections(data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch_Connections();
    const timeout = setTimeout(() => {
      setShowNoData(true);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  const required_data = Array.isArray(connection_data)
    ? connection_data
    : Object.values(connection_data || {});

  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {Array(14)
          .fill(0)
          .map((_, i) => (
            <Connection_Card_Shimmer key={i} />
          ))}
      </div>
    );
  }

  if (!loading && required_data.length === 0 && showNoData) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-xl">
        No Connections Found
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {required_data.map((ele) => (
        <Connection_Card key={ele._id} res={ele} />
      ))}
    </div>
  );
};

export default Connections;
