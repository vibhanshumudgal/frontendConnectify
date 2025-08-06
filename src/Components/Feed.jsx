import axios from "axios";
import Base_Url from "../Constant";
import { useEffect, useState } from "react";
import FeedCard from "./FeedCard";
import CardShimmer from "./CardShimmer";

const Feed = () => {
  const [feed_data, setfeed_data] = useState([]);
  const [loading, setLoading] = useState(true); // loader state
  const [showNoData, setShowNoData] = useState(false); // delay "no data" message

  const handelClick = (id) => {
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
    } finally {
      setLoading(false); // stop shimmer after API call
    }
  };

  useEffect(() => {
    feed();
    const timeout = setTimeout(() => {
      setShowNoData(true); // trigger after 6 seconds
    }, 6000);

    return () => clearTimeout(timeout); // cleanup
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-4 p-4">
        {Array(40)
          .fill(0)
          .map((_, i) => (
            <CardShimmer key={i} />
          ))}
      </div>
    );
  }

  if (!loading && feed_data.length === 0 && showNoData) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-xl">
        No Data Found
      </div>
    );
  }

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
