import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLoaderData, useNavigate } from "react-router";
import Swal from 'sweetalert2';
import { FiHome, FiDollarSign, FiUser, FiMapPin, FiWifi, FiPhone, FiCalendar, FiImage } from "react-icons/fi";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineSmokingRooms, MdOutlineNoDrinks } from "react-icons/md";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdateListing = (e) => {
    e.preventDefault();
    
    fetch(`https://server-side-fatemaony.vercel.app/roommates/${listing._id}`, {
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
    <div className="px-5 md:px-24 mt-15 py-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Update Your Listing</h2>
            <p className="text-gray-600 mt-2">Make changes to your room listing below</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button 
              onClick={() => navigate(`/roommates/${listing._id}`)} 
              className="btn btn-outline border-gray-300 hover:bg-gray-100"
            >
              Back to Listing
            </button>
          </div>
        </div>
      
        <form onSubmit={handleUpdateListing} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <FiUser className="text-gray-500" /> User Email
                </span>
              </label>
              <input 
                type="email" 
                name="userEmail" 
                className="input input-bordered w-full bg-gray-50" 
                value={formData.userEmail} 
                readOnly 
              />
              <span className="text-xs text-gray-500 mt-1 ml-1">This field cannot be edited</span>
            </div>
            
            {/* User Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <FiUser className="text-gray-500" /> User Name
                </span>
              </label>
              <input 
                type="text" 
                name="userName" 
                className="input input-bordered w-full bg-gray-50" 
                value={formData.userName} 
                readOnly 
              />
              <span className="text-xs text-gray-500 mt-1 ml-1">This field cannot be edited</span>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <FiMapPin className="text-gray-500" /> Location*
                </span>
              </label>
              <input 
                type="text" 
                name="location" 
                className="input input-bordered w-full" 
                placeholder="City, Neighborhood, etc." 
                value={formData.location}
                onChange={handleChange}
                required 
              />
            </div>
            
            {/* Rent Amount */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <FiDollarSign className="text-gray-500" /> Rent Amount*
                </span>
              </label>
              <input 
                type="text" 
                name="rent" 
                className="input input-bordered w-full" 
                placeholder="Rent Amount (e.g. $800/month)" 
                value={formData.rent}
                onChange={handleChange}
                required 
              />
            </div>
            
            {/* Room Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <FiHome className="text-gray-500" /> Room Type
                </span>
              </label>
              <select 
                name="roomType" 
                className="select select-bordered w-full"
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
            </div>
            
            {/* Lifestyle Preferences */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <IoIosPeople className="text-gray-500" /> Lifestyle Preferences
                </span>
              </label>
              <select 
                name="lifestyle" 
                className="select select-bordered w-full"
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
            </div>
            
            {/* Description */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-medium">Description*</span>
              </label>
              <textarea 
                name="description" 
                className="textarea textarea-bordered w-full h-32" 
                placeholder="Describe yourself, your ideal roommate, and the living situation" 
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            {/* Amenities */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <FiWifi className="text-gray-500" /> Amenities
                </span>
              </label>
              <input 
                type="text" 
                name="amenities" 
                className="input input-bordered w-full" 
                placeholder="Wi-Fi, Parking, Laundry, etc." 
                value={formData.amenities}
                onChange={handleChange}
              />
            </div>
            
            {/* Contact Info */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <FiPhone className="text-gray-500" /> Contact Info*
                </span>
              </label>
              <input 
                type="text"
                name="contact" 
                className="input input-bordered w-full" 
                placeholder="Phone, Email, or preferred contact method" 
                value={formData.contact}
                onChange={handleChange}
                required 
              />
            </div>
            
            {/* Availability */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <FiCalendar className="text-gray-500" /> Availability*
                </span>
              </label>
              <select 
                onChange={handleChange} 
                name="availability" 
                className="select select-bordered w-full" 
                required
                value={formData.availability}
              >
                <option value="">Select availability</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            
            {/* Room Picture */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <FiImage className="text-gray-500" /> Room Picture
                </span>
              </label>
              <input 
                type="text" 
                name="photo" 
                className="input input-bordered w-full" 
                placeholder="Photo URL" 
                value={formData.photo}
                onChange={handleChange}
              />
              {formData.photo && (
                <div className="mt-2">
                  <img 
                    src={formData.photo} 
                    alt="Current room preview" 
                    className="h-24 object-cover rounded-md border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end mt-10">
            <button 
              type="submit" 
              className="btn btn-primary w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
            >
              Update Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateListing;