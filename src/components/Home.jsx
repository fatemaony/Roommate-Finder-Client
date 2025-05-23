import React, { useState } from "react";
import HowWorks from "./HowWorks";
import Banner from "./Banner";
import RoommatePost from "./RoommatePost";
import FAQ from "./Faq";
 const Home =()=>{

  
  return(
    <div>
      <Banner/>
      <RoommatePost/>
      <HowWorks/>
      <FAQ/>
    </div>
  )
 };
 export default Home;