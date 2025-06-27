import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Fade } from 'react-awesome-reveal';

const faqs = [
  {
    question: "Can Roomies help me find roommates?",
    answer: "Of course, that's exactly what we're here for! Roomies is a roommate finder platform designed to help you connect with like-minded roommates. Whether you're looking for rooms for rent, need a roommate to fill your empty room, or want to team up with someone to find a new place, we've got you covered. We even offer listings for entire apartments for rent and coliving spaces in select cities."
  },
  {
    question: "What cities does Roomies currently operate in?",
    answer: "Roomies currently operates in major cities across the United States including New York, Los Angeles, San Francisco, Chicago, Boston, Washington DC, Seattle, Austin, and many more. We're constantly expanding to new markets to help more people find their perfect living situation."
  },
  {
    question: "Does it cost anything to sign up or use Roomies?",
    answer: "Signing up for Roomies is completely free! You can create your profile, browse listings, and connect with potential roommates at no cost. We believe everyone should have access to safe and affordable housing options without barriers."
  },
  {
    question: "Can I find a roommate to team up with me to find a place?",
    answer: "Absolutely! One of Roomies's key features is helping people team up to find places together. You can connect with other users who are also looking for housing, form a group, and then search for apartments or houses that fit your combined preferences and budget."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState({ 0: true });

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-20 font-poppins">
      <Fade direction="up" cascade damping={0.08}>
        <h2 className="text-4xl md:text-5xl font-bold text-center text-secondary mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl bg-white hover:shadow-xl transition duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left group"
              >
                <h3 className="text-lg font-semibold text-content group-hover:text-secondary transition-colors duration-300">
                  {faq.question}
                </h3>
                <span className="text-secondary transition-transform">
                  {openItems[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>

              {openItems[index] && (
                <div className="px-6 pb-5 text-sm sm:text-base text-third leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Fade>
    </div>
  );
};

export default FAQ;
