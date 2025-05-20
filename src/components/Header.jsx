import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          title: "Logged Out Successfully",
          icon: "success",
          draggable: true
        });
        navigate("/");
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/findroommate">Find Roommate</Link></li>
            <li><Link to="/listings">Browse Listing</Link></li>
            {user && <li><Link to="/mylistings">My Listings</Link></li>}
          </ul>
        </div>
        <Link to="/" className="font-extrabold text-2xl">Roomies</Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal flex gap-5 font-semibold px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/findroommate">Find Roommate</Link></li>
          <li><Link to="/listings">Browse Listing</Link></li>
          {user && <li><Link to="/mylistings">My Listings</Link></li>}
        </ul>
      </div>
      
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 cursor-pointer">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || "User"} />
                  ) : (
                    <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10">
                <li className="font-semibold">
                  <span>{user.displayName || user.email}</span>
                </li>
                <li>
                  <Link to="/profile">My Profile</Link>
                </li>
                <li onClick={handleLogout}>
                  <a>Sign Out</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link to="/signin">
            <button className="btn">Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;