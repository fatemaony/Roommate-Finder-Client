import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from 'sweetalert2';

const MyListings = () => {
  const listings = useLoaderData(); 
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const userEmail = user?.email;
  

  const [currentListings, setCurrentListings] = useState(listings);
  const [isDeleting, setIsDeleting] = useState(null);
  const myListings = currentListings.filter(listing => listing.userEmail === userEmail);

  const handleDelete = async (listingId) => {
    
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });
    
    if (!result.isConfirmed) {
      return;
    }

    setIsDeleting(listingId);

    try {
      const response = await fetch(`https://roommate-server-kappa.vercel.app/roommates/${listingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const deleteResult = await response.json();

      if (response.ok && deleteResult.success) {
        
        setCurrentListings(prevListings => 
          prevListings.filter(listing => listing._id !== listingId)
        );
        
       
        Swal.fire({
          title: 'Deleted!',
          text: 'Your listing has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#3085d6'
        });
      } else {
        
        Swal.fire({
          title: 'Error!',
          text: deleteResult.message || 'Failed to delete listing. Please try again.',
          icon: 'error',
          confirmButtonColor: '#3085d6'  
        });
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while deleting the listing. Please try again.',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Roommate Listings</h2>
        <Link to="/findroommate" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
          Add New Listing
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-black border-b text-left">Location</th>
              <th className="py-3 px-4  text-black border-b text-left">Rent</th>
              <th className="py-3 px-4  text-black border-b text-left">Room Type</th>
              <th className="py-3 px-4  text-black border-b text-left">Contact</th>
              <th className="py-3 px-4  text-black border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myListings.length > 0 ? (
              myListings.map((listing) => (
                <tr key={listing._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4  text-black border-b">{listing.location}</td>
                  <td className="py-3 px-4  text-black border-b">${listing.rent}</td>
                  <td className="py-3 px-4  text-black border-b">{listing.roomType}</td>
                  <td className="py-3 px-4  text-black border-b">{listing.contact}</td>
                  <td className="py-3 px-4  text-black border-b flex justify-center space-x-2">
                    <Link
                      to={`/update/${listing._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      disabled={isDeleting === listing._id}
                      className={`px-3 py-1 rounded text-white transition-colors ${
                        isDeleting === listing._id 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
                    >
                      {isDeleting === listing._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  You have no roommate listings.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyListings;