import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ThumbsUp, User, MessageSquare } from 'lucide-react';

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [columns, setColumns] = useState(1);
  const [likedReviews, setLikedReviews] = useState({});
  const [helpfulCounts, setHelpfulCounts] = useState({});

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely loved the product! Exceeded all my expectations and the customer service was exceptional.',
      date: '2 days ago',
      helpful: 12
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 4.5,
      comment: 'Great quality and fast shipping. Would give 5 stars if the instructions were clearer.',
      date: '1 week ago',
      helpful: 8
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      rating: 5,
      comment: 'Perfect in every way! I\'ve already recommended it to all my friends.',
      date: '3 weeks ago',
      helpful: 24
    },
    {
      id: 4,
      name: 'David Wilson',
      rating: 3.5,
      comment: 'Good product overall, but took longer to arrive than expected. Functionality is solid though.',
      date: '1 month ago',
      helpful: 5
    },
    {
      id: 5,
      name: 'Olivia Smith',
      rating: 4,
      comment: 'Very happy with my purchase. The design is beautiful and it works exactly as described.',
      date: '2 months ago',
      helpful: 15
    },
    {
      id: 6,
      name: 'James Brown',
      rating: 4.5,
      comment: 'Excellent value for money. The product arrived in perfect condition and works flawlessly.',
      date: '3 months ago',
      helpful: 9
    },
    {
      id: 7,
      name: 'Sophia Lee',
      rating: 5,
      comment: 'This is my second purchase from this brand and I\'m just as impressed as the first time!',
      date: '4 months ago',
      helpful: 18
    },
    {
      id: 8,
      name: 'Robert Taylor',
      rating: 3,
      comment: 'Decent product but had some minor issues with assembly. Customer support was helpful though.',
      date: '5 months ago',
      helpful: 3
    },
    {
      id: 9,
      name: 'Jennifer Martinez',
      rating: 4.5,
      comment: 'Very satisfied with my purchase. It looks even better in person than in the photos.',
      date: '6 months ago',
      helpful: 11
    },
    {
      id: 10,
      name: 'William Anderson',
      rating: 5,
      comment: 'Worth every penny! The quality is outstanding and it arrived earlier than expected.',
      date: '7 months ago',
      helpful: 22
    }
  ];

  // Initialize helpful counts and liked status
  useEffect(() => {
    const initialCounts = {};
    const initialLiked = {};
    reviews.forEach(review => {
      initialCounts[review.id] = review.helpful;
      initialLiked[review.id] = false;
    });
    setHelpfulCounts(initialCounts);
    setLikedReviews(initialLiked);
  }, []);

  const handleLike = (reviewId) => {
    setLikedReviews(prev => {
      const isLiked = !prev[reviewId];
      setHelpfulCounts(prevCounts => ({
        ...prevCounts,
        [reviewId]: isLiked ? prevCounts[reviewId] + 1 : prevCounts[reviewId] - 1
      }));
      return {
        ...prev,
        [reviewId]: isLiked
      };
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  const updateColumns = () => {
    if (window.innerWidth >= 1024) {
      setColumns(3);
    } else if (window.innerWidth >= 768) {
      setColumns(2);
    } else {
      setColumns(1);
    }
  };

  useEffect(() => {
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const getVisibleReviews = () => {
    let visible = [];
    for (let i = 0; i < columns; i++) {
      const index = (currentIndex + i) % reviews.length;
      visible.push(reviews[index]);
    }
    return visible;
  };

  const nextReview = () => {
    setCurrentIndex((prev) => {
      if (prev + columns >= reviews.length) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevReview = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return Math.max(0, reviews.length - columns);
      }
      return prev - 1;
    });
  };

  const visibleReviews = getVisibleReviews();

  return (
    <section className="py-14 bg-base-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-secondary">Customer Reviews</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Hear what our users are saying about our products!
          </p>
        </motion.div>

      
        <div className={`grid gap-6 ${columns === 3 ? 'lg:grid-cols-3' : columns === 2 ? 'md:grid-cols-2' : ''}`}>
          {visibleReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="card bg-base-100 shadow-lg p-4 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary text-white rounded-full p-2">
                  <User className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">{review.name}</h3>
                  <div className="flex items-center text-sm">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-base-content/70">{review.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <p className="text-base-content/80 mb-4">{review.comment}</p>
              <div className="flex justify-between items-center text-sm text-base-content/50">
                <span>{review.date}</span>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleLike(review.id)}
                    className={`btn btn-ghost btn-xs ${likedReviews[review.id] ? 'text-primary' : ''}`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="ml-1">{helpfulCounts[review.id] || 0}</span>
                  </button>
                  <button className="btn btn-ghost btn-xs">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        {reviews.length > columns && (
          <div className="flex justify-center mt-8 space-x-4">
            <button onClick={prevReview} className="btn btn-circle btn-sm">
              <FaChevronLeft />
            </button>
            <button onClick={nextReview} className="btn btn-circle btn-sm">
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;