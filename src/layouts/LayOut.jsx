import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Loading from "../components/Loading";
const LayOut =()=>{
  return(
    <div>
      <Header/>
      <Loading/>
      <Outlet/>
      <Footer/>
    </div>
  )
};
export default LayOut;