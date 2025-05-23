import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLoaderData, useNavigate } from "react-router";
import Swal from 'sweetalert2';

const UpdateListing = () => {
  const listing = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  
  const [formData, setFormData] = useState({
    userEmail: user?.email || "",
    userName: user?.displayName || "",
    location: listing?.location || "",
    rent: listing?.rent || "",
    roomType: listing?.roomType || "Single",
    lifestyle: listing?.lifestyle || "No Preference",
    description: listing?.details || listing?.description || "",
    amenities: listing?.amenities || "",
    contact: listing?.contact || "",
    availability: listing?.availability || "",
    photo: listing?.photo || ""
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdateListing = (e) => {
    e.preventDefault();
    
    // Send update to db
    fetch(`http://localhost:3000/roommates/${listing._id}`, {
      method: "PUT",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.modifiedCount) {
        Swal.fire({
          title: 'Success!',
          text: 'Listing updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate(`/roommates/${listing._id}`);
        });
      }
    })
    .catch(error => {
      console.error('Error updating listing:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update listing',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  };

  

  return (
    <div className="px-5 md:px-24 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-900">Update Listing</h2>
      
      </div>
      
      <form onSubmit={handleUpdateListing}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">User Email</label>
            <input 
              type="email" 
              name="userEmail" 
              className="input input-bordered w-full bg-gray-100" 
              value={formData.userEmail} 
              readOnly 
            />
            <span className="text-xs text-gray-500 mt-1">This field cannot be edited</span>
          </fieldset>
          
          
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">User Name </label>
            <input 
              type="text" 
              name="userName" 
              className="input input-bordered w-full bg-gray-100" 
              value={formData.userName} 
              readOnly 
            />
            <span className="text-xs text-gray-500 mt-1">This field cannot be edited</span>
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Location*</label>
            <input 
              type="text" 
              name="location" 
              className="input input-bordered w-full" 
              placeholder="City, Neighborhood, etc." 
              value={formData.location}
              onChange={handleChange}
              required 
            />
          </fieldset>
          
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Rent Amount*</label>
            <input 
              type="text" 
              name="rent" 
              className="input input-bordered w-full" 
              placeholder="Rent Amount (e.g. $800/month)" 
              value={formData.rent}
              onChange={handleChange}
              required 
            />
          </fieldset>
          
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Room Type</label>
            <select 
              name="roomType" 
              className="select bg-white input-bordered w-full"
              value={formData.roomType}
              onChange={handleChange}
            >
              <option value="Single">Single</option>
              <option value="Shared">Shared</option>
              <option value="Studio">Studio</option>
              <option value="1-Bedroom">1-Bedroom</option>
              <option value="2-Bedroom">2-Bedroom</option>
              <option value="Other">Other</option>
            </select>
          </fieldset>
          
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Lifestyle Preferences</label>
            <select 
              name="lifestyle" 
              className="select bg-white input-bordered w-full"
              value={formData.lifestyle}
              onChange={handleChange}
            >
              <option value="No Preference">No Preference</option>
              <option value="Pet Friendly">Pet Friendly</option>
              <option value="No Smoking">No Smoking</option>
              <option value="Quiet">Quiet</option>
              <option value="Social">Social</option>
              <option value="Night Owl">Night Owl</option>
              <option value="Early Bird">Early Bird</option>
            </select>
          </fieldset>
          
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 md:col-span-2">
            <label className="label font-medium">Description*</label>
            <textarea 
              name="description" 
              className="textarea textarea-bordered w-full h-24" 
              placeholder="Describe yourself, your ideal roommate, and the living situation" 
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </fieldset>
          
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Amenities</label>
            <input 
              type="text" 
              name="amenities" 
              className="input input-bordered w-full" 
              placeholder="Wi-Fi, Parking, Laundry, etc." 
              value={formData.amenities}
              onChange={handleChange}
            />
          </fieldset>
          
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Contact Info*</label>
            <input 
              type="text"
              name="contact" 
              className="input input-bordered w-full" 
              placeholder="Phone, Email, or preferred contact method" 
              value={formData.contact}
              onChange={handleChange}
              required 
            />
          </fieldset>
          
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Availability*</label>
            <input 
              type="text" 
              name="availability" 
              className="input input-bordered w-full" 
              placeholder="When the room is available (e.g. June 1st, 2025)" 
              value={formData.availability}
              onChange={handleChange}
              required 
            />
          </fieldset>
          
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-medium">Room Picture</label>
            <input 
              type="text" 
              name="photo" 
              className="input input-bordered w-full" 
              placeholder="photo URL" 
              value={formData.photo}
              onChange={handleChange}
            />
          </fieldset>

          
        </div>
        <button type="submit" className="btn w-full my-10 bg-green-900 text-white">
            Update Post
          </button>
      </form>
    </div>
  );
};

export default UpdateListing;