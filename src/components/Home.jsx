import React, { useState } from "react";
import HowWorks from "./HowWorks";
import Banner from "./Banner";
import RoommatePost from "./RoommatePost";
import FAQ from "./Faq";
import About from "./About";
import Reviews from "./Reviews";
 const Home =()=>{

  
  return(
    <div className="mt-15">
      <Banner/>
      <RoommatePost/>
      <About/>
      <Reviews/>
    </div>
  )
 };
 export default Home;