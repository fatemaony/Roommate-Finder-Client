import React, { useState } from "react";
import { useLoaderData } from "react-router";
import RoommateCard from "./RoommateCard";
const BrowseListing =()=>{

 const initialRoommate = useLoaderData();
 const [roommates, setRoommates]=useState(initialRoommate)
 return(
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[90%] mx-auto mt-20 ">
    {
      roommates.map(roommate=><RoommateCard 
        key={roommate._id}
        roommates={roommates} 
        setRoommates={setRoommates}
        roommate={roommate} />)

    }

  </div>
 )
};
export default BrowseListing;