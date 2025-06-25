import React, { useContext, useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

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
          title: "Post roommate listing successfully!",
          icon: "success",
          draggable: true
        });
      }
    });
  
  }

  return(
    <div className="px-5 md:px-24 text-black">
      <div className="p-5 md:p-12 text-center space-y-4">
        <h1 className="text-xl md:text-3xl font-bold">Looking for a roommate!</h1>
        <p className="text-gray-600">Post your details to find the perfect roommate match</p>
      </div>

      <form onSubmit={handleFindRoommate}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <fieldset className="fieldset text-gray-500 bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">User Email</label>
            <input 
              type="email" 
              name="userEmail" 
              className="input input-bordered w-full bg-gray-200" 
              value={user?.email || ""} 
              readOnly 
            />
            <span className="text-xs text-gray-500 mt-1">This field cannot be edited</span>
          </fieldset>
          
          
          <fieldset className="fieldset text-gray-500 bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">User Name </label>
            <input 
              type="text" 
              name="userName" 
              className="input input-bordered w-full bg-gray-200" 
              value={user?.displayName || ""} 
              readOnly 
            />
            <span className="text-xs text-gray-500 mt-1">This field cannot be edited</span>
          </fieldset>

          <fieldset className="fieldset text-gray-500 bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Location*</label>
            <input 
              type="text" 
              name="location" 
              className="input input-bordered w-full" 
              placeholder="City, Neighborhood, etc." 
              required 
            />
          </fieldset>
          
          <fieldset className="fieldset text-gray-500 bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Rent Amount*</label>
            <input 
              type="text" 
              name="rent" 
              className="input input-bordered w-full" 
              placeholder="Rent Amount (e.g. $800/month)" 
              required 
            />
          </fieldset>
          
          <fieldset className="fieldset text-gray-500 bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Room Type</label>
            <select name="roomType" className="select bg-white input-bordered w-full">
              <option value="Single">Single</option>
              <option value="Shared">Shared</option>
              <option value="Studio">Studio</option>
              <option value="1-Bedroom">1-Bedroom</option>
              <option value="2-Bedroom">2-Bedroom</option>
              <option value="Other">Other</option>
            </select>
          </fieldset>
          
          <fieldset className="fieldset text-gray-500 bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Lifestyle Preferences</label>
            <select name="lifestyle" className="select bg-white input-bordered w-full">
              <option value="No Preference">No Preference</option>
              <option value="Pet Friendly">Pet Friendly</option>
              <option value="No Smoking">No Smoking</option>
              <option value="Quiet">Quiet</option>
              <option value="Social">Social</option>
              <option value="Night Owl">Night Owl</option>
              <option value="Early Bird">Early Bird</option>
            </select>
          </fieldset>
          
          <fieldset className="fieldset text-gray-500 bg-base-200 border-base-300 rounded-box border p-4 md:col-span-2">
            <label className="label font-medium">Description*</label>
            <textarea 
              name="description" 
              className="textarea textarea-bordered w-full h-24" 
              placeholder="Describe yourself, your ideal roommate, and the living situation" 
              required
            ></textarea>
          </fieldset>
          
          <fieldset className="fieldset text-gray-500 bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Amenities</label>
            <input 
              type="text" 
              name="amenities" 
              className="input input-bordered w-full" 
              placeholder="Wi-Fi, Parking, Laundry, etc." 
            />
          </fieldset>
          
          <fieldset className="fieldset text-gray-500 bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Contact Info*</label>
            <input 
              type="text"
              name="contact" 
              className="input input-bordered w-full" 
              placeholder="Phone, Email, or preferred contact method" 
              required 
            />
          </fieldset>
          
          <fieldset className="fieldset bg-base-200 text-gray-500 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Availability*</label>
            <select name="availability" className="select bg-white input-bordered w-full" required>
              <option value="">Select availability</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </fieldset>
          <fieldset className="fieldset text-gray-500 bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Room Picture</label>
            <input 
              type="text" 
              name="photo" 
              className="input input-bordered w-full" 
              placeholder="photo URL" 
            />
          </fieldset>
          
        </div>

        <button 
          type="submit" 
          className="btn w-full my-6 bg-black text-white"
        >
           Post Roommate Listing
        </button>
      </form>
    </div>
  );
};

export default FindRoomMate;