import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { FaPeopleArrows, FaHouseUser, FaHandshake } from 'react-icons/fa';

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-4">Get In Touch</h1>
          <p className="text-lg text-base-content">
            Have questions about finding your perfect roommate? We're here to help!
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Form */}
         {/* Contact Form Section - Updated with consistent widths */}
<motion.div 
  className="card bg-base-100 shadow-xl p-8"
  variants={itemVariants}
>
  <h2 className="text-2xl font-semibold mb-6 text-secondary">Send us a message</h2>
  
  {isSubmitted && (
    <motion.div 
      className="alert alert-success shadow-lg mb-6"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="flex items-center">
        <FiCheckCircle className="text-2xl mr-2" />
        <span>Your message has been sent successfully!</span>
      </div>
    </motion.div>
  )}

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">Your Name</span>
      </label>
      <input
        type="text"
        placeholder="John Doe"
        className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
        {...register("name", { required: "Name is required" })}
      />
      {errors.name && (
        <span className="text-error text-sm mt-1">{errors.name.message}</span>
      )}
    </div>

    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">Email Address</span>
      </label>
      <input
        type="email"
        placeholder="john@example.com"
        className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
        {...register("email", { 
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }
        })}
      />
      {errors.email && (
        <span className="text-error text-sm mt-1">{errors.email.message}</span>
      )}
    </div>

    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">Subject</span>
      </label>
      <select 
        className="select select-bordered w-full"
        {...register("subject")}
      >
        <option value="general">General Inquiry</option>
        <option value="account">Account Help</option>
        <option value="matching">Matching Questions</option>
        <option value="feedback">Feedback/Suggestions</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">Your Message</span>
      </label>
      <textarea
        placeholder="How can we help you with your roommate search?"
        className={`textarea textarea-bordered w-full h-32 ${errors.message ? 'textarea-error' : ''}`}
        {...register("message", { 
          required: "Message is required",
          minLength: {
            value: 10,
            message: "Message should be at least 10 characters"
          }
        })}
      ></textarea>
      {errors.message && (
        <span className="text-error text-sm mt-1">{errors.message.message}</span>
      )}
    </div>

    <div className="form-control mt-6 w-full">
      <button 
        type="submit" 
        className="btn btn-primary w-full"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FiSend className="mr-2" />
        Send Message
      </button>
    </div>
  </form>
</motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="card bg-base-100 shadow-xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-secondary">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary bg-opacity-10 text-primary">
                    <FiMail className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-base-content/70">support@roommatefinder.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-secondary bg-opacity-10 text-secondary">
                    <FiPhone className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-base-content/70">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-accent bg-opacity-10 text-accent">
                    <FiMapPin className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium">Office</h3>
                    <p className="text-base-content/70">123 Housing St, Suite 456<br />San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              variants={containerVariants}
            >
              <motion.div 
                className="card bg-primary text-primary-content p-4"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col items-center text-center">
                  <FaPeopleArrows className="text-3xl mb-2" />
                  <h3 className="font-bold">Smart Matching</h3>
                  <p className="text-sm">Our algorithm finds your ideal roommate</p>
                </div>
              </motion.div>

              <motion.div 
                className="card bg-secondary text-secondary-content p-4"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col items-center text-center">
                  <FaHouseUser className="text-3xl mb-2" />
                  <h3 className="font-bold">Verified Profiles</h3>
                  <p className="text-sm">All users go through verification</p>
                </div>
              </motion.div>

              <motion.div 
                className="card bg-accent text-accent-content p-4"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col items-center text-center">
                  <FaHandshake className="text-3xl mb-2" />
                  <h3 className="font-bold">Safe Connections</h3>
                  <p className="text-sm">Secure messaging until you're ready</p>
                </div>
              </motion.div>
            </motion.div>

            {/* FAQ Preview */}
            <motion.div 
              className="card bg-base-100 shadow-xl p-6"
              variants={itemVariants}
            >
              <h3 className="font-bold text-lg mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="collapse collapse-plus">
                  <input type="radio" name="faq" /> 
                  <div className="collapse-title font-medium">
                    How does the matching algorithm work?
                  </div>
                  <div className="collapse-content"> 
                    <p>Our algorithm considers over 20 factors including lifestyle, habits, and preferences to find your most compatible matches.</p>
                  </div>
                </div>
                <div className="collapse collapse-plus">
                  <input type="radio" name="faq" /> 
                  <div className="collapse-title font-medium">
                    Is there a safety verification process?
                  </div>
                  <div className="collapse-content"> 
                    <p>Yes, all users go through ID verification and background checks (with consent) before being able to message others.</p>
                  </div>
                </div>
              </div>
              <button className="btn btn-ghost mt-4 text-primary">View all FAQs</button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactUs;