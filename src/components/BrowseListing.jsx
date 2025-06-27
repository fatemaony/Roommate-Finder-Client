import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import RoommateCard from "./RoommateCard";
import { motion, AnimatePresence } from "framer-motion";

const BrowseListing = () => {
  const initialRoommates = useLoaderData();
  const [roommates, setRoommates] = useState(initialRoommates);
  const [searchLocation, setSearchLocation] = useState("");
  
  useEffect(() => {
    if (!searchLocation.trim()) {
      setRoommates(initialRoommates);
      return;
    }
    
    const filtered = initialRoommates.filter(roommate => 
      roommate.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    
    setRoommates(filtered);
  }, [searchLocation, initialRoommates]);

  return (
    <div className="w-[90%] mx-auto mt-10 mb-16">
      {/* Hero Section with animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 mb-10 text-white shadow-xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Find Your Perfect Roommate</h1>
        <p className="text-xl text-center opacity-90 max-w-3xl mx-auto">
          Connect with compatible roommates in your desired location and make your living experience amazing.
        </p>
      </motion.div>
      
      {/* Search Section with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 rounded-2xl shadow-lg mb-10 max-w-4xl mx-auto border border-gray-100"
      >
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-grow w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search by Location
            </label>
            <div className="relative">
              <motion.input
                type="text"
                placeholder="Enter city, neighborhood, or address..."
                className="w-full p-4 border border-gray-300 rounded-xl pl-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                whileFocus={{ scale: 1.01 }}
              />
              <svg
                className="absolute left-4 top-4 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-xl transition-all duration-200 shadow-md w-full md:w-auto"
            onClick={() => {}}
          >
            Search
          </motion.button>
        </div>
        
        {/* Search tips with animation */}
        <AnimatePresence>
          {searchLocation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 flex items-center overflow-hidden"
            >
              <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-600">
                {roommates.length} {roommates.length === 1 ? 'roommate' : 'roommates'} found in "<span className="font-medium text-gray-800">"{searchLocation}"</span>"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Roommate Cards Grid with animations */}
      <AnimatePresence>
        {roommates.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {roommates.map((roommate, index) => (
              <motion.div
                key={roommate._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <RoommateCard
                  roommates={roommates}
                  setRoommates={setRoommates}
                  roommate={roommate}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : searchLocation ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl p-10 text-center shadow-md max-w-2xl mx-auto"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No matches found</h3>
            <p className="text-gray-500">
              We couldn't find any roommates in "<span className="font-medium">"{searchLocation}"</span>". Try expanding your search area.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchLocation("")}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Clear search
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="no-roommates"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-10 text-center shadow-md max-w-2xl mx-auto"
          >
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No roommates available</h3>
            <p className="text-gray-500 mb-4">
              There are currently no roommate listings. Check back later or create your own profile to get started.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(37, 99, 235, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 shadow"
            >
              Create Profile
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrowseListing;