import axios from "axios";
import Base_Url from "../Constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../Utils/InvitationSlice";
import Invite_Card from "./Invite_Card";

export const Invitations = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request) || [];

  const fetch_Request = async () => {
    try {
      const request_data = await axios.get(
        Base_Url + "/user/Connection/request",
        { withCredentials: true }
      );
      dispatch(addRequest(request_data.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetch_Request();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {requests.length > 0 ? (
        requests.map((rd) => <Invite_Card user={rd} key={rd._id} />)
      ) : (
        <p>No invitations found.</p>
      )}
    </div>
  );
};
