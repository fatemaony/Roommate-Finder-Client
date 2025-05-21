import React from "react";
import HowWorks from "./HowWorks";
import BrowseListing from "./BrowseListing";
 const Home =()=>{
  return(
    <div>
    <div>
      <p className="text-center text-4xl font-bold text-gray-700 mt-10">
        Featured Roommates 
      </p>
      <BrowseListing/>
    </div>
    <HowWorks/>
    </div>
  )
 };
 export default Home;