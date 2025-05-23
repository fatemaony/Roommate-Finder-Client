import React, { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { MdAddIcCall } from "react-icons/md";
import { useLoaderData } from "react-router";

const RoomDetails = () => {
  const details = useLoaderData();

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(details.likeCount || 0); 

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
      
    }
  };

  return (
    <div className="w-[90%] mx-auto my-10 p-4 shadow rounded-lg bg-white">
    
      <p className="text-lg font-medium text-blue-700 mb-6 text-center md:text-left">
        {likeCount} {likeCount === 1 ? "person is" : "people are"} interested in
      </p>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        
        <div className="w-full md:w-1/2">
          <img
            className="w-full h-60 object-cover rounded-md"
            src={details.photo}
            alt="Room"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-3">
          <p className="font-bold text-2xl text-black">
            Location: <span className="font-normal">{details.location}</span>
          </p>
          <p className="text-black"><span className="font-semibold">Rent:</span> {details.rent}</p>
          <p className="text-black"><span className="font-semibold">Room Type:</span> {details.roomType}</p>
          <p className="text-black"><span className="font-semibold">Lifestyle:</span> {details.lifestyle}</p>
          <p className="text-black"><span className="font-semibold">Availability:</span> {details.availability}</p>

        
          <div className="mt-5">
            <button
              onClick={handleLike}
              
              className={`flex items-center text-black gap-2 px-4 py-2 border rounded-md transition duration-200 ${
                liked ? "bg-blue-100 cursor-not-allowed" : "hover:bg-gray-700"
              }`}
            >
              {liked ? (
                <AiFillLike size={25} className="text-black" />
              ) : (
                <AiOutlineLike size={25} />
              )}
              <span>{liked ? "Liked" : "Like"}</span>
            </button>

         
            {liked && (
              <p className="mt-3 text-sm text-gray-900 flex items-center gap-1">
                <MdAddIcCall size={18} /> 
                <span className="font-semibold">Contact:</span> {details.contact}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
