import React, { useContext, useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { FaHome, FaUserFriends, FaMoneyBillWave, FaBed, FaHeart, FaInfoCircle, FaWifi, FaPhone, FaCalendarCheck, FaCamera } from "react-icons/fa";

const FindRoomMate = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const authCheckPerformed = useRef(false);

  const handleFindRoommate = (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const newRoommate = Object.fromEntries(formData.entries());
    console.log(newRoommate);

    // send data to the server
    fetch('https://server-side-fatemaony.vercel.app/roommates', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newRoommate)
    })
    .then(res => res.json())
    .then(data => {
      if (data.insertedId) {
        console.log(data);
       
        Swal.fire({
          title: "Posted Successfully!",
          text: "Your roommate listing has been posted successfully.",
          icon: "success",
          confirmButtonColor: "#000",
          showConfirmButton: true,
          timer: 3000
        });
      }
    });
  }

  return(
    <div className="px-5 md:px-24 mt-15 text-black bg-[#FFF8E1] min-h-screen py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">Find Your Perfect Roommate</h1>
          <p className="text-gray-600 text-lg">Fill out the form below to connect with potential roommates</p>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>

        <form onSubmit={handleFindRoommate} className="bg-white rounded-xl shadow-lg p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* User Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaUserFriends className="text-gray-600" /> User Email
                </span>
              </label>
              <input 
                type="email" 
                name="userEmail" 
                className="input input-bordered w-full bg-gray-100" 
                value={user?.email || ""} 
                readOnly 
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">This field cannot be edited</span>
              </label>
            </div>
            
            {/* User Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaUserFriends className="text-gray-600" /> User Name
                </span>
              </label>
              <input 
                type="text" 
                name="userName" 
                className="input input-bordered w-full bg-gray-100" 
                value={user?.displayName || ""} 
                readOnly 
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">This field cannot be edited</span>
              </label>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaHome className="text-gray-600" /> Location*
                </span>
              </label>
              <input 
                type="text" 
                name="location" 
                className="input input-bordered w-full focus:ring-2 focus:ring-black" 
                placeholder="City, Neighborhood, etc." 
                required 
              />
            </div>
            
            {/* Rent Amount */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaMoneyBillWave className="text-gray-600" /> Rent Amount*
                </span>
              </label>
              <input 
                type="text" 
                name="rent" 
                className="input input-bordered w-full focus:ring-2 focus:ring-black" 
                placeholder="Rent Amount (e.g. $800/month)" 
                required 
              />
            </div>
            
            {/* Room Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaBed className="text-gray-600" /> Room Type
                </span>
              </label>
              <select name="roomType" className="select select-bordered w-full focus:ring-2 focus:ring-black">
                <option value="Single">Single</option>
                <option value="Shared">Shared</option>
                <option value="Studio">Studio</option>
                <option value="1-Bedroom">1-Bedroom</option>
                <option value="2-Bedroom">2-Bedroom</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            {/* Lifestyle Preferences */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaHeart className="text-gray-600" /> Lifestyle Preferences
                </span>
              </label>
              <select name="lifestyle" className="select select-bordered w-full focus:ring-2 focus:ring-black">
                <option value="No Preference">No Preference</option>
                <option value="Pet Friendly">Pet Friendly</option>
                <option value="No Smoking">No Smoking</option>
                <option value="Quiet">Quiet</option>
                <option value="Social">Social</option>
                <option value="Night Owl">Night Owl</option>
                <option value="Early Bird">Early Bird</option>
              </select>
            </div>
            
            {/* Description */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaInfoCircle className="text-gray-600" /> Description*
                </span>
              </label>
              <textarea 
                name="description" 
                className="textarea textarea-bordered w-full h-32 focus:ring-2 focus:ring-black" 
                placeholder="Describe yourself, your ideal roommate, and the living situation" 
                required
              ></textarea>
            </div>
            
            {/* Amenities */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaWifi className="text-gray-600" /> Amenities
                </span>
              </label>
              <input 
                type="text" 
                name="amenities" 
                className="input input-bordered w-full focus:ring-2 focus:ring-black" 
                placeholder="Wi-Fi, Parking, Laundry, etc." 
              />
            </div>
            
            {/* Contact Info */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaPhone className="text-gray-600" /> Contact Info*
                </span>
              </label>
              <input 
                type="text"
                name="contact" 
                className="input input-bordered w-full focus:ring-2 focus:ring-black" 
                placeholder="Phone, Email, or preferred contact method" 
                required 
              />
            </div>
            
            {/* Availability */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaCalendarCheck className="text-gray-600" /> Availability*
                </span>
              </label>
              <select name="availability" className="select select-bordered w-full focus:ring-2 focus:ring-black" required>
                <option value="">Select availability</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Room Picture */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaCamera className="text-gray-600" /> Room Picture
                </span>
              </label>
              <input 
                type="text" 
                name="photo" 
                className="input input-bordered w-full focus:ring-2 focus:ring-black" 
                placeholder="Photo URL" 
              />
            </div>
          </div>

          <div className="mt-10 text-center">
            <button 
              type="submit" 
              className="btn btn-wide bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Post Roommate Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindRoomMate;