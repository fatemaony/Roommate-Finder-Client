import React from "react";
import { Search, ThumbsUp, MessageCircle } from "lucide-react";
import { Fade } from "react-awesome-reveal";

const HowWorks = () => {
  return (
    <div className="max-w-6xl mx-auto lg:mx-24 px-4 py-12 mt-20 bg-white rounded-2xl">
      <Fade>
        <h1 className="text-3xl md:text-5xl font-medium text-center text-gray-700 mb-12">
          How it works
        </h1>
      </Fade>

      <div className="space-y-16">
        {/* Step 1 */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0">
            <Search size={64} className="text-orange-900" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-3 text-orange-900">BROWSE</h2>
            <p className="text-gray-700 leading-relaxed max-w-2xl">
              Search through thousands of potential roommates and rooms for rent. Our algorithm matches your lifestyle and preferences with others. Use filters to refine your search.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0">
            <ThumbsUp size={64} className="text-orange-900" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-3 text-orange-900">LIKE OR MESSAGE</h2>
            <p className="text-gray-700 leading-relaxed max-w-2xl">
              Like profiles that look like a good fit. If they like you back, it becomes a "Match" and you can chat. Or message directly to speed up the process.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0">
            <MessageCircle size={64} className="text-orange-900" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-3 text-orange-900">CHAT</h2>
            <p className="text-gray-700 leading-relaxed max-w-2xl">
              Chat securely within the platform without sharing your contact info. Keep everything in one place until you're ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWorks;
