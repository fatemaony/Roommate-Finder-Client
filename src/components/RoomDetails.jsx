import React, { useContext, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { MdAddIcCall } from "react-icons/md";
import { useLoaderData } from "react-router";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const RoomDetails = () => {
  const details = useLoaderData();
  const { user } = useContext(AuthContext);

  const [likeCount, setLikeCount] = useState(details.likeCount || 0);
  const [showContact, setShowContact] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (!user?.email) {
      toast.error("Please login to like this post.");
      return;
    }

    try {
      const response = await fetch(
        `https://server-side-fatemaony.vercel.app/roommates/like/${details._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail: user.email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setLikeCount(data.likeCount);
        setShowContact(true);
        setLiked(true);
        toast.success("You liked this room!");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Like request failed:", error);
      toast.error("Failed to like, please try again.");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-[90%] mx-auto my-10 p-6 shadow-lg rounded-lg bg-white border border-gray-200">
        <p className="text-lg font-medium text-blue-700 mb-6 text-center md:text-left">
          {likeCount} {likeCount === 1 ? "person is" : "people are"} interested in
        </p>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2">
            <img
              className="w-full h-60 object-cover rounded-md"
              src={details.photo}
              alt="Room"
              loading="lazy"
            />
          </div>

          <div className="w-full md:w-1/2 space-y-3">
            <p className="font-bold text-2xl text-black">
              Location: <span className="font-normal">{details.location}</span>
            </p>
            <p className="text-black">
              <span className="font-semibold">Rent:</span> {details.rent}
            </p>
            <p className="text-black">
              <span className="font-semibold">Room Type:</span> {details.roomType}
            </p>
            <p className="text-black">
              <span className="font-semibold">Lifestyle:</span> {details.lifestyle}
            </p>
            <p className="text-black">
              <span className="font-semibold">Availability:</span> {details.availability}
            </p>
            <p className="text-black">
              <span className="font-semibold">Description:</span> {details.description}
            </p>

            <div className="mt-5">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-5 py-2 rounded-md transition duration-300
                  ${
                    liked
                      ? "bg-secondary text-white hover:bg-secondary"
                      : "text-black border border-gray-400 hover:bg-gray-700 hover:text-white"
                  }
                `}
                disabled={liked}
                aria-label="Like button"
              >
                {liked ? <AiFillLike size={25} /> : <AiOutlineLike size={25} />}
                <span>Like</span>
              </button>

              {showContact && (
                <p className="mt-3 text-sm text-gray-900 flex items-center gap-1">
                  <MdAddIcCall size={18} />
                  <span className="font-semibold">Contact:</span> {details.contact}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
