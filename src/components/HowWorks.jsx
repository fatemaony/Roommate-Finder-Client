import React from "react";
import { Search, ThumbsUp, MessageCircle } from "lucide-react";

const HowWorks = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-20 bg-white">
      <h1 className="text-5xl font-medium text-center text-gray-700 mb-12">How it works</h1>
      
      <div className="space-y-16">
        {/* Browse Section */}
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 text-orange-900">
              <Search size={64} strokeWidth={2} className="text-orange-900" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3 text-orange-900">BROWSE</h2>
            <p className="text-gray-700 leading-relaxed">
              Search through thousands of potential roommates and rooms for rent. To make your search more 
              effective, our proprietary algorithm will match your circumstances, lifestyle and preferences with 
              other roommate prospects and display your personalized best prospects on top. You can further 
              refine your roommate search using our filters to tailor it to your specific requirements.
            </p>
          </div>
        </div>
        
        {/* Like or Message Section */}
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 ml-auto">
              <ThumbsUp size={64} strokeWidth={2} className="text-orange-900" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3 text-orange-900">LIKE OR MESSAGE</h2>
            <p className="text-gray-700 leading-relaxed">
              Express interest by simply clicking "Like" on roommate profiles that seem as a good fit. They will be 
              then notified and if it's mutual, they will become a "Match" who you can chat with freely. You can 
              also skip waiting for a "Match" and send an "Instant Message" introducing yourself to speed things 
              up. By setting up a roommate profile you can also receive "Likes" and messages from potential 
              roommates.
            </p>
          </div>
        </div>
        
        {/* Chat Section */}
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16">
              <MessageCircle size={64} strokeWidth={2} className="text-orange-900" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3 text-orange-900">CHAT</h2>
            <p className="text-gray-700 leading-relaxed">
              Communicate directly and safely with your potential roommate "Matches" within our roommate 
              finder. All your roommate prospects are in one central place, and you don't need to share your 
              personal contact information until you are ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWorks;