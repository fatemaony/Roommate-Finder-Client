import React, { useState } from "react";
import { useLoaderData } from "react-router";
import RoommateCard from "./RoommateCard";

const RoommatePost = () => {
  const initialRoommate = useLoaderData();
  const [roommates, setRoommates] = useState(initialRoommate);
  
  
  const availableRoommates = roommates.filter(roommate => roommate.availability === "Yes").slice(0, 6);
  
  return (
    <div className="container w-full mx-auto">
      <h2 className="text-center text-2xl lg:text-4xl font-bold text-secondary my-8">
        Available Roommates
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto ">
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