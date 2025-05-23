import React, { useState } from "react";
import { useLoaderData } from "react-router";
import RoommateCard from "./RoommateCard";

const RoommatePost = () => {
  const initialRoommate = useLoaderData();
  const [roommates, setRoommates] = useState(initialRoommate);
  
  // Filter roommates with availability "yes" and limit to 6
  const availableRoommates = roommates.filter(roommate => roommate.availability === "Yes").slice(0, 6);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-2xl lg:text-4xl font-bold text-black mb-8">
        Available Roommates
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] mx-auto">
        {
          availableRoommates.map(roommate => 
            <RoommateCard 
              key={roommate._id} 
              roommates={roommates} 
              setRoommates={setRoommates}
              roommate={roommate} 
            />
          )
        }
      </div>
      {availableRoommates.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-500 text-lg">No available roommates found.</p>
        </div>
      )}
    </div>
  );
};

export default RoommatePost;