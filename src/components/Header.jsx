import React from "react";
import { Link } from "react-router";

const Header =()=>{
  return(
    <div className="navbar bg-base-100 shadow-sm px-10">
  <div className="navbar-start ">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       <Link><li>Home</li></Link>
        <Link><li>Find Roommate</li></Link>
        <Link><li>Browse Listing</li></Link>
        <Link><li>My Listings</li></Link>
      </ul>
    </div>
    <a className="font-extrabold text-2xl">Roomies</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal flex gap-5 font-semibold px-1">
      <Link to={"/"}><li>Home</li></Link>
        <Link to={"/findroommate"}><li>Find Roommate</li></Link>
        <Link><li>Browse Listing</li></Link>
        <Link><li>My Listings</li></Link>
    </ul>
  </div>
  <div className="navbar-end">
    <Link to={"/signin"}><a className="btn">Sign In</a></Link>
  </div>
</div>
  )
};
export default Header ;