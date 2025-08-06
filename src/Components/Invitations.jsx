import axios from "axios";
import Base_Url from "../Constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../Utils/InvitationSlice";
import Invite_Card from "./Invite_Card";
import CardShimmer from "./CardShimmer";

export const Invitations = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request) || [];

  const [loading, setLoading] = useState(true);
  const [showNoData, setShowNoData] = useState(false);

  const fetch_Request = async () => {
    try {
      const request_data = await axios.get(
        Base_Url + "/user/Connection/request",
        { withCredentials: true }
      );
      dispatch(addRequest(request_data.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch_Request();

    const timeout = setTimeout(() => {
      setShowNoData(true);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {Array(14)
          .fill(0)
          .map((_, i) => (
            <CardShimmer key={i} />
          ))}
      </div>
    );
  }

  if (!loading && requests.length === 0 && showNoData) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-xl">
        No Invitations Found
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {requests.map((rd) => (
        <Invite_Card user={rd} key={rd._id} />
      ))}
    </div>
  );
};
