import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { FcHome } from "react-icons/fc";
import Swal from "sweetalert2";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const isDarkTheme = savedTheme === 'dark';
    setIsDark(isDarkTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
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
  
  const handleFindRoommateClick = (e) => {
    if (!user) {
      e.preventDefault();
      Swal.fire({
        title: "Authentication Required",
        text: "Please sign in to post a roommate listing",
        icon: "warning",
        confirmButtonText: "Sign In"
      }).then(() => {
        navigate("/signin");
      });
      return;
    }
  };
  
  return (
    <div className="navbar bg-base-200 shadow-sm px-10 fixed top-0 left-0 right-0 z-50">
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
            <li className="text-secondary hover:underline"><Link to="/">Home</Link></li>
            <li className="text-secondary hover:underline"><Link to="/contactus">Contact Us</Link></li>
            <li className="text-secondary hover:underline">
              <Link to="/findroommate" onClick={handleFindRoommateClick}>Find Roommate</Link>
            </li>           
            <li className="text-secondary hover:underline"><Link to="/browselisting">Browse Listing</Link></li>
            
            
            {user && <li className="text-secondary hover:underline"><Link to="/mylisting">My Listings</Link></li>}
          </ul>
        </div>
        <Link to="/" className="font-bold flex items-center gap-1 text-secondary text-2xl"> <FcHome size={25} />Roomies</Link>
      </div>
      
      <div className="navbar-center hidden lg:flex lg:items-center">
        <ul className="menu menu-horizontal flex gap-1 font-semibold px-1">
          <li className="text-secondary hover:underline"><Link to="/">Home</Link></li>
          
          
          <li className="text-secondary hover:underline">
            <Link to="/findroommate" onClick={handleFindRoommateClick}>Find Roommate</Link>
          </li>
          
          <li className="text-secondary hover:underline"><Link to="/browselisting">Browse Listing</Link></li>
          <li className="text-secondary hover:underline"><Link to="/contactus">Contact Us</Link></li>

            
          {user && <li className="text-secondary hover:underline"><Link to="/mylisting">My Listings</Link></li>}
        </ul>
      </div>
      
      <div className="navbar-end">
        <div className="flex items-center gap-3">
     
         
          
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar relative group">
                <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2 cursor-pointer">
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
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-24 left-1/2 transform -translate-x-1/2 text-black text-xs rounded py-1 px-2 whitespace-nowrap">
                  {user.displayName || user.email}
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10">
                <li className="font-semibold">
                  <span>{user.displayName || user.email}</span>
                </li>
                <li>
                  <Link to="/profile">My Profile</Link>
                </li>
                <li className="btn w-full btn-secondary mt-2 p-2" onClick={handleLogout}>
                  Sign Out
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">
              <button className="btn btn-outline btn-secondary">Sign In</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;