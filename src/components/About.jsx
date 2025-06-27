import React from "react";
import { motion } from "framer-motion";
import { Users, Mail, Locate, MessageCircle } from "lucide-react";
import { FaUserFriends, FaSearchLocation } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

const About = () => {
  return (
    <section className=" py-16 px-4 sm:px-6 lg:px-15">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-secondary mb-6">
          About Roomies
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          RoomieConnect is your ultimate solution for finding the perfect roommate. 
          Whether you need to post a listing, find someone to share an apartment, or just want to connect 
          with like-minded housemates, we’ve got you covered!
        </p>
      </motion.div>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        <Fade cascade damping={0.1} direction="up">
          <div className="bg-white hover:shadow-blue-400 shadow-md rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
            <FaUserFriends className="mx-auto text-secondary" size={40} />
            <h3 className="text-xl font-semibold mt-4 text-gray-800">Post & Connect</h3>
            <p className="text-gray-600 text-sm mt-2">
              Create a listing to find roommates or join someone else's listing to team up.
            </p>
          </div>

          <div className="bg-white hover:shadow-blue-400 shadow-md rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
            <FaSearchLocation className="mx-auto text-secondary" size={40} />
            <h3 className="text-xl font-semibold mt-4 text-gray-800">Location-Based Match</h3>
            <p className="text-gray-600 text-sm mt-2">
              Filter by city or neighborhood to find your ideal living partner nearby.
            </p>
          </div>

          <div className="bg-white shadow-md hover:shadow-blue-400 rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
            <Users className="mx-auto text-secondary" size={40} />
            <h3 className="text-xl font-semibold mt-4 text-gray-800">Verified Profiles</h3>
            <p className="text-gray-600 text-sm mt-2">
              All users are verified for safety and trust before they can contact or post.
            </p>
          </div>

          <div className="bg-white hover:shadow-blue-400 shadow-md rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
            <MessageCircle className="mx-auto text-secondary" size={40} />
            <h3 className="text-xl font-semibold mt-4 text-gray-800">In-App Messaging</h3>
            <p className="text-gray-600 text-sm mt-2">
              Connect directly via secure in-app chat before sharing personal info.
            </p>
          </div>

          <div className="bg-white hover:shadow-blue-400 shadow-md rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
            <Mail className="mx-auto text-secondary" size={40} />
            <h3 className="text-xl font-semibold mt-4 text-gray-800">Email Notifications</h3>
            <p className="text-gray-600 text-sm mt-2">
              Stay updated when someone responds or shows interest in your listing.
            </p>
          </div>

          <div className="bg-white hover:shadow-blue-400 shadow-md rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
            <Locate className="mx-auto text-secondary" size={40} />
            <h3 className="text-xl font-semibold mt-4 text-gray-800">Map View</h3>
            <p className="text-gray-600 text-sm mt-2">
              Visualize your next home and its surroundings on our integrated map tool.
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default About;
