import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const RoommateCard = ({ roommate, roommates, setRoommates }) => {
  const { _id, photo, location, availability, rent } = roommate;
  const navigate = useNavigate();

  const {user}=useContext(AuthContext)

    const handleSeeMore = () => {
    if (user) {
      navigate(`/roommates/${_id}`);

    } else {
      Swal.fire({
              title: "Authentication Required",
              text: "Please sign in to post a roommate listing",
              icon: "warning",
              confirmButtonText: "Sign In"
            }).then(() => {
              navigate("/signin");
            })
    }
    return;
  };

  return (
    <div className="card bg-base-100 w-full mx-auto shadow-sm">
      <figure>
        <img className="w-full h-44" src={photo} alt="Roommate" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Location: {location}</h2>
        <p>Available from: {availability}</p>
        <p>Rent Amount: ${rent}</p>
        <div className="card-actions justify-end">
          
          <button onClick={handleSeeMore} className="btn btn-primary">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoommateCard;