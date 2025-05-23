import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Fade } from 'react-awesome-reveal';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({ 0: true }); 

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Fade>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 text-center mb-8 sm:mb-12">
          Frequently Asked Questions
        </h1>
      </Fade>
      
      <div className="space-y-2 sm:space-y-4">
        {/* FAQ Item 1 */}
        <div className="border-b border-gray-300">
          <button
            onClick={() => toggleItem(0)}
            className="w-full py-4 sm:py-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="text-base sm:text-lg font-medium text-gray-600 pr-2 sm:pr-4">
              Can Roomies help me find roommates?
            </h3>
            <div className="flex-shrink-0">
              {openItems[0] ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </div>
          </button>
          
          {openItems[0] && (
            <div className="pb-4 sm:pb-6 pr-4 sm:pr-8">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Of course, that's exactly what we're here for! Roomies is a roommate finder platform designed to help you connect with like-minded roommates. Whether you're looking for <span className="text-blue-500 hover:text-blue-600 cursor-pointer">rooms for rent</span>, need a roommate to fill your empty room, or want to team up with someone to find a new place, we've got you covered. We even offer listings for entire apartments for rent and coliving spaces in select cities.
              </p>
            </div>
          )}
        </div>

        {/* FAQ Item 2 */}
        <div className="border-b border-gray-300">
          <button
            onClick={() => toggleItem(1)}
            className="w-full py-4 sm:py-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="text-base sm:text-lg font-medium text-gray-600 pr-2 sm:pr-4">
              What cities does Roomies currently operate in?
            </h3>
            <div className="flex-shrink-0">
              {openItems[1] ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </div>
          </button>
          
          {openItems[1] && (
            <div className="pb-4 sm:pb-6 pr-4 sm:pr-8">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Roomies currently operates in major cities across the United States including New York, Los Angeles, San Francisco, Chicago, Boston, Washington DC, Seattle, Austin, and many more. We're constantly expanding to new markets to help more people find their perfect living situation.
              </p>
            </div>
          )}
        </div>

        {/* FAQ Item 3 */}
        <div className="border-b border-gray-300">
          <button
            onClick={() => toggleItem(2)}
            className="w-full py-4 sm:py-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="text-base sm:text-lg font-medium text-gray-600 pr-2 sm:pr-4">
              Does it cost anything to sign up or use Roomies?
            </h3>
            <div className="flex-shrink-0">
              {openItems[2] ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </div>
          </button>
          
          {openItems[2] && (
            <div className="pb-4 sm:pb-6 pr-4 sm:pr-8">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Signing up for Roomies is completely free! You can create your profile, browse listings, and connect with potential roommates at no cost. We believe everyone should have access to safe and affordable housing options without barriers.
              </p>
            </div>
          )}
        </div>

        {/* FAQ Item 4 */}
        <div className="border-b border-gray-300">
          <button
            onClick={() => toggleItem(3)}
            className="w-full py-4 sm:py-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="text-base sm:text-lg font-medium text-gray-600 pr-2 sm:pr-4">
              Can I find a roommate to team up with me to find a place?
            </h3>
            <div className="flex-shrink-0">
              {openItems[3] ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </div>
          </button>
          
          {openItems[3] && (
            <div className="pb-4 sm:pb-6 pr-4 sm:pr-8">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Absolutely! One of Roomies's key features is helping people team up to find places together. You can connect with other users who are also looking for housing, form a group, and then search for apartments or houses that fit your combined preferences and budget.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FAQ;