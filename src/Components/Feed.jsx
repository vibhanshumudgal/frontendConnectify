import axios from "axios";
import Base_Url from "../Constant";
import { useEffect, useState } from "react";
import FeedCard from "./FeedCard";

const Feed = () => {
  const [feed_data, setfeed_data] = useState([]);
  const handelClick = (id) => {
    //lifting the state up
    const new_feed_data = feed_data.filter((user) => user?._id !== id);
    setfeed_data(new_feed_data);
  };
  const feed = async () => {
    try {
      const res = await axios.get(Base_Url + "/user/feed", {
        withCredentials: true,
      });
      setfeed_data(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    feed();
  }, []);

  if (!feed_data?.length) return <p>No Remain feed</p>;

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {feed_data.map((user) => (
        <FeedCard
          key={user._id}
          user={user}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          onAction={handelClick}
        />
      ))}
    </div>
  );
};

export default Feed;
