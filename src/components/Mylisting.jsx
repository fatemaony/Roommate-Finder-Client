import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../context/AuthContext";

const MyListings = () => {
  const listings = useLoaderData(); // should be an array of roommate posts
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  // ❗ Corrected filter logic
  const myListings = listings.filter(listing => listing.userEmail === userEmail);

  const handleDelete = (id) => {
    // Implement delete logic here
    console.log("Delete ID:", id);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Roommate Listings</h2>
        <Link to="/findroommate" className="bg-green-500 text-white px-4 py-2 rounded-md">
          Add New Listing
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              
              <th className="py-3 px-4 border-b text-left">Location</th>
              <th className="py-3 px-4 border-b text-left">Rent</th>
              <th className="py-3 px-4 border-b text-left">Room Type</th>
              <th className="py-3 px-4 border-b text-left">Contact</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myListings.length > 0 ? (
              myListings.map((listing) => (
                <tr key={listing._id} className="hover:bg-gray-50">
                  
                  <td className="py-3 px-4 border-b">{listing.location}</td>
                  <td className="py-3 px-4 border-b">${listing.rent}</td>
                  <td className="py-3 px-4 border-b">{listing.roomType}</td>
                  <td className="py-3 px-4 border-b">{listing.contact}</td>
                  <td className="py-3 px-4 border-b flex justify-center space-x-2">
                    <Link
                      to={`/update-listing/${listing._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
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
