import React, { useContext, useState } from "react";
import { AiOutlineLike, AiFillLike, AiOutlineHome, AiOutlineCalendar, AiOutlineDollar } from "react-icons/ai";
import { MdAddIcCall, MdLocationOn, MdOutlineBathtub, MdOutlineSingleBed, MdOutlinePeople } from "react-icons/md";
import { BiArea, BiWalk } from "react-icons/bi";
import { useLoaderData } from "react-router";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import RoommatePreferences from "../components/RoommatePreferences";

const RoomDetails = () => {
  const details = useLoaderData();
  const { user } = useContext(AuthContext);

  const [likeCount, setLikeCount] = useState(details.likeCount || 0);
  const [showContact, setShowContact] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

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
        toast.success("You liked this room! Contact info is now visible.");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Like request failed:", error);
      toast.error("Failed to like, please try again.");
    }
  };

  const togglePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-6xl mx-auto mt-25 mb-16 lg:px-15 sm:px-6">
        {/* Header with back button and title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Room Available in {details.location}</h1>
          <p className="mt-2 text-lg text-gray-600">
            {details.roomType} • {details.availability}
          </p>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image gallery */}
          <div className="lg:w-2/3">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                className="w-full h-96 object-cover"
                src={details.photo}
                alt="Room"
                loading="lazy"
              />
            </div>
            
            {/* Additional images could go here in a carousel */}
            
            {/* Description section */}
            <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">About This Room</h2>
              <p className="text-gray-700 leading-relaxed">{details.description}</p>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <button 
                  onClick={togglePreferences}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {showPreferences ? 'Hide' : 'Show'} Roommate Preferences →
                </button>
                
                {showPreferences && (
                  <div className="mt-4">
                    <RoommatePreferences preferences={details.preferences} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar with details and action buttons */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-6">
              {/* Price and like count */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-2xl font-bold text-gray-900">${details.rent}/mo</p>
                  <p className="text-gray-500 text-sm">+ utilities</p>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  {liked ? <AiFillLike className="text-blue-500" size={20} /> : <AiOutlineLike size={20} />}
                  <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
                </div>
              </div>

              {/* Key features */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <MdLocationOn className="text-gray-500" size={20} />
                  <span className="text-gray-700">{details.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <AiOutlineHome className="text-gray-500" size={20} />
                  <span className="text-gray-700">{details.roomType}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdOutlineSingleBed className="text-gray-500" size={20} />
                  <span className="text-gray-700">{details.bedrooms || '1'} bedroom(s)</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdOutlineBathtub className="text-gray-500" size={20} />
                  <span className="text-gray-700">{details.bathrooms || '1'} bathroom(s)</span>
                </div>
                <div className="flex items-center gap-3">
                  <BiArea className="text-gray-500" size={20} />
                  <span className="text-gray-700">{details.sqft || 'N/A'} sqft</span>
                </div>
                <div className="flex items-center gap-3">
                  <BiWalk className="text-gray-500" size={20} />
                  <span className="text-gray-700">{details.lifestyle}</span>
                </div>
                <div className="flex items-center gap-3">
                  <AiOutlineCalendar className="text-gray-500" size={20} />
                  <span className="text-gray-700">Available {details.availability}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleLike}
                  className={`w-full flex justify-center items-center gap-2 px-5 py-3 rounded-lg transition duration-300
                    ${
                      liked
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }
                  `}
                  disabled={liked}
                  aria-label={liked ? "Already liked" : "Like this room"}
                >
                  {liked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
                  <span>{liked ? "You liked this!" : "I'm Interested"}</span>
                </button>

                {showContact && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                      <MdAddIcCall size={18} />
                      Contact Information
                    </h3>
                    <p className="text-gray-800">{details.contact}</p>
                    <p className="text-sm text-gray-600 mt-1">Please mention you found this on RoomFinder</p>
                  </div>
                )}

                <button className="w-full mt-4 flex justify-center items-center gap-2 px-5 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-300">
                  <AiOutlineDollar size={20} />
                  <span>Request Tour</span>
                </button>
              </div>
            </div>

            {/* Safety tips */}
            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-medium text-yellow-800 mb-2">Safety Tips</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Meet in public places for the first time</li>
                <li>• Don't share financial information upfront</li>
                <li>• Inspect the room before making payments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;