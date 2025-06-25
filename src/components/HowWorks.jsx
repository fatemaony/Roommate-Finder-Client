import React from "react";
import { FaSearch, FaThumbsUp, FaComments } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    title: "BROWSE",
    icon: FaSearch,
    description:
      "Search through thousands of potential roommates and rooms for rent. Our algorithm matches your lifestyle and preferences with others. Use filters to refine your search.",
  },
  {
    title: "LIKE OR MESSAGE",
    icon: FaThumbsUp,
    description:
      'Like profiles that look like a good fit. If they like you back, it becomes a "Match" and you can chat. Or message directly to speed up the process.',
  },
  {
    title: "CHAT",
    icon: FaComments,
    description:
      "Chat securely within the platform without sharing your contact info. Keep everything in one place until you're ready.",
  },
];

const HowWorks = () => {
  return (
    <section className=" py-16 px-4 md:px-15  max-w-7xl mx-auto text-gray-200">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-2xl lg:text-4xl font-bold my-8 text-secondary select-none"
      >
        How It Works
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {steps.map(({ title, icon: Icon, description }, idx) => (
          <motion.div
            key={title}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 30px rgba(59, 130, 246, 0.5)", // blue-500 shadow
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.3 + 0.3, duration: 0.6 }}
            className="card bg-white rounded-xl p-8 flex flex-col items-center text-center shadow-lg cursor-pointer border border-blue-500 hover:border-blue-400 transition-colors"
          >
            <div className="p-6 rounded-full bg-white mb-6">
              <Icon className="text-secondary w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-secondary mb-3 select-none">{title}</h2>
            <p className="text-gray-500 max-w-md">{description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        className="mt-20 flex justify-center"
      >
        {/* Optional: add a dark blue themed illustration or graphic here */}
      </motion.div>
    </section>
  );
};

export default HowWorks;
