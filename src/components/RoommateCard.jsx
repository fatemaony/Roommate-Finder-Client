import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const RoommateCard = ({ roommate, roommates, setRoommates }) => {
  const { _id, photo, location, availability, rent } = roommate;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handleSeeMore = () => {
    if (user) {
      navigate(`/roommates/${_id}`);
    } else {
      Swal.fire({
        title: "Authentication Required",
        text: "Please sign in to post a roommate listing",
        icon: "warning",
        confirmButtonText: "Sign In",
      }).then(() => {
        navigate("/signin");
      });
    }
    return;
  };

  return (
    <motion.div
      
      className="card bg-base-100 w-full max-w-md mx-auto shadow-md rounded-lg overflow-hidden border border-gray-200"
    >
      <figure className="overflow-hidden h-48">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover rounded-t-lg"
          src={photo}
          alt="Roommate"
        />
      </figure>

      <div className="card-body p-6">
        <h2 className="card-title text-secondary gap-2 hover:underline text-2xl font-semibold flex items-center">
          <FaMapMarkerAlt className="text-secondary" /> {location}
        </h2>

        <p className="flex items-center gap-2 text-gray-700">
          <FaCalendarAlt className="text-green-500" /> <span className="font-bold">Availability:</span> {availability}
        </p>

        <p className="flex items-center gap-2 text-gray-700 mb-4">
          <FaMoneyBillWave className="text-yellow-500" /> <span className="font-bold">Rent:</span> ${rent}
        </p>

        <div className="card-actions justify-end">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSeeMore}
            className="btn btn-secondary btn-sm flex items-center gap-2  transition-colors duration-300"
          >
            <FaInfoCircle /> View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default RoommateCard;
