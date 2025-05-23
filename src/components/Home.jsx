import React, { useState } from "react";
import HowWorks from "./HowWorks";
import Banner from "./Banner";
import RoommatePost from "./RoommatePost";
 const Home =()=>{

  
  return(
    <div>
      <Banner/>
    <div className="m-20">
  
      
       <RoommatePost/>
      
    </div>
    <HowWorks/>
    </div>
  )
 };
 export default Home;